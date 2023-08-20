<script lang="ts">
	import { stockStore } from '$lib/store/stock';
	import { appState } from '$lib/store/app';
	// import { StockClient } from '$lib/client/supabase.stock';
	import Button from '$lib/components/cta/Button.svelte';
	import type { Product } from '$lib/model/product';
	import type { Stock } from '$lib/model/stock';

  export let aisle: number;
  export let level: number;
  export let price: number;
  export let product: Product;
  export let shelf: number;
  export let stock: Stock | undefined;

  function addToStore() {
    let _stock: Stock = {
      storeId: $appState.myStore?.id as string,
      productId: product.id,
      aisle,
      shelf,
      level,
      price,
      updated: new Date()
    }
    if (!stock) {
      // StockClient.addStock(_stock);
    } else {
      // StockClient.updateStock(_stock);
      $stockStore = [...$stockStore.map(s => {
        if (s.productId === _stock.productId) {
          s.aisle = aisle;
          s.level = level;
          s.price = price;
          s.shelf = shelf;
        }
        return s;
      })]
    }
  }
</script>
 
<Button on:click={() => addToStore()}>
  {#if stock}
    Update Stock Information
  {:else}
    Add To Store
  {/if}
</Button>