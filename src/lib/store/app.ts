import type { Store } from "$lib/model/store";
import type { Stock } from "$lib/model/stock";
import type { User } from "@supabase/supabase-js";
import { writable } from "svelte/store";

export interface AppState {
  myStore?: Store;
  user?: User;
  stock?: Stock;
}

function createState() {
  const { subscribe, update, set } = writable<AppState>({});

  return {
    subscribe,
    update,
    set,
    setMyStore: (myStore: Store) => update((state) => {
      localStorage.setItem('store-id', myStore.id || '');
      localStorage.setItem('store-name', myStore.name || '');
      localStorage.setItem('store-category', myStore.category || '');
      localStorage.setItem('store-address', myStore.address || '');
      return {
        ...state,
        myStore,
      };
    }),
  }
}

export const appState = createState();