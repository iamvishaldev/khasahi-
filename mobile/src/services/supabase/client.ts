import {createClient, SupabaseClient} from '@supabase/supabase-js';
import {env} from '@/utils/env';
import {storage} from '@/services/storage/mmkv';

const supabaseStorage = {
  getItem: (key: string) => storage.getString(key) ?? null,
  setItem: (key: string, value: string) => storage.set(key, value),
  removeItem: (key: string) => storage.delete(key),
};

function buildClient(): SupabaseClient | null {
  if (!env.SUPABASE_URL || !env.SUPABASE_ANON_KEY) {
    console.warn('Supabase is not configured. Add SUPABASE_URL and SUPABASE_ANON_KEY to .env.');
    return null;
  }

  try {
    return createClient(
      env.SUPABASE_URL,
      env.SUPABASE_ANON_KEY,
      {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: false,
          storage: supabaseStorage,
        },
      },
    );
  } catch (error) {
    console.warn('Failed to initialize Supabase client', error);
    return null;
  }
}

export const supabase = buildClient();
