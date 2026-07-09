-- Отзывы катамарана: пользователи из Telegram + отзывы с ручной модерацией.
-- Применять через Supabase (MCP apply_migration или CLI). Секретов в файле НЕТ.
-- Решения владельца: ручная модерация (pending→approved), один отзыв на пользователя,
-- demo-отзывы как approved seed, сводный рейтинг с порогом показа.

-- 1. Пользователи Telegram (минимум PII; заполняет ТОЛЬКО Edge Function из проверенного initData)
create table if not exists public.app_users (
  tg_user_id    bigint primary key,
  first_name    text,
  username      text,
  language_code text,
  created_at    timestamptz not null default now(),
  last_seen_at  timestamptz not null default now()
);

-- 2. Отзывы
create table if not exists public.reviews (
  id          uuid primary key default gen_random_uuid(),
  tg_user_id  bigint references public.app_users(tg_user_id) on delete set null,
  name        text     not null check (char_length(name) between 1 and 40),
  country     text     check (country is null or char_length(country) <= 40),
  rating      smallint not null check (rating between 1 and 5),
  body        text     not null check (char_length(body) between 10 and 500),
  lang        text     not null default 'ru' check (lang in ('ru','en')),
  status      text     not null default 'pending' check (status in ('pending','approved','rejected')),
  source      text     not null default 'app' check (source in ('app','seed')),
  created_at  timestamptz not null default now(),
  approved_at timestamptz
);

-- Один активный отзыв на пользователя (отклонённые и seed без tg_user_id не в счёт)
create unique index if not exists reviews_one_per_user
  on public.reviews (tg_user_id)
  where tg_user_id is not null and status in ('pending','approved');

-- Быстрая выборка ленты одобренных
create index if not exists reviews_feed_idx
  on public.reviews (status, created_at desc);

-- 3. RLS: базовые таблицы полностью закрыты для anon.
--    Публика НЕ имеет доступа к базовым таблицам напрямую — только через VIEW ниже,
--    запись — только Edge Function через service_role (обходит RLS).
alter table public.app_users enable row level security;
alter table public.reviews   enable row level security;
-- policy для anon не создаём намеренно → прямого доступа к таблицам у публики нет.

-- 4. Публичное чтение — через VIEW (колоночная защита PII: tg_user_id наружу НЕ отдаём).
--    Обычный VIEW исполняется с правами владельца (postgres) и обходит закрытую базовую
--    таблицу, но отдаёт только одобренные строки и только публичные колонки.
create or replace view public.reviews_public as
  select id, name, country, rating, body, lang, created_at
  from public.reviews
  where status = 'approved';

create or replace view public.reviews_stats as
  select count(*)::int as count,
         coalesce(round(avg(rating)::numeric, 1), 0) as avg
  from public.reviews
  where status = 'approved';

-- Supabase по умолчанию раздаёт anon/authenticated полные гранты на новые объекты.
-- Закрываем: базовые таблицы — публике НИЧЕГО (доступ только service_role через Edge Function),
-- во VIEW — только SELECT (иначе через авто-обновляемое reviews_public можно писать в обход функции).
revoke all on public.reviews        from anon, authenticated;
revoke all on public.app_users      from anon, authenticated;
revoke all on public.reviews_public from anon, authenticated;
revoke all on public.reviews_stats  from anon, authenticated;
grant select on public.reviews_public to anon, authenticated;
grant select on public.reviews_stats  to anon, authenticated;

-- 5. Seed: три demo-отзыва как одобренные (source='seed', без привязки к пользователю)
insert into public.reviews (name, country, rating, body, lang, status, source, approved_at)
values
  ('Анна',    'Россия',    5, 'Лучшее утро в Нячанге: прозрачная вода, паруса и никакой толпы. Денис дал постоять за штурвалом — восторг!',          'ru', 'approved', 'seed', now()),
  ('Дмитрий', 'Россия',    5, 'Брали всей семьёй закатный маршрут. Дети в полном восторге, капитан внимательный, всё безопасно. Обязательно вернёмся.', 'ru', 'approved', 'seed', now()),
  ('Мария',   'Казахстан', 5, 'Катамаран целиком только для нас — это того стоит. Снорклинг, фрукты, съёмка с дрона. Спасибо за идеальный день!',      'ru', 'approved', 'seed', now())
on conflict do nothing;
