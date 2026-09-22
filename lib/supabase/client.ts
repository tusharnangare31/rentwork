import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

/**
 * Browser-side Supabase Client.
 * Safe for use in client components with public anon key.
 */
export const createBrowserClient = () => {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn(
      'RentWork: NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY is missing. Configure them in .env.'
    );
  }
  return createClient(supabaseUrl, supabaseAnonKey);
};

export const supabase = createBrowserClient();
