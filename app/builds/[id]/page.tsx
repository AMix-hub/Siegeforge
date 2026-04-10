import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Build, Item, GearSlotType, Gear } from '@/types';
import { GEAR_SLOTS, RARITY_TEXT, RARITY_COLORS } from '@/lib/constants';
import CopyLootFilterButton from '@/components/CopyLootFilterButton';
import GearSlot from '@/components/GearSlot';

// Seed items matched by ID (mirrors supabase/seed.sql)
const SEED_ITEMS: Item[] = [
  {
    id: 1,
    name: 'Starlight',
    type: 'weapon',
    rarity: 'Satanic',
    base_stats: { damage: 666, int: 120, crit: 35, mp: 500 },
    drop_location: 'Act 5 - Archdemon (Hell Mode)',
  },
  {
    id: 2,
    name: 'Cowl of the Dead',
    type: 'head',
    rarity: 'Satanic',
    base_stats: { armor: 280, hp: 800, str: 40, int: 60 },
    drop_location: 'Act 3 - Lich King (Nightmare Mode)',
  },
  {
    id: 3,
    name: 'Godly Raiment',
    type: 'armor',
    rarity: 'Satanic',
    base_stats: { armor: 950, hp: 1500, str: 80, dex: 50 },
    drop_location: 'Act 4 - Seraph Prime (Hell Mode)',
  },
  {
    id: 4,
    name: 'The Bible',
    type: 'offhand',
    rarity: 'Satanic',
    base_stats: { damage: 320, int: 150, mp: 750, crit: 20 },
    drop_location: 'Act 2 - High Priest Malachar (Nightmare Mode)',
  },
];

async function getBuild(id: string): Promise<Build | null> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) return null;

  try {
    const { createClient } = await import('@supabase/supabase-js');
    const supabase = createClient(supabaseUrl, supabaseKey);
    const { data } = await supabase.from('builds').select('*').eq('id', id).single();
    return (data as Build) ?? null;
  } catch {
    return null;
  }
}

async function getItems(): Promise<Item[]> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) return SEED_ITEMS;

  try {
    const { createClient } = await import('@supabase/supabase-js');
    const supabase = createClient(supabaseUrl, supabaseKey);
    const { data } = await supabase.from('items').select('*');
    return (data as Item[]) ?? SEED_ITEMS;
  } catch {
    return SEED_ITEMS;
  }
}

function buildLootFilter(gear: Gear, items: Item[]): string {
  const itemMap = new Map(items.map((i) => [i.id, i]));
  const lines: string[] = ['# SiegeForge Loot Filter', '# Generated for this build', ''];

  for (const [, entry] of Object.entries(gear)) {
    if (!entry) continue;
    const item = itemMap.get(entry.id);
    if (!item) continue;
    lines.push(`ShowItem "${item.name}"`);
    lines.push(`  Rarity ${item.rarity}`);
    if (entry.stars) lines.push(`  MinStars ${entry.stars}`);
    lines.push('');
  }

  return lines.join('\n');
}

function StatBar({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="text-amber-500 w-16 capitalize text-right text-xs">{label}</span>
      <div className="flex-1 bg-slate-800 rounded-full h-1.5 overflow-hidden">
        <div
          className="h-full bg-amber-600 rounded-full"
          style={{ width: `${Math.min(100, (value / 1500) * 100)}%` }}
        />
      </div>
      <span className="text-slate-300 text-xs w-10 text-right">+{value}</span>
    </div>
  );
}

export default async function BuildPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [build, items] = await Promise.all([getBuild(id), getItems()]);

  if (!build) {
    notFound();
  }

  const itemMap = new Map(items.map((i) => [i.id, i]));
  const lootFilter = buildLootFilter(build.gear, items);

  // Aggregate totals
  const totalStats: Record<string, number> = {};
  for (const [, entry] of Object.entries(build.gear)) {
    if (!entry) continue;
    const item = itemMap.get(entry.id);
    if (!item) continue;
    for (const [stat, val] of Object.entries(item.base_stats)) {
      if (val !== undefined) totalStats[stat] = (totalStats[stat] ?? 0) + val;
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Breadcrumb */}
      <nav className="text-xs text-slate-500 mb-6">
        <Link href="/" className="hover:text-amber-400 transition-colors">
          Builds
        </Link>
        <span className="mx-2">/</span>
        <span className="text-slate-400">{build.title}</span>
      </nav>

      {/* Build header */}
      <div className="mb-8 p-6 bg-slate-950 border border-amber-900/50 rounded-xl">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div>
            <p className="text-xs font-medium text-amber-600 uppercase tracking-widest mb-1">
              {build.hero_class}
            </p>
            <h1 className="text-3xl font-bold text-amber-100 mb-2">{build.title}</h1>
            {build.description && (
              <p className="text-slate-400 max-w-lg leading-relaxed">{build.description}</p>
            )}
          </div>
          <CopyLootFilterButton lootFilter={lootFilter} />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Gear layout */}
        <section className="bg-slate-950 border border-amber-900/50 rounded-xl p-6">
          <h2 className="text-sm font-semibold text-amber-500 uppercase tracking-widest mb-6">
            Gear
          </h2>
          <div className="flex flex-wrap gap-8 justify-center">
            {GEAR_SLOTS.map(({ key, label }) => {
              const entry = build.gear[key as GearSlotType];
              const item = entry ? itemMap.get(entry.id) : undefined;
              const resolvedItem = item
                ? { ...item, stars: entry?.stars }
                : undefined;
              return (
                <GearSlot
                  key={key}
                  slot={key as GearSlotType}
                  label={label}
                  item={resolvedItem}
                />
              );
            })}
          </div>
        </section>

        {/* Stats summary */}
        <section className="bg-slate-950 border border-amber-900/50 rounded-xl p-6">
          <h2 className="text-sm font-semibold text-amber-500 uppercase tracking-widest mb-4">
            Total Stats
          </h2>
          {Object.keys(totalStats).length === 0 ? (
            <p className="text-slate-500 text-sm">No items equipped yet.</p>
          ) : (
            <div className="flex flex-col gap-2">
              {Object.entries(totalStats).map(([stat, val]) => (
                <StatBar key={stat} label={stat} value={val} />
              ))}
            </div>
          )}

          {/* Equipped items list */}
          <h2 className="text-sm font-semibold text-amber-500 uppercase tracking-widest mt-6 mb-3">
            Equipped Items
          </h2>
          <ul className="flex flex-col gap-2">
            {GEAR_SLOTS.map(({ key, label }) => {
              const entry = build.gear[key as GearSlotType];
              const item = entry ? itemMap.get(entry.id) : undefined;
              if (!item) return null;
              return (
                <li
                  key={key}
                  className="flex items-center gap-3 text-sm py-1 border-b border-slate-800/50 last:border-0"
                >
                  <span className="text-slate-500 w-16 text-xs text-right">{label}</span>
                  <div
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: RARITY_COLORS[item.rarity] }}
                  />
                  <span className={`font-medium ${RARITY_TEXT[item.rarity]}`}>{item.name}</span>
                  {entry?.stars && (
                    <span className="text-amber-400 text-xs ml-auto">{'★'.repeat(entry.stars)}</span>
                  )}
                </li>
              );
            })}
          </ul>
        </section>
      </div>

      {/* Loot filter preview */}
      <section className="mt-6 bg-slate-950 border border-amber-900/50 rounded-xl p-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-amber-500 uppercase tracking-widest">
            Loot Filter Preview
          </h2>
          <CopyLootFilterButton lootFilter={lootFilter} compact />
        </div>
        <pre className="text-xs text-slate-400 bg-slate-900 rounded-lg p-4 overflow-auto max-h-64 font-mono">
          {lootFilter}
        </pre>
      </section>
    </div>
  );
}
