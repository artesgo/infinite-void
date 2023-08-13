import type { Session, User } from '@supabase/supabase-js';
import { writable } from 'svelte/store';
import { initialState } from './user.store';

function saveSessionToStorage(session: Session) {
	localStorage.setItem('access_token', session.access_token);
	localStorage.setItem('refresh_token', session.refresh_token);
	localStorage.setItem('expires', session.expires_in.toString());
	localStorage.setItem('session', JSON.stringify(session));
}

function clearSessionFromStorage() {
	localStorage.removeItem('access_token');
	localStorage.removeItem('refresh_token');
	localStorage.removeItem('expires');
	localStorage.removeItem('session');
}

function createUserFacade() {
	const { subscribe, update, set } = writable(initialState);
	return {
		subscribe,
		update,
		set,
		updateUser: (user: User) => {
			update((state) => ({
				...state,
				user,
			}));
		},
		loggedout: async () => {
			clearSessionFromStorage();
			update((state) => ({
				...state,
				user: undefined,
			}));
		},
		loggedIn: async (session: Session) => {
			saveSessionToStorage(session);
			update((state) => ({
				...state,
				user: session.user,
			}));
		},
	}
}

export const userFacade = createUserFacade();
