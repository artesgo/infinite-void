import type { Store } from "$lib/model/store";
import { writable } from "svelte/store";

function createStoresStore() {
  const { subscribe, update, set } = writable<Store[]>([]);

  return {
    subscribe,
    update,
    set,
  }
}

export const storesStore = createStoresStore();
