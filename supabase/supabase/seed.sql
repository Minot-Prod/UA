-- UA Auto-App • Supabase seed (minimal)

create table if not exists public.users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  created_at timestamp with time zone default now()
);

create table if not exists public.sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  created_at timestamp with time zone default now(),
  last_seen timestamp with time zone default now()
);

create table if not exists public.settings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete cascade,
  k text not null,
  v jsonb not null default '{}',
  updated_at timestamp with time zone default now()
);

-- Simple seed
insert into public.users(email) values ('demo@parlios.local')
on conflict (email) do nothing;

insert into public.settings(user_id, k, v)
select id, 'theme', '{"brand":"parlios","accent":"#0ea5e9"}'::jsonb
from public.users where email='demo@parlios.local'
on conflict do nothing;
