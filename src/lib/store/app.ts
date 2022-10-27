import type { Product } from "$lib/model/product";
import type { Store } from "$lib/model/store";
import type { Stock } from "$lib/model/stock";
import type { User } from "@supabase/supabase-js";
import { writable } from "svelte/store";

export interface AppState {
  myStore?: Store;
  user?: User;
  stock?: Stock;
  product?: Product;
}

export const appState = writable<AppState>({});