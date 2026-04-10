import Link from 'next/link';
import { CLASS_ICONS, HERO_CLASSES } from '@/lib/constants';
import BuildCard from '@/components/BuildCard';
import { Build } from '@/types';

const PREVIEW_CLASS_COUNT = 5;

// Representative showcase builds for the homepage gallery
const SHOWCASE_BUILDS: Build[] = [
  {
    id: 'feat-1',
    title: 'Inferno Overlord',
    description: "Astarot's signature Pyromancer build. Dual-channeling Starlight + The Bible to clear screens in seconds.",
    hero_class: 'Pyromancer',
    category: 'featured',
    streamer: 'Astarot',
    gear: { weapon: { id: 1, stars: 5 }, offhand: { id: 4, stars: 5 }, armor: { id: 3, stars: 4 } },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
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
    id: 'feat-2',
    title: 'Eternal Lich',
    description: "SoulHarvester's immortal Necromancer. Full Godly Raiment stacked with HP, impossible to kill.",
    hero_class: 'Necromancer',
    category: 'featured',
    streamer: 'SoulHarvester',
    gear: { armor: { id: 3, stars: 5 }, head: { id: 2, stars: 5 }, offhand: { id: 4, stars: 4 } },
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
    id: 'feat-4',
    title: 'Arctic Juggernaut',
    description: "FrozenKing's insane Jötunn tank. Five-star Cowl + Raiment with no damage taken runs on Hell.",
    hero_class: 'Jötunn',
    category: 'featured',
    streamer: 'FrozenKing',
    gear: { head: { id: 2, stars: 5 }, armor: { id: 3, stars: 5 }, offhand: { id: 4, stars: 3 } },
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

export default function HomePage() {
  const classEntries = HERO_CLASSES.map((cls) => ({
    cls,
    icon: CLASS_ICONS[cls as keyof typeof CLASS_ICONS] ?? '⚔',
  }));

  return (
    <div className="relative overflow-hidden">

      {/* ── Ambient background orbs ── */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden -z-10">
        <div
          className="animate-orb-drift absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full opacity-[0.07]"
          style={{ background: 'radial-gradient(circle, #b45309 0%, transparent 70%)' }}
        />
        <div
          className="animate-orb-drift absolute -top-20 -right-20 w-[500px] h-[500px] rounded-full opacity-[0.06]"
          style={{ background: 'radial-gradient(circle, #7c3aed 0%, transparent 70%)', animationDelay: '-4s' }}
        />
        <div
          className="animate-orb-drift absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full opacity-[0.05]"
          style={{ background: 'radial-gradient(circle, #0891b2 0%, transparent 70%)', animationDelay: '-8s' }}
        />
      </div>

      {/* ── Hero section ── */}
      <section className="relative max-w-6xl mx-auto px-4 pt-20 pb-12 text-center">
        <p className="text-[11px] tracking-[0.5em] uppercase text-amber-600/80 mb-4 animate-fade-up">
          Hero Siege Build Archive
        </p>
        <h1
          className="text-5xl sm:text-6xl md:text-8xl font-black uppercase tracking-[0.12em] text-gradient-gold mb-5 animate-fade-up"
          style={{ animationDelay: '0.1s', textShadow: '0 0 80px rgba(180,83,9,0.25)', fontFamily: "'Cinzel', 'Georgia', serif" }}
        >
          SiegeForge
        </h1>
        <p className="text-slate-400 max-w-xl mx-auto text-base leading-relaxed animate-fade-up" style={{ animationDelay: '0.2s' }}>
          The ultimate build hub for Hero Siege. Browse certified streamer loadouts
          or discover what the community is forging right now.
        </p>

        {/* CTA buttons */}
        <div className="flex items-center justify-center gap-4 mt-8 animate-fade-up" style={{ animationDelay: '0.3s' }}>
          <Link href="/builds/featured" className="btn-forge">
            ✦ Featured Builds
          </Link>
          <Link href="/builds/community" className="btn-forge-ghost">
            ⚔ Community Builds
          </Link>
        </div>
      </section>

      {/* ── Two build section cards ── */}
      <section className="max-w-5xl mx-auto px-4 pb-16 grid sm:grid-cols-2 gap-6">

        {/* Featured Builds */}
        <Link
          href="/builds/featured"
          className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-cyan-800/30 p-8 min-h-[320px] transition-all duration-500 hover:-translate-y-1 glow-cyan hover:border-cyan-500/60"
          style={{ background: 'linear-gradient(145deg, rgba(8,25,40,0.95) 0%, rgba(6,6,14,0.98) 100%)' }}
        >
          {/* Corner glow */}
          <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
            style={{ background: 'radial-gradient(ellipse at 30% 30%, rgba(6,182,212,0.12) 0%, transparent 60%)' }} />

          {/* Top badge */}
          <div className="flex items-center gap-3 mb-6">
            <span className="flex items-center justify-center w-11 h-11 rounded-xl text-2xl"
              style={{ background: 'linear-gradient(135deg, rgba(6,182,212,0.2), rgba(6,182,212,0.05))', border: '1px solid rgba(6,182,212,0.3)' }}>
              ✦
            </span>
            <div>
              <p className="text-[10px] tracking-[0.35em] uppercase text-cyan-500/70">Certified</p>
              <p className="text-xs font-bold text-cyan-300/90 tracking-wider uppercase">Pro Builds</p>
            </div>
            <span className="ml-auto text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full text-cyan-400 border border-cyan-700/50"
              style={{ background: 'rgba(6,182,212,0.08)' }}>
              Featured
            </span>
          </div>

          <div className="flex-1">
            <h2 className="text-3xl font-black uppercase tracking-wider text-gradient-cyan mb-3"
              style={{ fontFamily: "'Cinzel', 'Georgia', serif" }}>
              Featured<br />Builds
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Curated loadouts certified by top streamers and competitive players.
              The meta, perfected.
            </p>
          </div>

          <div className="flex items-center justify-between mt-8 pt-5 border-t border-white/[0.06]">
            <div className="flex -space-x-2">
              {['🎮', '🏆', '⚡', '💠'].map((emoji, i) => (
                <span key={i} className="flex items-center justify-center w-8 h-8 rounded-full text-sm border border-cyan-900/50"
                  style={{ background: 'rgba(8,145,178,0.15)', zIndex: 4 - i }}>
                  {emoji}
                </span>
              ))}
            </div>
            <span className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-cyan-400 group-hover:text-cyan-300 transition-colors">
              Browse <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
            </span>
          </div>
        </Link>

        {/* Community Builds */}
        <Link
          href="/builds/community"
          className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-amber-800/30 p-8 min-h-[320px] transition-all duration-500 hover:-translate-y-1 glow-amber hover:border-amber-600/60"
          style={{ background: 'linear-gradient(145deg, rgba(25,12,5,0.95) 0%, rgba(6,6,14,0.98) 100%)' }}
        >
          {/* Corner glow */}
          <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
            style={{ background: 'radial-gradient(ellipse at 70% 30%, rgba(180,83,9,0.14) 0%, transparent 60%)' }} />

          {/* Top badge */}
          <div className="flex items-center gap-3 mb-6">
            <span className="flex items-center justify-center w-11 h-11 rounded-xl text-2xl"
              style={{ background: 'linear-gradient(135deg, rgba(180,83,9,0.2), rgba(180,83,9,0.05))', border: '1px solid rgba(180,83,9,0.3)' }}>
              ⚔
            </span>
            <div>
              <p className="text-[10px] tracking-[0.35em] uppercase text-amber-600/70">Player-Made</p>
              <p className="text-xs font-bold text-amber-400/90 tracking-wider uppercase">Community</p>
            </div>
            <span className="ml-auto text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-full text-amber-400 border border-amber-700/50"
              style={{ background: 'rgba(180,83,9,0.08)' }}>
              Open
            </span>
          </div>

          <div className="flex-1">
            <h2 className="text-3xl font-black uppercase tracking-wider text-gradient-gold mb-3"
              style={{ fontFamily: "'Cinzel', 'Georgia', serif" }}>
              Community<br />Builds
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Builds forged and shared by the community. Experiment, iterate,
              and find your perfect playstyle.
            </p>
          </div>

          <div className="flex items-center justify-between mt-8 pt-5 border-t border-white/[0.06]">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              {HERO_CLASSES.slice(0, PREVIEW_CLASS_COUNT).map((cls) => (
                <span key={cls} className="text-base" title={cls}>
                  {CLASS_ICONS[cls as keyof typeof CLASS_ICONS]}
                </span>
              ))}
              <span className="text-slate-600">+{HERO_CLASSES.length - PREVIEW_CLASS_COUNT} more</span>
            </div>
            <span className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-amber-400 group-hover:text-amber-300 transition-colors">
              Browse <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
            </span>
          </div>
        </Link>
      </section>

      {/* ── Build Gallery ── */}
      <section className="max-w-6xl mx-auto px-4 pb-20">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-[10px] tracking-[0.4em] uppercase text-amber-600/70 mb-1">Loot Drops</p>
            <h2
              className="text-2xl sm:text-3xl font-black uppercase tracking-wider text-gradient-gold"
              style={{ fontFamily: "'Cinzel', 'Georgia', serif" }}
            >
              Showcase Builds
            </h2>
          </div>
          <Link
            href="/builds/community"
            className="btn-forge hidden sm:inline-flex"
          >
            View All →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SHOWCASE_BUILDS.map((build) => (
            <BuildCard key={build.id} build={build} />
          ))}
        </div>

        <div className="flex justify-center mt-8 sm:hidden">
          <Link href="/builds/community" className="btn-forge">
            View All Builds →
          </Link>
        </div>
      </section>

      {/* ── Class showcase strip ── */}
      <section className="border-t border-amber-900/20 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <p className="text-center text-[10px] tracking-[0.45em] uppercase text-slate-600 mb-7">
            All Supported Classes
          </p>
          <div className="grid grid-cols-3 xs:grid-cols-4 sm:grid-cols-6 md:grid-cols-12 gap-3">
            {classEntries.map(({ cls, icon }) => (
              <div
                key={cls}
                className="flex flex-col items-center gap-1.5 py-3 rounded-xl border border-white/[0.05] bg-white/[0.02] hover:bg-amber-950/20 hover:border-amber-800/40 transition-all cursor-default group"
              >
                <span className="text-2xl group-hover:scale-110 transition-transform">{icon}</span>
                <span className="text-[9px] font-medium tracking-wide text-slate-600 group-hover:text-amber-500/80 transition-colors text-center leading-tight">
                  {cls}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
