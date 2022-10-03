<script lang="ts">
	import Button from '$lib/components/cta/Button.svelte';
	import { ProductClient } from "$lib/client/supabase.product";
  import type { Product } from "$lib/model/product";
	import Input from '$lib/components/input/Input.svelte';
	import Select from '$lib/components/input/Select.svelte';

  // TODO: 
  // Call API and save item to db
  // Double check item duplicates
  // Show list of existing items that match product name / brand
  let name: '';
  let brand: '';
  let weight: '';
  let weight_unit: '';
  let sku: '';

  let products$: Promise<Product[]>;
  let searching = false;

  function add() {
    searching = true;
    const product = { name, brand, weight, weight_unit, sku };
    ProductClient.addProduct(product);
  }

  async function find() {
    const product = { name, brand, weight, weight_unit, sku };
    products$ = ProductClient.findProducts(product) as Promise<Product[]>;
  }
</script>

<h1>Product List</h1>
<div class='inventori'>
  <section class="what">
    <!-- save to product table -->
    <Input
      bind:value={name}
      placeholder="enter the product's name"
      type={'text'}
      id={'p-name'}
      label={'Product Name'}
      required={true}
    />
    <Input
      bind:value={brand}
      placeholder="enter the product's brand"
      type={'text'}
      id={'p-brand'}
      label={'Product Brand'}
      required={true}
    />
  </section>

  <section class='numbers'>
    <Input
      bind:value={weight}
      placeholder="enter the product's weight"
      type={'number'}
      id={'p-weight'}
      label={'Product Weight'}
    />
    <Select id={"p-units"} bind:value={weight_unit} disabled={!weight}>
      <option value="lb">pound (lb)</option>
      <option value="g">gram (g)</option>
      <option value="kg">kilogram (kg)</option>
      <option value="oz">ounce (oz)</option>
      <option value="ml">millilitre (ml)</option>
      <option value="L">litre (L)</option>
    </Select>
    <Input
      bind:value={sku}
      placeholder="product's SKU (Optional)"
      type={'text'}
      id={'p-sku'}
      label={'Product SKU'}
    />
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
