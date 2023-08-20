import type { Product, ProductSearchParams } from '$lib/model/product';
import { v4 } from 'uuid';
import { warnError } from './supabase';
import { appendSearchParam, trimProps } from './supabase.utils';
import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '../../database.types';

export class ProductClient {
	static async addProduct(product: Product, supabase: SupabaseClient<Database>) {
		if (product.id) {
			trimProps(product);
			return ProductClient.updateProduct(product, supabase);
		} else {
			product.id = v4();
			trimProps(product);
			const { data, error } = await supabase.from('product').insert(product);

			warnError(error);
			return data;
		}
	}

	static async updateProduct(product: Product, supabase: SupabaseClient<Database>) {
		const { data, error } = await supabase
			.from('product')
			.update(product)
			.match({ id: product.id });
		warnError(error);
		return data;
	}

	static async deleteProduct(product: Product, supabase: SupabaseClient<Database>) {
		const { data, error } = await supabase.from('product').delete().match({ id: product.id });
		warnError(error);
		return data;
	}

	static async findProducts(
		searchOptions: ProductSearchParams,
		supabase: SupabaseClient<Database>
	) {
		let base = supabase.from('product').select('*');
		base = appendSearchParam(base, searchOptions, 'name');
		base = appendSearchParam(base, searchOptions, 'brand');
		const { data, error } = await base;
		warnError(error);
		return data;
	}
}
