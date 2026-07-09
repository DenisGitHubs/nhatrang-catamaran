// Слой данных отзывов: чтение из Supabase (VIEW reviews_public / reviews_stats)
// и отправка через Edge Function submit-review. Без бэкенда всё деградирует в null,
// и приложение продолжает работать на статических отзывах из data.js.
import { supabase, isSupabaseReady } from './supabase.js';

// Последние одобренные отзывы. При недоступности бэка / ошибке / пустом ответе — null (зовём фолбэк).
export async function fetchReviews() {
  if (!isSupabaseReady) return null;
  try {
    const { data, error } = await supabase
      .from('reviews_public')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(30);
    if (error || !data || data.length === 0) return null;
    return data;
  } catch {
    return null;
  }
}

// Сводная статистика {count, avg}. При недоступности / ошибке — null.
export async function fetchStats() {
  if (!isSupabaseReady) return null;
  try {
    const { data, error } = await supabase
      .from('reviews_stats')
      .select('*')
      .single();
    if (error || !data) return null;
    return { count: data.count, avg: data.avg };
  } catch {
    return null;
  }
}

// Отправка отзыва через Edge Function. initData — ключ авторизации (валидируется на бэке
// по HMAC-SHA256; supabase-js сам добавит apikey/authorization). Возвращаем {ok:true}
// или {ok:false, error:код}. Коды из функции: bad_init/no_init, rating/text_short, already, db + сеть.
export async function submitReview({ rating, name, country, body, lang }) {
  if (!isSupabaseReady) return { ok: false, error: 'network' };
  const initData = window.Telegram?.WebApp?.initData || '';
  try {
    const { data, error } = await supabase.functions.invoke('submit-review', {
      body: { initData, rating, name, country, body, lang },
    });
    if (error) return { ok: false, error: await extractErrorCode(error) };
    if (data && data.error) return { ok: false, error: data.error };
    return { ok: true };
  } catch {
    return { ok: false, error: 'network' };
  }
}

// Достаём код ошибки из тела non-2xx ответа функции (FunctionsHttpError.context = Response).
async function extractErrorCode(error) {
  try {
    const res = error?.context;
    if (res && typeof res.json === 'function') {
      const body = await res.json();
      if (body && body.error) return body.error;
    }
  } catch {
    /* тело не JSON или уже прочитано */
  }
  return 'network';
}

// ===== Нормализация к единой форме карточки =====
// Общая форма: { id, name, country: строка, rating: число, text: строка, lang, initial }

// Отзыв из БД: body → text, country как есть, initial — первая буква имени.
export function normalizeDbReview(r) {
  const name = (r.name || '').trim();
  return {
    id: r.id != null ? `db-${r.id}` : `db-${name}-${r.created_at || ''}`,
    name,
    country: r.country || '',
    rating: Number(r.rating) || 5,
    text: r.body || '',
    lang: r.lang || 'en',
    initial: (name[0] || '•').toUpperCase(),
  };
}

// Статический отзыв из data.js REVIEWS: двуязычные {ru,en} → строки для текущего языка, rating = 5.
// index добавляем в id, чтобы React key оставался уникальным при одинаковых именах.
export function normalizeStaticReview(r, lang, index = 0) {
  const pick = (obj) => obj?.[lang] ?? obj?.en ?? '';
  const name = (r.name || '').trim();
  return {
    id: `static-${index}-${name}`,
    name,
    country: pick(r.country),
    rating: 5,
    text: pick(r.text),
    lang,
    initial: r.initial || (name[0] || '•').toUpperCase(),
  };
}
