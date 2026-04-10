import { createClient } from '@supabase/supabase-js';
import { Build, Item } from '@/types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      builds: {
        Row: Build;
        Insert: Omit<Build, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<Build, 'id' | 'created_at' | 'updated_at'>>;
      };
      items: {
        Row: Item;
        Insert: Omit<Item, 'id'>;
        Update: Partial<Omit<Item, 'id'>>;
      };
    };
  };
};
