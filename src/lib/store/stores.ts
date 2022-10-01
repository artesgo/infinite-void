import type { Store } from "$lib/model/store";
import { writable } from "svelte/store";

// export function createStoreStore() {
//   const { subscribe, update } = 

//   return {
//     subscribe,
//     addStore: (store: Store) => update((stores: Store[]) => {
//       return [...stores, store];
//     }),
//     updateStore: (store: Store) => update((stores: Store[]) => {
//       return [...stores.map(s => {
//         if (store.id === s.id) {
//           s = {...store};
//         }
//         return s;
//       })]
//     }),
//   }
// }

export const stores = writable<Store[]>([]);

