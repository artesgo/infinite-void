<script lang="ts">
	import Button from '$lib/components/cta/Button.svelte';
	import { productsStore } from '$lib/store/products';
	import type { Product } from '$lib/model/product';

  export let product: Product;

  function deleteProduct() {
    // TODO: delete from db
    $productsStore = [...$productsStore.filter(_product => _product.id !== product.id)];
    // ProductClient.deleteProduct(product);
  }
</script>

<Button on:click={() => deleteProduct()}>Delete Product</Button>