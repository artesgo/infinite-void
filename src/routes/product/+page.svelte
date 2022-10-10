<script lang="ts">
	import { appState } from '$lib/store/app';
	import { ProductClient } from "$lib/client/supabase.product";
	import { products } from '$lib/store/products';
	import Button from '$lib/components/cta/Button.svelte';
	import Input from '$lib/components/input/Input.svelte';
	import Link from '$lib/components/nav/Link.svelte';
	import Select from '$lib/components/input/Select.svelte';
	import Table from '$lib/components/layout/Table.svelte';
  import type { Product } from "$lib/model/product";
	import BarCodeScanner from '$lib/components/input/BarCodeScanner.svelte';
	import { weights } from './_product';

  // TODO: 
  // Call API and save item to db
  // Double check item duplicates
  // Show list of existing items that match product name / brand
  let brand = '';
  let name = '';
  let searching = false;
  let sku = '';
  let weight_unit = '';
  let weight = '';
  let headers = [
    'Name',
    'Brand',
    'Weight',
    'Unit',
    'Action'
  ];

  function add() {
    const product = { name, brand, weight, weight_unit, sku };
    ProductClient.addProduct(product);
  }

  async function find() {
    searching = true;
    const product = { name, brand, weight, weight_unit, sku };
    let products$ = ProductClient.findProducts(product) as Promise<Product[]>;
    let response = await products$;
    $products = [...response];
  }

  function viewProduct(product: Product) {
    $appState.product = product;
  }

  function onErr(err: { detail: string }) {
    console.warn(err);
  }
</script>

<svelte:head>
  <title>Product Info</title>
</svelte:head>

<h1>Product List</h1>
<div class='flex wrap'>
  <section class="two-third">
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
  <section class="third">
    <Input
      bind:value={weight}
      placeholder="enter the product's weight"
      type={'number'}
      id={'p-weight'}
      label={'Weight'}
    />
    <Select id={"p-units"} bind:value={weight_unit} disabled={!weight}>
      <option value="g">{weights.get('g')}</option>
      <option value="ml">{weights.get('ml')}</option>
      <option value="u">{weights.get('u')}</option>
      <option value="ea">{weights.get('ea')}</option>
      <option value="lb">{weights.get('lb')}</option>
      <option value="oz">{weights.get('oz')}</option>
      <option value="L">{weights.get('L')}</option>
      <option value="kg">{weights.get('kg')}</option>
    </Select>
  </section>
</div>
<div class='flex wrap'>
  <section class="half">
    <Input
      bind:value={sku}
      placeholder="product's SKU (Optional)"
      type={'text'}
      id={'p-sku'}
      label={'Product SKU'}
    />
  </section>
</div>
<div class='flex'>
  <section>
    <BarCodeScanner bind:value={sku} on:err={onErr} />
  </section>
</div>

<Button on:click={find}>Find</Button>
<Button on:click={add}>Add Product</Button>

<Table {headers} caption={'We found these Products...'}>
  {#each $products as p (p.id)}
    <tr>
      <td>
        <Link href={'/product/' + p.id} on:click={() => viewProduct(p)}>{p.name}</Link>
      </td>
      <td>
        <Link href={'/product/' + p.id} on:click={() => viewProduct(p)}>{p.brand || ''}</Link>
      </td>
      <td>
        <Link href={'/product/' + p.id} on:click={() => viewProduct(p)}>{p.weight || ''}</Link>
      </td>
      <td>
        <Link href={'/product/' + p.id} on:click={() => viewProduct(p)}>{weights.get(p.weight_unit || '')}</Link>
      </td>
      <td class="flex justify-center">
      </td>
    </tr>
  {/each}
</Table>