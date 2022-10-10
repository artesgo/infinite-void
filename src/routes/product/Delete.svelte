<script lang="ts">
	import { products } from '$lib/store/products';
	import Button from '$lib/components/cta/Button.svelte';
	import type { Product } from '$lib/model/product';
	import { ProductClient } from '$lib/client/supabase.product';

  export let product: Product;

  function deleteProduct() {
    // TODO: delete from db
    $products = [...$products.filter(_product => _product.id !== product.id)];
    ProductClient.deleteProduct(product);
  }
</script>

<Button on:click={() => deleteProduct()}>Delete Product</Button>