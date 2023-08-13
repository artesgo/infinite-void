import { writable } from "svelte/store";

function createStoresStore() {
  const { subscribe, update, set } = writable([]);

  return {
    subscribe,
    update,
    set,
  }
}

export const storesStore = createStoresStore();
