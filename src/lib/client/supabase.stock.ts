import type { Stock, StockSearchParams } from '$lib/model/stock';
import type { SupabaseClient } from '@supabase/supabase-js';
import { warnError } from './supabase';
import { appendSearchParam, trimProps } from './supabase.utils';
import type { Database } from '../../database.types';

export class StockClient {
	// adds an item to the store
	static async addStock(stock: Stock, supabase: SupabaseClient<Database>) {
		trimProps(stock);
		const { data, error } = await supabase.from('stock').insert(stock);
		warnError(error);
		return data;
	}

	// updates an item in the store
	static async updateStock(stock: Stock, supabase: SupabaseClient<Database>) {
		trimProps(stock);
		const { data, error } = await supabase
			.from('stock')
			.update(stock)
			.match({ storeId: stock.storeId, productId: stock.productId });
		warnError(error);
		return data;
	}

	// removes an item from the store
	static async deleteStock(stock: Stock, supabase: SupabaseClient<Database>) {
		const { data, error } = await supabase
			.from('stock')
			.delete()
			.match({ storeId: stock.storeId, productId: stock.productId });
		warnError(error);
		return data;
	}

	// find items in the store
	static async findStock(searchOptions: StockSearchParams, supabase: SupabaseClient<Database>) {
		let base = supabase.from('stock').select('*');
		base = appendSearchParam(base, searchOptions, 'name');
		base = appendSearchParam(base, searchOptions, 'brand');
		const { data, error } = await base;
		warnError(error);
		return data;
	}
}
