import { StoreClient } from '$lib/client/supabase.store';
import type { Store } from '$lib/model/store';
import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

function getStore(data: FormData): Store {
	return {
		name: data.get('name') ? data.get('name')?.toString() : '',
		address: data.get('address') ? data.get('address')?.toString() : '',
		city: data.get('city') ? data.get('city')?.toString() : '',
		category: data.get('category') ? data.get('category')?.toString() : ''
	};
}

export const actions: Actions = {
	find: async ({ request, locals: { supabase } }) => {
		const data = await request.formData();
		const store = getStore(data);
		try {
			const stores = StoreClient.findStores(
				{
					name: store.name,
					address: store.address,
					category: store.category,
					city: store.city
				},
				supabase
			);
			const response = await stores;
			return { success: true, stores: response, ...store };
		} catch (error) {
			return { success: false, stores: [], ...store };
		}
	},
	add: async ({ request, locals: { supabase } }) => {
		const data = await request.formData();
		const store = getStore(data);
		try {
			if (!store.name) fail(400, { error: 'Store name is mandatory' });
			if (!store.address) fail(400, { error: 'Store address is mandatory' });
			if (!store.city) fail(400, { error: 'Store city is mandatory' });
	
			if (store.name && store.name.length < 4) fail(400, { error: 'Store name is too short' });
			if (store.address && store.address.length < 6)
				fail(400, { error: 'Store address is too short' });
			if (store.city && store.city.length < 4) fail(400, { error: 'Store city is too short' });
			
			StoreClient.addStore(store, supabase);
			return { success: true, stores: [store], ...store };
		} catch (error) {
			return { success: false, stores: [], ...store };
		}
	}
};
