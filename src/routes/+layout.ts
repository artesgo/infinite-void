import { PUBLIC_API_URL, PUBLIC_API_KEY } from '$env/static/public'
import { createSupabaseLoadClient } from '@supabase/auth-helpers-sveltekit'
import type { Database } from '../database.types'

export const load = async ({ fetch, data, depends }) => {
  depends('supabase:auth');

  const supabase = createSupabaseLoadClient<Database>({
    supabaseUrl: PUBLIC_API_URL,
    supabaseKey: PUBLIC_API_KEY,
    event: { fetch },
    serverSession: data.session,
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return { supabase, session };
}