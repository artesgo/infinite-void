import type { ThemeOptions } from '$lib/models/theme';
import type { User } from '@supabase/supabase-js';
import type { Pattern, PatternColour, PatternSize } from '../models/pattern';

export interface UserState {
	id: string;
	subscribed: boolean;
	user: User | undefined,
	email: string;
	checkEmail: boolean;
	showNotes: boolean;
	pattern: Pattern;
	patternSize: PatternSize;
	patternColour: PatternColour;
	noteColour: string | undefined;
	tutorial: boolean;
	theme: ThemeOptions;
	mobileControls: boolean,
	letterNotation: boolean,
}

export const initialState: UserState = {
	id: '',
	subscribed: false,
	email: '',
	user: undefined,
	checkEmail: false,
	showNotes: false,
	pattern: 'dots',
	patternSize: '-sm',
	patternColour: 'blue',
	noteColour: '#F35100',
	mobileControls: false,
	tutorial: true,
	theme: 'dark',
	letterNotation: true,
};
