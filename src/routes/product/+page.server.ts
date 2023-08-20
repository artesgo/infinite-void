// import { ProductClient } from '$lib/client/supabase.product';
import type { Product } from '$lib/model/product';
import type { Stock } from '$lib/model/stock';
import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import { ProductClient } from '$lib/client/supabase.product';

let cachedProducts: Product[] = [];

function getProduct(data: FormData): Product {
  return {
    name: data.get('name') ? data.get('name')?.toString() : '',
    brand: data.get('brand') ? data.get('brand')?.toString() : '',
    sku: data.get('sku') ? data.get('sku')?.toString() : '',
    weight: data.get('weight') ? data.get('weight')?.toString() : '',
    weight_unit: data.get('weight_unit') ? data.get('weight_unit')?.toString() : '',
  }
}

function getStock(data: FormData): Stock {
  return {
    storeId: data.get('storeId') ? data.get('storeId')?.toString() : '',
    productId: data.get('productId') ? data.get('productId')?.toString() : '',
    aisle: data.get('aisle') ? Number.parseInt(data.get('aisle') as string) : 0,
    level: data.get('level') ? Number.parseInt(data.get('level') as string) : 0,
    shelf: data.get('shelf') ? Number.parseInt(data.get('shelf') as string) : 0,
    price: data.get('price') ? Number.parseFloat(data.get('price') as string) : 0,
  }
}

export const actions: Actions = {
  find: async ({ request, locals: { supabase } }) => {
    const data = await request.formData();
    const product = getProduct(data);
    
    try {
      const products = ProductClient.findProducts({
        name: product.name || '',
        brand: product.brand || '',
        sku: product.sku || '',
      }, supabase)
      const response = await products;
      if (response) {
        cachedProducts = response;
      }
      return { success: true, products: response, ...product };
    } catch (error) {
      return { success: false, products: cachedProducts, ...product };
    }
  },
  add: async ({ request, locals: { supabase } }) => {
    const data = await request.formData();
    
    const products = getProduct(data);

    try {
      const product = getProduct(data);
      if (product.name && product.name.length < 3) {
        return fail(400, {
          error: true,
          message: 'Name must be at least two characters.',
          ...product
        })
      }
      ProductClient.addProduct(product, supabase);
      return { success: true, products: [...cachedProducts, product], ...products };
    } catch (error) {
      return { success: false, products: cachedProducts, ...products };
    }
  },
  saveStockProduct: async ({ request, locals: { supabase } }) => {
    const data = await request.formData();
    
    const product = getProduct(data);
    const stock = getStock(data);

    try {
      const product = getProduct(data);
      if (product.name && product.name.length < 3) {
        return fail(400, {
          error: true,
          message: 'Name must be at least two characters.',
          ...product
        })
      }
      ProductClient.addProduct(product, supabase);
      return { success: true, products: [...cachedProducts, product], ...product, ...stock };
    } catch (error) {
      return { success: false, products: cachedProducts, ...product, ...stock };
    }
  }
}