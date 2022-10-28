import type { Product } from "$lib/model/product";
import { writable } from "svelte/store";

function createProductsStore() {
  const { subscribe, update, set } = writable<Product[]>([]);

  return {
    subscribe,
    update,
    set,
  }
}

export const products = createProductsStore();
