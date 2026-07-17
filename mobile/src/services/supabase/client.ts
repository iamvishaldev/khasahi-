import {createClient, SupabaseClient} from '@supabase/supabase-js';
import {env} from '@/utils/env';

function buildClient(): SupabaseClient | null {
  try {
    return createClient(
      env.SUPABASE_URL || 'https://placeholder.supabase.co',
      env.SUPABASE_ANON_KEY || 'placeholder-anon-key',
      {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: false,
        },
      },
    );
  } catch (error) {
    console.warn('Failed to initialize Supabase client', error);
    return null;
  }
}

export const supabase = buildClient();
