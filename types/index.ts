export type Rarity =
  | 'Normal'
  | 'Magic'
  | 'Rare'
  | 'Epic'
  | 'Legendary'
  | 'Angelic'
  | 'Satanic';

export type GearSlotType =
  | 'weapon'
  | 'offhand'
  | 'head'
  | 'armor'
  | 'belt'
  | 'boots'
  | 'ring1'
  | 'ring2'
  | 'amulet';

export interface ItemStats {
  damage?: number;
  armor?: number;
  hp?: number;
  mp?: number;
  str?: number;
  dex?: number;
  int?: number;
  crit?: number;
  [key: string]: number | undefined;
}

export interface Item {
  id: number;
  name: string;
  type: GearSlotType;
  rarity: Rarity;
  base_stats: ItemStats;
  drop_location: string;
}

export interface GearEntry {
  id: number;
  stars?: number;
}

export type Gear = Partial<Record<GearSlotType, GearEntry>>;

export interface Build {
  id: string;
  title: string;
  description: string | null;
  hero_class: string;
  gear: Gear;
  created_at: string;
  updated_at: string;
}

export interface BuildWithItems extends Build {
  resolvedGear: Partial<Record<GearSlotType, Item & { stars?: number }>>;
}
