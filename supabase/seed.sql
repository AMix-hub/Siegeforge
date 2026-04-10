-- SiegeForge Seed Data
-- Run this AFTER schema.sql in your Supabase SQL editor

-- Items seed data
insert into items (name, type, rarity, base_stats, drop_location)
values
  (
    'Starlight',
    'weapon',
    'Satanic',
    '{"damage": 666, "int": 120, "crit": 35, "mp": 500}'::jsonb,
    'Act 5 - Archdemon (Hell Mode)'
  ),
  (
    'Cowl of the Dead',
    'head',
    'Satanic',
    '{"armor": 280, "hp": 800, "str": 40, "int": 60}'::jsonb,
    'Act 3 - Lich King (Nightmare Mode)'
  ),
  (
    'Godly Raiment',
    'armor',
    'Satanic',
    '{"armor": 950, "hp": 1500, "str": 80, "dex": 50}'::jsonb,
    'Act 4 - Seraph Prime (Hell Mode)'
  ),
  (
    'The Bible',
    'offhand',
    'Satanic',
    '{"damage": 320, "int": 150, "mp": 750, "crit": 20}'::jsonb,
    'Act 2 - High Priest Malachar (Nightmare Mode)'
  );

-- Example builds seed data
insert into builds (title, description, hero_class, gear)
values
  (
    'Arcane Annihilator',
    'Max INT Pyromancer build with Starlight and The Bible for insane spell damage.',
    'Pyromancer',
    '{"weapon": {"id": 1, "stars": 5}, "offhand": {"id": 4, "stars": 4}, "armor": {"id": 3, "stars": 3}}'::jsonb
  ),
  (
    'Undying Vessel',
    'Tanky Jötunn that never dies. Stacked HP and armor.',
    'Jötunn',
    '{"head": {"id": 2, "stars": 5}, "armor": {"id": 3, "stars": 5}}'::jsonb
  ),
  (
    'Prophet of Doom',
    'Holy staff build for the Prophet. Pairs Starlight with Cowl of the Dead.',
    'Prophet',
    '{"weapon": {"id": 1, "stars": 5}, "head": {"id": 2, "stars": 4}}'::jsonb
  ),
  (
    'Soul Reaper',
    'Necromancer summoner build using Godly Raiment for sustained survivability.',
    'Necromancer',
    '{"armor": {"id": 3, "stars": 5}, "offhand": {"id": 4, "stars": 3}}'::jsonb
  );
