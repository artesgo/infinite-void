import { createSupabaseServerClient } from "@supabase/auth-helpers-sveltekit";
import { PUBLIC_API_KEY, PUBLIC_API_URL } from '$env/static/public';
import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async({ event, resolve }) => {
  event.locals.supabase = createSupabaseServerClient({
    supabaseUrl: PUBLIC_API_URL,
    supabaseKey: PUBLIC_API_KEY,
    event,
  });

  event.locals.getSession = async () => {
    const {
      data: { session },
    } = await event.locals.supabase.auth.getSession()
    return session
  }

  return resolve(event);
}