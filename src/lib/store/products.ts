import type { Product } from "$lib/model/product";
import { writable } from "svelte/store";

// export function createProductStore() {
//   const { subscribe, update } = writable<Product[]>([]);

//   return {
//     subscribe,
//     addProduct: (Product: Product) => update((Products: Product[]) => {
//       return [...Products, Product];
//     }),
//   }
// }

export const products = writable<Product[]>([]);
