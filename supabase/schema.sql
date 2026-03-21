-- ClimbHire database schema
-- Run this in your Supabase SQL editor at:
-- https://supabase.com/dashboard/project/lvvfclktjcghqxauohli/sql

-- ──────────────────────────────────────────────
-- Jobs
-- ──────────────────────────────────────────────
create table if not exists public.jobs (
  id           uuid primary key default gen_random_uuid(),
  title        text not null,
  company      text not null,
  location     text not null,
  type         text not null check (type in ('full-time','part-time','contract','internship')),
  salary_range text,
  description  text not null,
  tags         text[]   not null default '{}',
  apply_url    text not null,
  is_featured  boolean  not null default false,
  is_published boolean  not null default true,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

-- ──────────────────────────────────────────────
-- Testimonials
-- ──────────────────────────────────────────────
create table if not exists public.testimonials (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  role       text not null,
  company    text not null,
  avatar_url text,
  quote      text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ──────────────────────────────────────────────
-- Seeker Profiles
-- ──────────────────────────────────────────────
create table if not exists public.seeker_profiles (
  id                    uuid primary key default gen_random_uuid(),
  full_name             text not null,
  headline              text not null,
  location              text not null,
  bio                   text,
  avatar_url            text,
  email                 text,
  linkedin_url          text,
  skills                text[]   not null default '{}',
  open_to_work          boolean  not null default true,
  job_type_preference   text     not null default 'Full-time',
  salary_expectation    text,
  experience            jsonb    not null default '[]',
  education             jsonb    not null default '[]',
  is_public             boolean  not null default true,
  created_at            timestamptz not null default now(),
  updated_at            timestamptz not null default now()
);

-- ──────────────────────────────────────────────
-- Row Level Security (read-only for anon)
-- ──────────────────────────────────────────────
alter table public.jobs             enable row level security;
alter table public.testimonials     enable row level security;
alter table public.seeker_profiles  enable row level security;

create policy "Public can read published jobs"
  on public.jobs for select using (is_published = true);

create policy "Public can read testimonials"
  on public.testimonials for select using (true);

create policy "Public can read public profiles"
  on public.seeker_profiles for select using (is_public = true);

-- ──────────────────────────────────────────────
-- updated_at trigger
-- ──────────────────────────────────────────────
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger jobs_updated_at
  before update on public.jobs
  for each row execute function public.set_updated_at();

create trigger testimonials_updated_at
  before update on public.testimonials
  for each row execute function public.set_updated_at();

create trigger seeker_profiles_updated_at
  before update on public.seeker_profiles
  for each row execute function public.set_updated_at();
