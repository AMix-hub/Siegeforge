-- SiegeForge Database Schema
-- Run this in your Supabase SQL editor

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Items table
create table if not exists items (
  id          serial primary key,
  name        text        not null,
  type        text        not null,  -- GearSlotType: weapon, offhand, head, armor, belt, boots, ring1, ring2, amulet
  rarity      text        not null,  -- Normal, Magic, Rare, Epic, Legendary, Angelic, Satanic
  base_stats  jsonb       not null default '{}'::jsonb,
  drop_location text      not null
);

-- Builds table
create table if not exists builds (
  id          uuid        primary key default uuid_generate_v4(),
  title       text        not null,
  description text,
  hero_class  text        not null,
  gear        jsonb       not null default '{}'::jsonb,
  -- gear is a JSONB object keyed by slot type, e.g.:
  -- { "weapon": { "id": 1, "stars": 5 }, "head": { "id": 4 } }
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- Auto-update updated_at on row change
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists set_updated_at on builds;
create trigger set_updated_at
  before update on builds
  for each row
  execute function update_updated_at_column();

-- Row-Level Security
alter table items  enable row level security;
alter table builds enable row level security;

-- Public read access for items and builds
create policy "Allow public read on items"
  on items for select using (true);

create policy "Allow public read on builds"
  on builds for select using (true);

create policy "Allow public insert on builds"
  on builds for insert with check (true);

-- Indexes
create index if not exists idx_builds_hero_class on builds (hero_class);
create index if not exists idx_builds_created_at on builds (created_at desc);
create index if not exists idx_items_type on items (type);
create index if not exists idx_items_rarity on items (rarity);
