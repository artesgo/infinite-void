
import type { LayoutServerLoad } from './$types';

/**
 * Global Layout Server Actions
 * This can be accessed from all pages
 */
export const load = (async ({ locals: { getSession }}) => {
  const session = await getSession();
  return { session };
}) satisfies LayoutServerLoad;
