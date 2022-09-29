import type { Product, ProductSearchParams } from "$lib/model/product";
import { v4 } from 'uuid';
import { supabase, warnError } from "./supabase";
import { appendSearchParam, trimProps } from "./supabase.utils";

export class ProductClient {
	static async addProduct(product: Product) {
		if (!product.id) {
			product.id = v4();
			trimProps(product);
			const { data, error } = await supabase.from<Product>('product')
				.insert(product);
	
			warnError(error);
			return data;
		} else {
			trimProps(product);
			return ProductClient.updateProduct(product);
		}
	}
	
	static async updateProduct(product: Product) {
		const { data, error } = await supabase.from<Product>('product')
			.update(product)
			.match({ id: product.id });
		warnError(error);
		return data;
	}

	static async deleteProduct(product: Product) {
		const { data, error } = await supabase.from<Product>('product')
			.delete()
			.match({ id: product.id });
		warnError(error);
		return data;
	}

	static async findProducts(searchOptions: ProductSearchParams) {
		let base = supabase
			.from<Product>('product')
			.select('*');
		base = appendSearchParam(base, searchOptions, 'name');
		base = appendSearchParam(base, searchOptions, 'brand');
		const { data, error } = await base;
		warnError(error);
		return data;
	}
}
