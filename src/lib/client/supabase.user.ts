import { supabase, warnError } from './supabase';

export async function signup(email: string, password: string, userName: string) {
	const { user, session, error } = await supabase.auth.signUp({
		email,
		password,
	});
	warnError(error);

	const update = await supabase.auth.update({
		data: { userName },
	});

	warnError(update.error);
	return { user, session, data: update.data };
}

export async function updatedisplay(displayName: string) {
	const { error, data } = await supabase.auth.update({
		data: { displayName },
	});
	warnError(error);
	return { data };
}

export async function signin(email: string, password: string) {
	const { user, session, error } = await supabase.auth.signIn({
		email,
		password,
	});
	warnError(error);
	return { user, session };
}

export async function signout() {
	const { error } = await supabase.auth.signOut();
	warnError(error);
	return;
}
