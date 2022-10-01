import type { Product } from "$lib/model/product";
import type { Store } from "$lib/model/store";
import type { User } from "@supabase/supabase-js";
import { writable } from "svelte/store";

export interface AppState {
  myStore?: Store;
  store?: Store;
  user?: User;
  product?: Product;
}

// export function createAppStore() {
//   const { subscribe, update } = ;
  // return {
  //   subscribe,
  //   setStore: (store: Store) => update((appState) => ({
  //     ...appState,
  //     myStore: store
  //   })),
  //   viewStore: (store: Store) => update((appState) => ({
  //     ...appState,
  //     viewStore: store
  //   })),
  //   setUser: (user: User) => update((appState) => ({
  //     ...appState,
  //     user
  //   })),
  //   viewProduct: (product: Product) => update((appState) => ({
  //     ...appState,
  //     viewProduct: product
  //   })),
  // }
// }

export const appState = writable<AppState>({});