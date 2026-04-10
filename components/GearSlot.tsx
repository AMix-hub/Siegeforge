'use client';

import { Item, GearSlotType } from '@/types';
import { RARITY_COLORS, RARITY_GLOW, RARITY_BORDER, RARITY_TEXT } from '@/lib/constants';

interface GearSlotProps {
  slot?: GearSlotType;
  label: string;
  item?: Item & { stars?: number };
  onClick?: () => void;
}

function StarDisplay({ stars }: { stars: number }) {
  return (
    <div className="flex gap-0.5 justify-center mt-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={i < stars ? 'text-amber-400 text-xs' : 'text-slate-600 text-xs'}
        >
          ★
        </span>
      ))}
    </div>
  );
}

export default function GearSlot({ label, item, onClick }: GearSlotProps) {
  const isEmpty = !item;

  const borderClass = item ? RARITY_BORDER[item.rarity] : 'border-slate-700/60';
  const glowClass = item ? RARITY_GLOW[item.rarity] : '';
  const textClass = item ? RARITY_TEXT[item.rarity] : 'text-slate-500';

  return (
    <button
      onClick={onClick}
      title={item ? `${item.name} (${item.rarity})` : `Empty – ${label}`}
      className={[
        'relative flex flex-col items-center justify-center',
        'w-20 h-20 rounded-lg border-2 transition-all duration-200',
        'bg-slate-900/80 hover:bg-slate-800/90',
        borderClass,
        item ? `shadow-lg ${glowClass}` : '',
        'cursor-pointer group',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {/* Slot label */}
      <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] text-slate-400 whitespace-nowrap pointer-events-none">
        {label}
      </span>

      {isEmpty ? (
        <span className="text-slate-600 text-xs text-center px-1 leading-tight">{label}</span>
      ) : (
        <div className="flex flex-col items-center gap-0.5 px-1 w-full">
          {/* Rarity indicator dot */}
          <div
            className="w-2 h-2 rounded-full mb-0.5"
            style={{ backgroundColor: RARITY_COLORS[item.rarity] }}
          />
          <span
            className={`text-[10px] font-semibold text-center leading-tight line-clamp-2 ${textClass}`}
          >
            {item.name}
          </span>
          {typeof item.stars === 'number' && item.stars > 0 && (
            <StarDisplay stars={item.stars} />
          )}
        </div>
      )}

      {/* Hover tooltip for item stats */}
      {item && (
        <div className="absolute z-20 bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-slate-950 border border-amber-900/50 rounded-lg p-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl">
          <p className={`font-bold mb-1 ${textClass}`}>{item.name}</p>
          <p className="text-slate-400 italic mb-1">{item.rarity}</p>
          {Object.entries(item.base_stats)
            .filter(([, v]) => v !== undefined)
            .map(([k, v]) => (
              <p key={k} className="text-slate-300">
                <span className="text-amber-400 capitalize">{k}</span>: +{v}
              </p>
            ))}
          <p className="text-slate-500 mt-1 text-[10px]">📍 {item.drop_location}</p>
        </div>
      )}
    </button>
  );
}
