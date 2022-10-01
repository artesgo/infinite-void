<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import { ProductClient } from "$lib/client/supabase.product";
	import Required from "$lib/components/Required.svelte";
	import SrOnly from "$lib/components/SrOnly.svelte";
  import type { Product } from "$lib/model/product";

  // TODO: 
  // Call API and save item to db
  // Double check item duplicates
  // Show list of existing items that match product name / brand
  let product: Product = {
    name: '',
    brand: '',
    weight: '',
    weight_unit: '',
    sku: '',
  };

  let products$: Promise<Product[]>;
  let searching = false;

  function add() {
    searching = true;
    ProductClient.addProduct(product);
  }

  async function find() {
    products$ = ProductClient.findProducts(product) as Promise<Product[]>;
  }
</script>

<h1>Product List</h1>
<div class='inventori'>
  <section class="what">
    <!-- save to product table -->
    <label>
      Product Name <Required />
      <input type="text" bind:value={product.name} placeholder="enter the product's name" />
    </label>
    <label>
      Brand <Required />
      <input type="text" bind:value={product.brand} placeholder="product brand" />
    </label>
  </section>

  <section class='numbers'>
    <label>
      Weight
      <input type="number" bind:value={product.weight} placeholder="weight" />
    </label>
    <label>
      Weight Unit
      <select
        bind:value={product.weight_unit}
        disabled={!product.weight}
      >
        <option value="lb">pound (lb)</option>
        <option value="g">gram (g)</option>
        <option value="kg">kilogram (kg)</option>
        <option value="oz">ounce (oz)</option>
        <option value="ml">millilitre (ml)</option>
        <option value="L">litre (L)</option>
      </select>
    </label>

    <label>
      SKU <SrOnly>Stock Keeping Unit</SrOnly>
      <input type="text" bind:value={product.sku} placeholder="SKU (Optional)"/>
    </label>

    <!-- Optional -->
    <!-- <label>
      Height (Top to Bottom)
      <input type="text" bind:value={product.height} />
    </label>
    <label>
      Depth (Front to Back)
      <input type="text" bind:value={product.length} />
    </label>
    <label>
      Width (Left to Right)
      <input type="text" bind:value={product.width} />
    </label> -->
  </section>
</div>

<Button on:click={find}>Find</Button>

{#await products$}
  Getting products...
{:then products}
  {#if products}
    {#each products as prod}
      <div>{prod.name}</div>
    {:else}
      <div>No morsels here...</div>
    {/each}
  {/if}
  {#if products && products.length === 0 && searching}
    We couldn't find the product, would you like to add it?
    <Button on:click={add}>Add Product</Button>
  {/if}
{/await}
<style lang="scss">
</style>