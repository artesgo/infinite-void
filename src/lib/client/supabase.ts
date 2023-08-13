import { AuthApiError, AuthError, type PostgrestError } from '@supabase/supabase-js';
import { fail } from '@sveltejs/kit';

export function warnError(err: PostgrestError | AuthError | AuthApiError | null) {
	if (err) {
		console.warn(err);
		if (err instanceof AuthApiError && err.status === 400) {
			return fail(400, { error: 'Invalid Email or Password' })
		}
		return fail(500, { error: 'Server Error, please try a beat later' });
	}
}
