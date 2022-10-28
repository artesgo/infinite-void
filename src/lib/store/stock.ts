import type { Stock } from "$lib/model/stock";
import { writable } from "svelte/store";

function createStockStore() {
  const { subscribe, update, set } = writable<Stock[]>([]);

  return {
    subscribe,
    update,
    set,
  }
}

export const stockStore = createStockStore();
