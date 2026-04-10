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
        <div key={i} className="w-1.5 h-1.5 rounded-full bg-amber-500/60" />
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
        'group relative flex flex-col gap-3 p-5 rounded-xl',
        'bg-slate-950 border border-amber-900/50',
        'hover:border-amber-700/80 hover:bg-slate-900/80',
        'transition-all duration-200 shadow-lg hover:shadow-amber-900/20',
        isDemo ? 'cursor-default' : 'cursor-pointer',
      ].join(' ')}
    >
      {/* Class icon badge */}
      <div className="absolute top-4 right-4 text-2xl opacity-20 group-hover:opacity-40 transition-opacity select-none">
        {icon}
      </div>

      {/* Class + title */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-lg">{icon}</span>
          <span className="text-xs font-medium text-amber-600 uppercase tracking-widest">
            {build.hero_class}
          </span>
        </div>
        <h2 className="text-lg font-bold text-amber-100 group-hover:text-amber-200 transition-colors leading-tight">
          {build.title}
        </h2>
      </div>

      {/* Description */}
      {build.description && (
        <p className="text-sm text-slate-400 line-clamp-2 leading-relaxed">{build.description}</p>
      )}

      {/* Footer row */}
      <div className="flex items-center justify-between mt-auto pt-2 border-t border-slate-800">
        <GearPips slotCount={slotCount} />
        <span className="text-xs text-slate-600">
          {slotCount} {slotCount === 1 ? 'item' : 'items'} equipped
        </span>
      </div>
    </Link>
  );
}

export default async function HomePage() {
  const builds = await getBuilds();

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Hero header */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-amber-400 tracking-wider mb-3">
          Build Gallery
        </h1>
        <p className="text-slate-400 max-w-xl mx-auto">
          Discover community builds for every Hero Siege class. Click a build to view the full
          gear breakdown and copy a loot filter.
        </p>
      </div>

      {/* Class filter pills (visual only) */}
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        <span className="px-3 py-1 rounded-full bg-amber-900/30 border border-amber-700/40 text-amber-300 text-xs font-medium">
          All Classes
        </span>
        {HERO_CLASSES.map((cls) => (
          <span
            key={cls}
            className="px-3 py-1 rounded-full bg-slate-900 border border-slate-700/50 text-slate-400 text-xs hover:border-amber-700/50 hover:text-amber-300 transition-colors cursor-pointer"
          >
            {CLASS_ICONS[cls as keyof typeof CLASS_ICONS]} {cls}
          </span>
        ))}
      </div>

      {/* Build grid */}
      {builds.length === 0 ? (
        <div className="text-center py-20 text-slate-500">
          <p className="text-4xl mb-4">⚔</p>
          <p className="text-lg">No builds yet. Be the first to forge one.</p>
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
