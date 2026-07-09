// Edge Function «submit-review»: приём отзыва от гостя.
// Проверяет подпись Telegram initData, апсертит пользователя, пишет отзыв как pending.
// Секреты берём ТОЛЬКО из окружения функции (не из фронта):
//   TELEGRAM_BOT_TOKEN  — задать: supabase secrets set TELEGRAM_BOT_TOKEN=...
//   SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY — доступны функции автоматически.
// ВАЖНО: сырой initData и PII НЕ логируем.
import { createClient } from 'jsr:@supabase/supabase-js@2';

const BOT_TOKEN = Deno.env.get('TELEGRAM_BOT_TOKEN') ?? '';
const SUPABASE_URL = Deno.env.get('SUPABASE_URL') ?? '';
const SERVICE_ROLE = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
const MAX_AUTH_AGE = 24 * 60 * 60; // 24 часа — терпимо к длинным сессиям; от реплея защищает UNIQUE «1 отзыв на юзера»

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, apikey, content-type',
};
const reply = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), { status, headers: { ...CORS, 'content-type': 'application/json' } });

const enc = new TextEncoder();
async function hmac(key: ArrayBuffer | Uint8Array, msg: string): Promise<ArrayBuffer> {
  const k = await crypto.subtle.importKey('raw', key as BufferSource, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  return crypto.subtle.sign('HMAC', k, enc.encode(msg));
}
const toHex = (buf: ArrayBuffer) => [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');

// Валидация подписи Telegram initData → объект user или null.
async function validateInitData(initData: string): Promise<Record<string, unknown> | null> {
  if (!initData || !BOT_TOKEN) return null;
  const params = new URLSearchParams(initData);
  const hash = params.get('hash');
  if (!hash) return null;
  params.delete('hash');
  const dataCheckString = [...params.entries()].map(([k, v]) => `${k}=${v}`).sort().join('\n');
  // secret_key = HMAC_SHA256("WebAppData", BOT_TOKEN); затем HMAC от dataCheckString
  const secret = await hmac(enc.encode('WebAppData'), BOT_TOKEN);
  const sig = toHex(await hmac(new Uint8Array(secret), dataCheckString));
  // сравнение постоянного времени
  if (sig.length !== hash.length) return null;
  let diff = 0;
  for (let i = 0; i < sig.length; i++) diff |= sig.charCodeAt(i) ^ hash.charCodeAt(i);
  if (diff !== 0) return null;
  // свежесть
  const authDate = Number(params.get('auth_date') ?? 0);
  if (!authDate || Date.now() / 1000 - authDate > MAX_AUTH_AGE) return null;
  const userRaw = params.get('user');
  if (!userRaw) return null;
  try { return JSON.parse(userRaw); } catch { return null; }
}

// Убираем управляющие/невидимые символы (код < 32 или 127), обрезаем пробелы и длину.
function clean(s: unknown, max: number): string {
  const stripped = [...String(s ?? '')].filter((c) => {
    const code = c.charCodeAt(0);
    return code >= 32 && code !== 127;
  }).join('');
  return stripped.trim().slice(0, max);
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS });
  if (req.method !== 'POST') return reply(405, { error: 'method' });

  let payload: Record<string, unknown>;
  try { payload = await req.json(); } catch { return reply(400, { error: 'bad_json' }); }

  const user = await validateInitData(String(payload.initData ?? ''));
  if (!user || typeof user.id !== 'number') return reply(401, { error: 'bad_init' });

  const rating = Number(payload.rating);
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) return reply(400, { error: 'rating' });
  const body = clean(payload.body ?? payload.text, 500);
  if (body.length < 10) return reply(400, { error: 'text_short' });
  const name = clean(payload.name ?? user.first_name ?? '', 40) || 'Guest';
  const country = clean(payload.country, 40) || null;
  const lang = payload.lang === 'en' ? 'en' : 'ru';

  const db = createClient(SUPABASE_URL, SERVICE_ROLE, { auth: { persistSession: false } });

  // Апсерт минимального профиля из проверенного initData
  await db.from('app_users').upsert({
    tg_user_id: user.id,
    first_name: (user.first_name as string) ?? null,
    username: (user.username as string) ?? null,
    language_code: (user.language_code as string) ?? null,
    last_seen_at: new Date().toISOString(),
  }, { onConflict: 'tg_user_id' });

  const { error } = await db.from('reviews').insert({
    tg_user_id: user.id, name, country, rating, body, lang, status: 'pending', source: 'app',
  });
  if (error) {
    if (error.code === '23505') return reply(409, { error: 'already' }); // уже есть отзыв
    return reply(500, { error: 'db' });
  }
  return reply(200, { ok: true });
});
