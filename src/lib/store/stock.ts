import type { Stock } from "$lib/model/stock";
import { writable } from "svelte/store";

export const products = writable<Stock[]>([]);
