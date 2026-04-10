import Link from 'next/link';
import { Build } from '@/types';
import { CLASS_ICONS, HERO_CLASSES } from '@/lib/constants';

// Static fallback builds shown when Supabase is not yet configured
const DEMO_BUILDS: Build[] = [
  {
    id: 'demo-1',
    title: 'Arcane Annihilator',
    description: 'Max INT Pyromancer build with Starlight and The Bible for insane spell damage.',
    hero_class: 'Pyromancer',
    gear: { weapon: { id: 1, stars: 5 }, offhand: { id: 4, stars: 4 }, armor: { id: 3, stars: 3 } },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'demo-2',
    title: 'Undying Vessel',
    description: 'Tanky Jötunn that never dies. Stacked HP and armor for endless endurance.',
    hero_class: 'Jötunn',
    gear: { head: { id: 2, stars: 5 }, armor: { id: 3, stars: 5 } },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'demo-3',
    title: 'Prophet of Doom',
    description: 'Holy staff build for the Prophet. Pairs Starlight with Cowl of the Dead.',
    hero_class: 'Prophet',
    gear: { weapon: { id: 1, stars: 5 }, head: { id: 2, stars: 4 } },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'demo-4',
    title: 'Soul Reaper',
    description: 'Necromancer summoner build using Godly Raiment for sustained survivability.',
    hero_class: 'Necromancer',
    gear: { armor: { id: 3, stars: 5 }, offhand: { id: 4, stars: 3 } },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'demo-5',
    title: 'Storm Caller',
    description: 'Shaman build focused on lightning damage and debuffing enemies.',
    hero_class: 'Shaman',
    gear: { weapon: { id: 1, stars: 4 } },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'demo-6',
    title: 'Shadow Inquisitor',
    description: 'Witch Hunter that maximises critical hit rate with dual cursed relics.',
    hero_class: 'Witch Hunter',
    gear: { weapon: { id: 1, stars: 3 }, offhand: { id: 4, stars: 5 } },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

async function getBuilds(): Promise<Build[]> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return DEMO_BUILDS;
  }

  try {
    const { createClient } = await import('@supabase/supabase-js');
    const supabase = createClient(supabaseUrl, supabaseKey);
    const { data, error } = await supabase
      .from('builds')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(30);
    if (error || !data) return DEMO_BUILDS;
    return data as Build[];
  } catch {
    return DEMO_BUILDS;
  }
}

function GearPips({ slotCount }: { slotCount: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: slotCount }).map((_, i) => (
        <div key={i} className="w-1.5 h-1.5 rounded-full bg-amber-500/50" />
      ))}
    </div>
  );
}

function BuildCard({ build }: { build: Build }) {
  const icon = CLASS_ICONS[build.hero_class as keyof typeof CLASS_ICONS] ?? '⚔';
  const slotCount = Object.keys(build.gear).length;
  const isDemo = build.id.startsWith('demo-');

  return (
    <Link
      href={isDemo ? '#' : `/builds/${build.id}`}
      className={[
        'group relative flex flex-col gap-3 p-5 rounded-xl overflow-hidden',
        'bg-gradient-to-b from-slate-900/90 to-slate-950',
        'border border-amber-900/40',
        'hover:border-amber-600/70',
        'transition-all duration-300 shadow-lg hover:shadow-amber-900/30 hover:shadow-xl',
        isDemo ? 'cursor-default' : 'cursor-pointer',
      ].join(' ')}
    >
      {/* Ambient corner glow */}
      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-amber-900/10 via-transparent to-transparent" />

      {/* Large faded class icon — background decoration */}
      <div className="pointer-events-none absolute -bottom-2 -right-2 text-7xl opacity-[0.07] group-hover:opacity-[0.13] transition-opacity duration-300 select-none leading-none">
        {icon}
      </div>

      {/* Class badge — icon + name */}
      <div className="flex items-center gap-2">
        <span className="flex items-center justify-center w-9 h-9 rounded-lg bg-amber-900/30 border border-amber-800/50 text-xl group-hover:bg-amber-900/50 transition-colors">
          {icon}
        </span>
        <span className="text-xs font-semibold text-amber-500 uppercase tracking-widest">
          {build.hero_class}
        </span>
      </div>

      {/* Build title */}
      <h2 className="text-lg font-bold text-amber-100 group-hover:text-amber-200 transition-colors leading-tight">
        {build.title}
      </h2>

      {/* Description */}
      {build.description && (
        <p className="text-sm text-slate-400 line-clamp-2 leading-relaxed flex-1">{build.description}</p>
      )}

      {/* Footer row */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-800/80 mt-auto">
        <GearPips slotCount={slotCount} />
        <span className="text-xs text-slate-600">
          {slotCount} {slotCount === 1 ? 'item' : 'items'}
        </span>
      </div>
    </Link>
  );
}

function Divider() {
  return (
    <div className="flex items-center gap-3 my-8">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-900/50 to-amber-900/50" />
      <span className="text-amber-700 text-sm">⚔</span>
      <div className="flex-1 h-px bg-gradient-to-l from-transparent via-amber-900/50 to-amber-900/50" />
    </div>
  );
}

export default async function HomePage() {
  const builds = await getBuilds();

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">

      {/* ── Hero banner ── */}
      <div className="relative text-center py-10 mb-2">
        {/* Faint radial glow behind title */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-full bg-[radial-gradient(ellipse_at_50%_40%,rgba(120,53,15,0.18)_0%,transparent_70%)]" />

        <p className="relative text-xs tracking-[0.4em] uppercase text-amber-700 mb-3">
          Community Build Archive
        </p>
        <h1 className="relative text-5xl md:text-6xl font-bold tracking-widest text-amber-400 uppercase mb-4"
            style={{ textShadow: '0 0 40px rgba(180,83,9,0.5), 0 2px 4px rgba(0,0,0,0.8)' }}>
          Build Gallery
        </h1>
        <p className="relative text-slate-400 max-w-lg mx-auto leading-relaxed">
          Discover and share optimised builds for every Hero Siege class.
          Choose a class below or browse all builds.
        </p>
      </div>

      <Divider />

      {/* ── Class filter grid ── */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 mb-10">
        {/* All classes pill */}
        <button className="col-span-3 sm:col-span-4 md:col-span-6 flex items-center justify-center gap-2 py-2 rounded-lg bg-amber-900/30 border border-amber-700/50 text-amber-300 text-xs font-semibold tracking-widest uppercase hover:bg-amber-900/50 hover:border-amber-600 transition-all cursor-pointer">
          <span className="text-base">⚔</span> All Classes
        </button>

        {HERO_CLASSES.map((cls) => (
          <button
            key={cls}
            className="flex flex-col items-center gap-1.5 py-3 px-1 rounded-xl bg-slate-900/70 border border-slate-800 text-slate-400 hover:bg-slate-800/80 hover:border-amber-800/60 hover:text-amber-300 transition-all cursor-pointer group"
          >
            <span className="text-2xl group-hover:scale-110 transition-transform">
              {CLASS_ICONS[cls as keyof typeof CLASS_ICONS]}
            </span>
            <span className="text-[10px] font-medium tracking-wide text-center leading-tight">
              {cls}
            </span>
          </button>
        ))}
      </div>

      {/* ── Build grid ── */}
      {builds.length === 0 ? (
        <div className="text-center py-24 text-slate-500">
          <p className="text-5xl mb-5">⚔</p>
          <p className="text-lg tracking-wider">No builds yet. Be the first to forge one.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {builds.map((build) => (
            <BuildCard key={build.id} build={build} />
          ))}
        </div>
      )}
    </div>
  );
}

