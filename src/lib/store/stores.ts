import type { Store } from "$lib/model/store";
import { writable } from "svelte/store";

export const stores = writable<Store[]>([]);

