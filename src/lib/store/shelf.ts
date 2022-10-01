import type { Shelf } from "$lib/model/shelf";
import { writable } from "svelte/store";

export function createShelfStore() {
  const { subscribe, update } = writable<Shelf[]>([]);

  return {
    subscribe,
    addShelf: (Shelf: Shelf) => update((Shelfs: Shelf[]) => {
      return [...Shelfs, Shelf];
    }),
  }
}