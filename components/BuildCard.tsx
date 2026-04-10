import Link from 'next/link';
import { Build } from '@/types';
import { CLASS_ICONS } from '@/lib/constants';

interface BuildCardProps {
  build: Build;
}

export default function BuildCard({ build }: BuildCardProps) {
  const icon = CLASS_ICONS[build.hero_class as keyof typeof CLASS_ICONS] ?? '⚔';
  const slotCount = Object.keys(build.gear).length;
  const isDemo = build.id.startsWith('demo-') || build.id.startsWith('feat-');
  const isFeatured = build.category === 'featured';

  return (
    <Link
      href={isDemo ? '#' : `/builds/${build.id}`}
      className="build-card group relative flex flex-col overflow-hidden rounded-xl bg-slate-900 border border-amber-900/50 transition-all duration-300 hover:-translate-y-1 hover:border-amber-600/70"
    >
      {/* Inner glow on hover */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"
        style={{
          background:
            'radial-gradient(ellipse at 40% 0%, rgba(245,158,11,0.08) 0%, transparent 65%)',
        }}
      />

      {/* Faded background class icon */}
      <div className="pointer-events-none absolute -bottom-1 -right-1 text-7xl opacity-[0.04] group-hover:opacity-[0.09] transition-opacity duration-300 select-none leading-none">
        {icon}
      </div>

      <div className="relative flex flex-col gap-3 p-5 flex-1">

        {/* Header: class badge + category pill */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <span
              className="flex items-center justify-center w-8 h-8 flex-shrink-0 rounded-lg text-lg border border-amber-900/40 bg-amber-950/30 group-hover:border-amber-600/60 transition-colors"
            >
              {icon}
            </span>
            <span className="text-[10px] font-black uppercase tracking-widest text-amber-600 group-hover:text-amber-500 transition-colors truncate">
              {build.hero_class}
            </span>
          </div>

          {isFeatured ? (
            <span className="flex-shrink-0 text-[9px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full bg-cyan-950/50 border border-cyan-800/50 text-cyan-400">
              ✦ Featured
            </span>
          ) : (
            <span className="flex-shrink-0 text-[9px] font-bold tracking-widest uppercase px-2 py-0.5 rounded-full bg-amber-950/30 border border-amber-800/30 text-amber-500/80">
              ⚔ Community
            </span>
          )}
        </div>

        {/* Build title */}
        <h3
          className="text-lg font-black uppercase tracking-wide text-amber-100 group-hover:text-amber-50 transition-colors leading-tight"
          style={{ fontFamily: "'Cinzel', 'Georgia', serif" }}
        >
          {build.title}
        </h3>

        {/* Description */}
        {build.description && (
          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed flex-1">
            {build.description}
          </p>
        )}

        {/* Streamer attribution (featured only) */}
        {build.streamer && (
          <p className="text-[10px] text-cyan-600/70 font-semibold tracking-wide">
            by {build.streamer}
          </p>
        )}

        {/* Footer: gear pips + item count */}
        <div className="flex items-center justify-between pt-3 mt-auto border-t border-amber-900/20">
          <div className="flex gap-1 items-center">
            {Array.from({ length: Math.min(slotCount, 9) }).map((_, i) => (
              <div
                key={i}
                className={`w-1.5 h-1.5 rounded-full transition-colors ${
                  isFeatured ? 'bg-cyan-500/40 group-hover:bg-cyan-400/60' : 'bg-amber-500/40 group-hover:bg-amber-400/60'
                }`}
              />
            ))}
          </div>
          <span className="text-[10px] text-slate-600 group-hover:text-slate-500 transition-colors">
            {slotCount} {slotCount === 1 ? 'item' : 'items'}
          </span>
        </div>
      </div>
    </Link>
  );
}
