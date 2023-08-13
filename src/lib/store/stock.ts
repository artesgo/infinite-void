// import { StockClient } from "$lib/client/supabase.stock";
import type { Stock } from "$lib/model/stock";
import { writable } from "svelte/store";

function createStockStore() {
  const { subscribe, update, set } = writable<Stock[]>([]);

  return {
    subscribe,
    update,
    set,
    saveStock: (stock: Stock, storeId: string, productId: string) => update((stockStore) => {
      if (stock && !!stock.updated) {
        // this means the this is an existing entry, use the stockClient to update
        // StockClient.updateStock(stock);
        return [
          ...stockStore.map(stockItem => {
            if (stockItem.productId === stock.productId && stockItem.storeId === stock.storeId) {
              stockItem = {
                ...stockItem,
                ...stock, // overwrite stockItem props;
              }
            }
            return stockItem;
          })
        ]
      } else {
        // this means the stock is new, add new entry
        stock.updated = new Date();
        stock.storeId = storeId;
        stock.productId = productId;
        // StockClient.addStock(stock);
        return [
          ...stockStore,
          stock,
        ]
      }
    })
  }
}

export const stockStore = createStockStore();
