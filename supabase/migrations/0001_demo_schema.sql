-- 0001_demo_schema.sql
-- AI-Market-Curator demo: 7 tables + RLS
-- See plans/eager-rolling-sky.md §5 for design rationale.

-- ============================================================
-- 1. profiles (1:1 with auth.users)
-- ============================================================
create table public.profiles (
  id           uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  locale       text not null default 'ko-KR',
  created_at   timestamptz not null default now()
);

-- ============================================================
-- 2. watchlist — user's tickers/keywords (max 3 each)
-- ============================================================
create table public.watchlist (
  user_id    uuid not null references auth.users(id) on delete cascade,
  kind       text not null check (kind in ('ticker','keyword')),
  value      text not null check (char_length(value) between 1 and 50),
  position   smallint not null check (position between 1 and 3),
  created_at timestamptz not null default now(),
  primary key (user_id, kind, position)
);
create index watchlist_user_idx on public.watchlist(user_id);

-- ============================================================
-- 3. briefing_cache — public anon-readable daily briefing
-- ============================================================
create table public.briefing_cache (
  date         date not null,
  locale       text not null default 'ko-KR',
  payload      jsonb not null,           -- {tickers, news, summary_md}
  generated_at timestamptz not null default now(),
  expires_at   timestamptz not null,     -- generated_at + 24h
  primary key (date, locale)
);

-- ============================================================
-- 4. stock_quote — shared per-ticker price cache
-- ============================================================
create table public.stock_quote (
  ticker      text not null,
  captured_at timestamptz not null default now(),
  price       numeric,
  change_pct  numeric,
  currency    text,
  expires_at  timestamptz not null,      -- 시장중 15min / 폐장 8h
  primary key (ticker, captured_at)
);
create index stock_quote_ticker_fresh on public.stock_quote(ticker, expires_at desc);

-- ============================================================
-- 5. news_summary — shared per-keyword news+summary cache
-- ============================================================
create table public.news_summary (
  keyword    text not null,
  date       date not null,
  locale     text not null default 'ko-KR',
  payload    jsonb not null,             -- {items, summary_md}
  expires_at timestamptz not null,
  primary key (keyword, date, locale)
);

-- ============================================================
-- 6. user_cache — assembled per-user briefing (read accelerator)
-- ============================================================
create table public.user_cache (
  user_id    uuid primary key references auth.users(id) on delete cascade,
  built_at   timestamptz not null default now(),
  expires_at timestamptz not null,       -- built_at + 30min
  payload    jsonb not null
);

-- ============================================================
-- 7. fetch_log — Cron / external-API call audit trail
-- ============================================================
create table public.fetch_log (
  id         bigserial primary key,
  source     text,
  status     text,
  latency_ms int,
  error      text,
  created_at timestamptz not null default now()
);
create index fetch_log_recent on public.fetch_log(created_at desc);

-- ============================================================
-- RLS — all tables enabled. Policies grant minimum surface.
-- service_role bypasses RLS, so server routes can always read/write.
-- ============================================================

-- profiles: own row only
alter table public.profiles enable row level security;
create policy "profiles_own_rw" on public.profiles
  for all
  using  (auth.uid() = id)
  with check (auth.uid() = id);

-- watchlist: own row only
alter table public.watchlist enable row level security;
create policy "watchlist_own_rw" on public.watchlist
  for all
  using  (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- briefing_cache: anyone can read; only service_role can write
alter table public.briefing_cache enable row level security;
create policy "briefing_cache_public_read" on public.briefing_cache
  for select using (true);

-- user_cache: own row read only (writes via service_role only)
alter table public.user_cache enable row level security;
create policy "user_cache_own_read" on public.user_cache
  for select using (auth.uid() = user_id);

-- stock_quote / news_summary / fetch_log:
-- RLS enabled with NO policies → anon/authenticated cannot access.
-- service_role bypasses RLS, so Cron + server routes still work.
alter table public.stock_quote enable row level security;
alter table public.news_summary enable row level security;
alter table public.fetch_log enable row level security;
