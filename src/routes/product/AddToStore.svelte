<script lang="ts">
	import { appState } from '$lib/store/app';
	import Button from '$lib/components/cta/Button.svelte';
	import type { Product } from '$lib/model/product';
	import { StockClient } from '$lib/client/supabase.stock';
	import type { Stock } from '$lib/model/stock';

  export let product: Product;
  export let aisle: number;
  export let shelf: number;
  export let level: number;
  export let price: number;

  function addToStore() {
    // TODO: delete from db
    let stock: Stock = {
      storeId: $appState.myStore?.id as string,
      productId: product.id,
      aisle,
      shelf,
      level,
      price,
      updated: new Date()
    }
    StockClient.addStock(stock);
  }
</script>
 
<Button on:click={() => addToStore()}>Add To Store</Button>