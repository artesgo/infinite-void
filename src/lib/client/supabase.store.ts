
import type { Store, StoreSearchParams } from "$lib/model/store";
import { v4 } from 'uuid';
import { supabase, warnError } from "./supabase";
import { appendSearchParam, trimProps } from "./supabase.utils";

export class StoreClient {
	static async addStore(store: Store) {
		if (!store.id) {
			store.id = v4();
			trimProps(store);
			const { data, error } = await supabase.from<Store>('stores')
				.insert(store);
	
			warnError(error);
			return data;
		} else {
			trimProps(store);
			return StoreClient.updateStore(store);
		}
	}
	
	static async updateStore(store: Store) {
		const { data, error } = await supabase.from<Store>('stores')
			.update(store)
			.match({ id: store.id });
		warnError(error);
		return data;
	}

	static async deleteStore(store: Store) {
		const { data, error } = await supabase.from<Store>('stores')
			.delete()
			.match({ id: store.id });
		warnError(error);
		return data;
	}

	static async findStores(searchOptions: StoreSearchParams) {
		let base = supabase
			.from<Store>('stores')
			.select('*');
		base = appendSearchParam(base, searchOptions, 'name');
		base = appendSearchParam(base, searchOptions, 'city');
		base = appendSearchParam(base, searchOptions, 'address');
		const { data, error } = await base;
		warnError(error);
		return data;
	}
}
