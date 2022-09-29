import { VITE_API_KEY, VITE_URL } from '$lib/env';
import { createClient, type ApiError, type PostgrestError } from '@supabase/supabase-js';

const options = {};
// Create a single supabase client for interacting with your database
export const supabase = createClient(
	VITE_URL,
	VITE_API_KEY,
	options,
);

export function warnError(err: PostgrestError | ApiError | null) {
	if (err) {
		console.warn(err);
	}
}
