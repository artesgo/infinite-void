<script lang="ts">
	import Button from "$lib/components/cta/Button.svelte";
	import type { Product } from "$lib/model/product";
  export let product: Product;
  function saveProduct() {
    // ProductClient.updateProduct(product);
  }
</script>

<Button on:click={saveProduct}>Save Product</Button>