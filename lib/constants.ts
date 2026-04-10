import { Rarity, GearSlotType } from '@/types';

export const HERO_CLASSES = [
  'White Mage',
  'Prophet',
  'Jötunn',
  'Pyromancer',
  'Necromancer',
  'Barbarian',
  'Witch Hunter',
  'Marksman',
  'Pirate',
  'Samurai',
  'Druid',
  'Shaman',
] as const;

export type HeroClass = (typeof HERO_CLASSES)[number];

export const RARITY_COLORS: Record<Rarity, string> = {
  Normal: '#ffffff',
  Magic: '#4a9eff',
  Rare: '#ffe700',
  Epic: '#a335ee',
  Legendary: '#ff8000',
  Angelic: '#00ffff',
  Satanic: '#ff0000',
};

export const RARITY_GLOW: Record<Rarity, string> = {
  Normal: 'shadow-white/30',
  Magic: 'shadow-blue-400/60',
  Rare: 'shadow-yellow-400/60',
  Epic: 'shadow-purple-500/60',
  Legendary: 'shadow-orange-500/60',
  Angelic: 'shadow-cyan-400/80',
  Satanic: 'shadow-red-500/80',
};

export const RARITY_BORDER: Record<Rarity, string> = {
  Normal: 'border-white/30',
  Magic: 'border-blue-400/60',
  Rare: 'border-yellow-400/60',
  Epic: 'border-purple-500/60',
  Legendary: 'border-orange-500/60',
  Angelic: 'border-cyan-400/80',
  Satanic: 'border-red-500/80',
};

export const RARITY_TEXT: Record<Rarity, string> = {
  Normal: 'text-white',
  Magic: 'text-blue-400',
  Rare: 'text-yellow-400',
  Epic: 'text-purple-400',
  Legendary: 'text-orange-400',
  Angelic: 'text-cyan-400',
  Satanic: 'text-red-500',
};

export const GEAR_SLOTS: { key: GearSlotType; label: string }[] = [
  { key: 'weapon', label: 'Weapon' },
  { key: 'offhand', label: 'Off-hand' },
  { key: 'head', label: 'Head' },
  { key: 'armor', label: 'Armor' },
  { key: 'belt', label: 'Belt' },
  { key: 'boots', label: 'Boots' },
  { key: 'ring1', label: 'Ring 1' },
  { key: 'ring2', label: 'Ring 2' },
  { key: 'amulet', label: 'Amulet' },
];

export const CLASS_ICONS: Partial<Record<HeroClass, string>> = {
  'White Mage': '✦',
  Prophet: '☩',
  Jötunn: '❄',
  Pyromancer: '🔥',
  Necromancer: '💀',
  Barbarian: '⚔',
  'Witch Hunter': '🗡',
  Marksman: '🏹',
  Pirate: '☠',
  Samurai: '⛩',
  Druid: '🌿',
  Shaman: '⚡',
};
