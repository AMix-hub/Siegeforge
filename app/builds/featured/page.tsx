import Link from 'next/link';
import { Build } from '@/types';
import { CLASS_ICONS, HERO_CLASSES } from '@/lib/constants';

// Demo featured builds from well-known streamers/players
const FEATURED_BUILDS: Build[] = [
  {
    id: 'feat-1',
    title: 'Inferno Overlord',
    description:
      'Astarot\'s signature Pyromancer build. Dual-channeling Starlight + The Bible to clear screens in seconds.',
    hero_class: 'Pyromancer',
    category: 'featured',
    streamer: 'Astarot',
    gear: { weapon: { id: 1, stars: 5 }, offhand: { id: 4, stars: 5 }, armor: { id: 3, stars: 4 } },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'feat-2',
    title: 'Eternal Lich',
    description:
      'SoulHarvester\'s immortal Necromancer. Full Godly Raiment stacked with HP, impossible to kill.',
    hero_class: 'Necromancer',
    category: 'featured',
    streamer: 'SoulHarvester',
    gear: { armor: { id: 3, stars: 5 }, head: { id: 2, stars: 5 }, offhand: { id: 4, stars: 4 } },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'feat-3',
    title: 'Divine Ascendant',
    description:
      'MiracleGG\'s world-record Prophet build. Holy Starlight + Cowl combo obliterates everything Act 5+.',
    hero_class: 'Prophet',
    category: 'featured',
    streamer: 'MiracleGG',
    gear: { weapon: { id: 1, stars: 5 }, head: { id: 2, stars: 5 } },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'feat-4',
    title: 'Arctic Juggernaut',
    description:
      'FrozenKing\'s insane Jötunn tank. Five-star Cowl + Raiment with no damage taken runs on Hell.',
    hero_class: 'Jötunn',
    category: 'featured',
    streamer: 'FrozenKing',
    gear: { head: { id: 2, stars: 5 }, armor: { id: 3, stars: 5 }, offhand: { id: 4, stars: 3 } },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'feat-5',
    title: 'Thundersoul',
    description:
      'LightningBro\'s Shaman built around stacking lightning crit. Full screen clears in under 3 seconds.',
    hero_class: 'Shaman',
    category: 'featured',
    streamer: 'LightningBro',
    gear: { weapon: { id: 1, stars: 5 }, offhand: { id: 4, stars: 4 } },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'feat-6',
    title: 'Cursed Marksman',
    description:
      'Vexx\'s speed-farm Witch Hunter for infinite looping. Dual cursed relics with max crit scaling.',
    hero_class: 'Witch Hunter',
    category: 'featured',
    streamer: 'Vexx',
    gear: { weapon: { id: 1, stars: 4 }, offhand: { id: 4, stars: 5 }, head: { id: 2, stars: 3 } },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

async function getFeaturedBuilds(): Promise<Build[]> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) return FEATURED_BUILDS;

  try {
    const { createClient } = await import('@supabase/supabase-js');
    const supabase = createClient(supabaseUrl, supabaseKey);
    const { data, error } = await supabase
      .from('builds')
      .select('*')
      .eq('category', 'featured')
      .order('created_at', { ascending: false })
      .limit(30);
    if (error || !data || data.length === 0) return FEATURED_BUILDS;
    return data as Build[];
  } catch {
    return FEATURED_BUILDS;
  }
}

// Initials avatar color buckets
const STREAMER_COLORS = [
  { bg: 'rgba(6,182,212,0.18)', border: 'rgba(6,182,212,0.45)', text: '#67e8f9' },
  { bg: 'rgba(124,58,237,0.18)', border: 'rgba(124,58,237,0.45)', text: '#c4b5fd' },
  { bg: 'rgba(236,72,153,0.18)', border: 'rgba(236,72,153,0.45)', text: '#f9a8d4' },
  { bg: 'rgba(180,83,9,0.18)',   border: 'rgba(180,83,9,0.45)',   text: '#fcd34d' },
];

function streamerColor(name: string) {
  const idx = name.charCodeAt(0) % STREAMER_COLORS.length;
  return STREAMER_COLORS[idx];
}

function FeaturedCard({ build }: { build: Build }) {
  const icon = CLASS_ICONS[build.hero_class as keyof typeof CLASS_ICONS] ?? '⚔';
  const slotCount = Object.keys(build.gear).length;
  const isDemo = build.id.startsWith('feat-');
  const sc = streamerColor(build.streamer ?? 'A');
  const initials = (build.streamer ?? '??').slice(0, 2).toUpperCase();

  return (
    <Link
      href={isDemo ? '#' : `/builds/${build.id}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl transition-all duration-400 hover:-translate-y-1"
      style={{
        background: 'linear-gradient(160deg, rgba(8,20,35,0.97) 0%, rgba(6,6,14,0.99) 100%)',
        border: '1px solid rgba(6,182,212,0.18)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.5)',
      }}
    >
      {/* Hover glow overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400 rounded-2xl"
        style={{ background: 'radial-gradient(ellipse at 40% 20%, rgba(6,182,212,0.10) 0%, transparent 60%)' }}
      />

      {/* Large faded class icon */}
      <div className="pointer-events-none absolute -bottom-3 -right-3 text-8xl opacity-[0.05] group-hover:opacity-[0.10] transition-opacity duration-400 select-none leading-none">
        {icon}
      </div>

      {/* Card body */}
      <div className="relative flex flex-col gap-4 p-6 flex-1">

        {/* Streamer badge */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span
              className="flex items-center justify-center w-8 h-8 rounded-full text-xs font-black"
              style={{ background: sc.bg, border: `1px solid ${sc.border}`, color: sc.text }}
            >
              {initials}
            </span>
            <div>
              <p className="text-[9px] tracking-[0.3em] uppercase text-slate-600">Streamer</p>
              <p className="text-xs font-bold" style={{ color: sc.text }}>{build.streamer}</p>
            </div>
          </div>
          <span
            className="flex items-center gap-1 text-[9px] font-bold tracking-widest uppercase px-2 py-1 rounded-full"
            style={{ background: 'rgba(6,182,212,0.10)', border: '1px solid rgba(6,182,212,0.30)', color: '#22d3ee' }}
          >
            ✦ Certified
          </span>
        </div>

        {/* Class + Title */}
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-lg leading-none">{icon}</span>
            <span className="text-[10px] font-semibold uppercase tracking-widest text-cyan-600/80">{build.hero_class}</span>
          </div>
          <h2 className="text-xl font-black uppercase tracking-wide text-white group-hover:text-cyan-100 transition-colors leading-tight">
            {build.title}
          </h2>
        </div>

        {/* Description */}
        {build.description && (
          <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed flex-1">{build.description}</p>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t mt-auto"
          style={{ borderColor: 'rgba(6,182,212,0.12)' }}>
          <div className="flex gap-1">
            {Array.from({ length: slotCount }).map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 rounded-full" style={{ background: 'rgba(6,182,212,0.5)' }} />
            ))}
          </div>
          <span className="text-[10px] text-slate-600">{slotCount} {slotCount === 1 ? 'item' : 'items'}</span>
        </div>
      </div>
    </Link>
  );
}

export default async function FeaturedBuildsPage() {
  const builds = await getFeaturedBuilds();

  return (
    <div className="relative overflow-hidden min-h-screen">

      {/* Ambient orbs */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full opacity-[0.07]"
          style={{ background: 'radial-gradient(circle, #06b6d4 0%, transparent 70%)' }} />
        <div className="absolute top-1/2 -right-40 w-[500px] h-[500px] rounded-full opacity-[0.05]"
          style={{ background: 'radial-gradient(circle, #7c3aed 0%, transparent 70%)' }} />
      </div>

      {/* ── Hero ── */}
      <section className="relative max-w-6xl mx-auto px-4 pt-16 pb-10 text-center">
        {/* Breadcrumb */}
        <div className="flex items-center justify-center gap-2 text-[10px] tracking-widest uppercase text-slate-600 mb-8">
          <Link href="/" className="hover:text-slate-400 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-cyan-600">Featured Builds</span>
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-semibold tracking-[0.3em] uppercase mb-6"
          style={{ background: 'rgba(6,182,212,0.08)', border: '1px solid rgba(6,182,212,0.25)', color: '#22d3ee' }}>
          ✦ Certified by Top Streamers &amp; Players
        </div>

        <h1
          className="text-5xl md:text-7xl font-black uppercase tracking-[0.1em] text-gradient-cyan mb-5"
          style={{ textShadow: '0 0 80px rgba(6,182,212,0.2)' }}
        >
          Featured<br className="md:hidden" /> Builds
        </h1>
        <p className="text-slate-400 max-w-lg mx-auto text-sm leading-relaxed">
          Curated loadouts from top Hero Siege streamers and competitive players.
          These builds are tested, refined, and certified to perform.
        </p>
      </section>

      {/* ── Class filter ── */}
      <div className="max-w-6xl mx-auto px-4 mb-10">
        <div className="flex flex-wrap gap-2 justify-center">
          <button
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[10px] font-semibold tracking-widest uppercase transition-all"
            style={{ background: 'rgba(6,182,212,0.15)', border: '1px solid rgba(6,182,212,0.4)', color: '#67e8f9' }}
          >
            ✦ All Classes
          </button>
          {HERO_CLASSES.map((cls) => (
            <button
              key={cls}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-medium tracking-wide uppercase transition-all hover:text-cyan-300 group"
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
            <p className="text-5xl mb-5">✦</p>
            <p className="text-lg tracking-wider">No featured builds yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {builds.map((build) => (
              <FeaturedCard key={build.id} build={build} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
