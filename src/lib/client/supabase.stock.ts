import type { Stock, StockSearchParams } from "$lib/model/stock";
import { supabase, warnError } from "./supabase";
import { appendSearchParam, trimProps } from "./supabase.utils";

export class StockClient {

	// adds an item to the store
	static async addStock(stock: Stock) {
		trimProps(stock);
		const { data, error } = await supabase.from<Stock>('stock')
			.insert(stock);
		warnError(error);
		return data;
	}
	
	// updates an item in the store
	static async updateStock(stock: Stock) {
		trimProps(stock);
		const { data, error } = await supabase.from<Stock>('stock')
			.update(stock)
			.match({ storeId: stock.storeId, productId: stock.productId });
		warnError(error);
		return data;
	}

	// removes an item from the store
	static async deleteStock(stock: Stock) {
		const { data, error } = await supabase.from<Stock>('stock')
			.delete()
			.match({ storeId: stock.storeId, productId: stock.productId });
		warnError(error);
		return data;
	}

	// find items in the store
	static async findStock(searchOptions: StockSearchParams) {
		let base = supabase
			.from<Stock>('stock')
			.select('*');
		base = appendSearchParam(base, searchOptions, 'name');
		base = appendSearchParam(base, searchOptions, 'brand');
		const { data, error } = await base;
		warnError(error);
		return data;
	}
}
