<script lang="ts">
	import { ProductClient } from "$lib/client/supabase.product";
	import Required from "$lib/components/Required.svelte";
	import SrOnly from "$lib/components/SrOnly.svelte";
  import type { Product } from "$lib/model/product";

  // TODO: 
  // Call API and save item to db
  // Double check item duplicates
  // Show list of existing items that match product name / brand
  let product: Product = {
    id: '',
    name: 'hi',
    brand: '',
    weight: '',
    weight_unit: '',
    sku: '',
  };

  let products$: Promise<Product[]>;

  function add() {
    ProductClient.addProduct(product);
  }

  async function find() {
    products$ = ProductClient.findProducts(product) as Promise<Product[]>;
  }
</script>

<div class='inventori'>
  <section class="what">
    <!-- save to product table -->
    <label>
      Product Name <Required />
      <input type="text" bind:value={product.name} placeholder="enter the product's name" />
    </label>
    <label>
      Brand
      <input type="text" bind:value={product.brand} placeholder="product brand" />
    </label>
  </section>

  <section class='numbers'>
    <label>
      Weight
      <input type="text" bind:value={product.weight} placeholder="weight (Optional)" />
    </label>
    <label>
      Weight Unit
      <select bind:value={product.weight_unit}>
        <option value="lb">lb</option>
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

<button on:click={add}>Add</button>
<button on:click={find}>Find</button>

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
{/await}
<style lang="scss">
  label {
    display: flex;
    justify-content: space-between;
  }

  section {
    /* border: 1px solid black; */
  }

  input, select {
    font-family: sans-serif;
    width: 70%;
    margin-bottom: 10px;
  }
</style>