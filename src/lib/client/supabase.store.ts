import type { Store, StoreSearchParams } from '$lib/model/store';
import { v4 } from 'uuid';
import { warnError } from './supabase';
import { appendSearchParam, trimProps } from './supabase.utils';
import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '../../database.types';

export class StoreClient {
	static async addStore(store: Store, supabase: SupabaseClient<Database>) {
		if (!store.id) {
			store.id = v4();
			trimProps(store);
			const { data, error } = await supabase.from('stores').insert(store);

			warnError(error);
			return data;
		} else {
			trimProps(store);
			return StoreClient.updateStore(store, supabase);
		}
	}

	static async updateStore(store: Store, supabase: SupabaseClient<Database>) {
		const { data, error } = await supabase.from('stores').update(store).match({ id: store.id });
		warnError(error);
		return data;
	}

	static async deleteStore(store: Store, supabase: SupabaseClient<Database>) {
		const { data, error } = await supabase.from('stores').delete().match({ id: store.id });
		warnError(error);
		return data;
	}

	static async findStores(searchOptions: StoreSearchParams, supabase: SupabaseClient<Database>) {
		let base = supabase.from('stores').select('*');
		base = appendSearchParam(base, searchOptions, 'name');
		base = appendSearchParam(base, searchOptions, 'city');
		base = appendSearchParam(base, searchOptions, 'address');
		const { data, error } = await base;
		warnError(error);
		return data;
	}
}
