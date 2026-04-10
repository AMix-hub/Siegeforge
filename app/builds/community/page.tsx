import Link from 'next/link';
import { Build } from '@/types';
import { CLASS_ICONS, HERO_CLASSES } from '@/lib/constants';

// Static fallback builds
const DEMO_BUILDS: Build[] = [
  {
    id: 'demo-1',
    title: 'Arcane Annihilator',
    description: 'Max INT Pyromancer build with Starlight and The Bible for insane spell damage.',
    hero_class: 'Pyromancer',
    category: 'community',
    gear: { weapon: { id: 1, stars: 5 }, offhand: { id: 4, stars: 4 }, armor: { id: 3, stars: 3 } },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'demo-2',
    title: 'Undying Vessel',
    description: 'Tanky Jötunn that never dies. Stacked HP and armor for endless endurance.',
    hero_class: 'Jötunn',
    category: 'community',
    gear: { head: { id: 2, stars: 5 }, armor: { id: 3, stars: 5 } },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'demo-3',
    title: 'Prophet of Doom',
    description: 'Holy staff build for the Prophet. Pairs Starlight with Cowl of the Dead.',
    hero_class: 'Prophet',
    category: 'community',
    gear: { weapon: { id: 1, stars: 5 }, head: { id: 2, stars: 4 } },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'demo-4',
    title: 'Soul Reaper',
    description: 'Necromancer summoner build using Godly Raiment for sustained survivability.',
    hero_class: 'Necromancer',
    category: 'community',
    gear: { armor: { id: 3, stars: 5 }, offhand: { id: 4, stars: 3 } },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'demo-5',
    title: 'Storm Caller',
    description: 'Shaman build focused on lightning damage and debuffing enemies.',
    hero_class: 'Shaman',
    category: 'community',
    gear: { weapon: { id: 1, stars: 4 } },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'demo-6',
    title: 'Shadow Inquisitor',
    description: 'Witch Hunter that maximises critical hit rate with dual cursed relics.',
    hero_class: 'Witch Hunter',
    category: 'community',
    gear: { weapon: { id: 1, stars: 3 }, offhand: { id: 4, stars: 5 } },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

async function getCommunityBuilds(): Promise<Build[]> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) return DEMO_BUILDS;

  try {
    const { createClient } = await import('@supabase/supabase-js');
    const supabase = createClient(supabaseUrl, supabaseKey);
    const { data, error } = await supabase
      .from('builds')
      .select('*')
      .eq('category', 'community')
      .order('created_at', { ascending: false })
      .limit(30);
    if (error || !data || data.length === 0) return DEMO_BUILDS;
    return data as Build[];
  } catch {
    return DEMO_BUILDS;
  }
}

function GearPips({ slotCount }: { slotCount: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: slotCount }).map((_, i) => (
        <div key={i} className="w-1.5 h-1.5 rounded-full bg-amber-500/45" />
      ))}
    </div>
  );
}

function CommunityCard({ build }: { build: Build }) {
  const icon = CLASS_ICONS[build.hero_class as keyof typeof CLASS_ICONS] ?? '⚔';
  const slotCount = Object.keys(build.gear).length;
  const isDemo = build.id.startsWith('demo-');

  return (
    <Link
      href={isDemo ? '#' : `/builds/${build.id}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl transition-all duration-400 hover:-translate-y-1"
      style={{
        background: 'linear-gradient(160deg, rgba(20,10,3,0.97) 0%, rgba(6,6,14,0.99) 100%)',
        border: '1px solid rgba(180,83,9,0.18)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.5)',
      }}
    >
      {/* Hover glow overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-2xl"
        style={{ background: 'radial-gradient(ellipse at 40% 20%, rgba(180,83,9,0.12) 0%, transparent 60%)' }}
      />

      {/* Large faded class icon */}
      <div className="pointer-events-none absolute -bottom-3 -right-3 text-8xl opacity-[0.05] group-hover:opacity-[0.10] transition-opacity duration-400 select-none leading-none">
        {icon}
      </div>

      <div className="relative flex flex-col gap-4 p-6 flex-1">

        {/* Class badge + community pill */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className="flex items-center justify-center w-9 h-9 rounded-xl text-xl"
              style={{
                background: 'linear-gradient(135deg, rgba(180,83,9,0.22), rgba(180,83,9,0.06))',
                border: '1px solid rgba(180,83,9,0.35)',
              }}
            >
              {icon}
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-widest text-amber-700/90">
              {build.hero_class}
            </span>
          </div>
          <span
            className="text-[9px] font-bold tracking-widest uppercase px-2 py-1 rounded-full"
            style={{ background: 'rgba(180,83,9,0.10)', border: '1px solid rgba(180,83,9,0.28)', color: '#fbbf24' }}
          >
            ⚔ Community
          </span>
        </div>

        {/* Title */}
        <h2 className="text-xl font-black uppercase tracking-wide text-amber-100 group-hover:text-amber-50 transition-colors leading-tight">
          {build.title}
        </h2>

        {/* Description */}
        {build.description && (
          <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed flex-1">{build.description}</p>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t mt-auto"
          style={{ borderColor: 'rgba(180,83,9,0.12)' }}>
          <GearPips slotCount={slotCount} />
          <span className="text-[10px] text-slate-600">
            {slotCount} {slotCount === 1 ? 'item' : 'items'}
          </span>
        </div>
      </div>
    </Link>
  );
}

export default async function CommunityBuildsPage() {
  const builds = await getCommunityBuilds();

  return (
    <div className="relative overflow-hidden min-h-screen">

      {/* Ambient orbs */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full opacity-[0.08]"
          style={{ background: 'radial-gradient(circle, #b45309 0%, transparent 70%)' }} />
        <div className="absolute top-1/2 -left-40 w-[500px] h-[500px] rounded-full opacity-[0.05]"
          style={{ background: 'radial-gradient(circle, #7c3aed 0%, transparent 70%)' }} />
      </div>

      {/* ── Hero ── */}
      <section className="relative max-w-6xl mx-auto px-4 pt-16 pb-10 text-center">
        {/* Breadcrumb */}
        <div className="flex items-center justify-center gap-2 text-[10px] tracking-widest uppercase text-slate-600 mb-8">
          <Link href="/" className="hover:text-slate-400 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-amber-700">Community Builds</span>
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-semibold tracking-[0.3em] uppercase mb-6"
          style={{ background: 'rgba(180,83,9,0.08)', border: '1px solid rgba(180,83,9,0.28)', color: '#fbbf24' }}>
          ⚔ Forged by the Community
        </div>

        <h1
          className="text-4xl sm:text-5xl md:text-7xl font-black uppercase tracking-[0.1em] text-gradient-gold mb-5"
          style={{ textShadow: '0 0 80px rgba(180,83,9,0.2)' }}
        >
          Community<br className="md:hidden" /> Builds
        </h1>
        <p className="text-slate-400 max-w-lg mx-auto text-sm leading-relaxed">
          Player-crafted builds from every corner of Hero Siege.
          Share your playstyle, discover new strategies, and forge your legacy.
        </p>
      </section>

      {/* ── Class filter ── */}
      <div className="max-w-6xl mx-auto px-4 mb-10">
        <div className="flex flex-wrap gap-2 justify-center">
          <button
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[10px] font-semibold tracking-widest uppercase transition-all"
            style={{ background: 'rgba(180,83,9,0.15)', border: '1px solid rgba(180,83,9,0.45)', color: '#fcd34d' }}
          >
            ⚔ All Classes
          </button>
          {HERO_CLASSES.map((cls) => (
            <button
              key={cls}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-medium tracking-wide uppercase transition-all hover:text-amber-300 group"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', color: '#64748b' }}
            >
              <span className="text-sm group-hover:scale-110 transition-transform inline-block">
                {CLASS_ICONS[cls as keyof typeof CLASS_ICONS]}
              </span>
              {cls}
            </button>
          ))}
        </div>
      </div>

      {/* ── Build grid ── */}
      <div className="max-w-6xl mx-auto px-4 pb-20">
        {builds.length === 0 ? (
          <div className="text-center py-24 text-slate-600">
            <p className="text-5xl mb-5">⚔</p>
            <p className="text-lg tracking-wider">No builds yet. Be the first to forge one.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {builds.map((build) => (
              <CommunityCard key={build.id} build={build} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
