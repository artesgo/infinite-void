<script lang="ts">
	import { appState } from '$lib/store/app';
	import { onMount } from 'svelte';
	import { ProductClient } from "$lib/client/supabase.product";
	import { products } from '$lib/store/products';
	import Button from '$lib/components/cta/Button.svelte';
	import Input from '$lib/components/input/Input.svelte';
	import Link from '$lib/components/nav/Link.svelte';
	import Select from '$lib/components/input/Select.svelte';
	import Table from '$lib/components/layout/Table.svelte';
  import {Html5QrcodeScanner} from "html5-qrcode"
  import type { Product } from "$lib/model/product";

  // TODO: 
  // Call API and save item to db
  // Double check item duplicates
  // Show list of existing items that match product name / brand
  let brand: '';
  let name: '';
  let searching = false;
  let sku: '';
  let weight_unit: '';
  let weight: '';
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
    console.log(response);
    
    $products = [...response];
  }

  function viewProduct(product: Product) {
    $appState.product = product;
  }

  function saveProduct(product: Product) {
    ProductClient.updateProduct(product);
  }

  enum weights {
    "g" = "gram (g)",
    "ml" = "millilitre (ml)",
    "u" = "Units (Pieces, Tablets, etc...)",
    "ea" = "Each",
    "lb" = "pound (lb)",
    "oz" = "ounce (oz)",
    "L" = "litre (L)",
    "kg" = "kilogram (kg)",
  }

  //#region barcode reader
  function onScanSuccess(decodedText: string, decodedResult: any) {
    // handle the scanned code as you like, for example:
    console.log(`Code matched = ${decodedText}`, decodedResult);
    scannedText = decodedText;
  }
  let scannedText: string;

  function onScanFailure(error: any) {
    // handle scan failure, usually better to ignore and keep scanning.
    // for example:
    console.warn(`Code scan error = ${error}`);
  }

  let html5QrcodeScanner;
  onMount(() => {
    html5QrcodeScanner = new Html5QrcodeScanner(
      "reader",
      { fps: 30, qrbox: {width: 250, height: 250}, supportedScanTypes: [0] },
      false
    );
    html5QrcodeScanner.render(onScanSuccess, onScanFailure);
  });
  //#endregion
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
  </section>
  <section class='numbers'>
    <Input
      bind:value={brand}
      placeholder="enter the product's brand"
      type={'text'}
      id={'p-brand'}
      label={'Product Brand'}
      required={true}
    />
  </section>
</div>
<div class='inventori'>
  <section class="what">
    <Input
      bind:value={weight}
      placeholder="enter the product's weight"
      type={'number'}
      id={'p-weight'}
      label={'Product Weight'}
    />
  </section>

  <section class='numbers'>
    <Select id={"p-units"} bind:value={weight_unit} disabled={!weight}>
      <option value="g">{weights['g']}</option>
      <option value="ml">{weights['ml']}</option>
      <option value="u">{weights['u']}</option>
      <option value="ea">{weights['ea']}</option>
      <option value="lb">{weights['lb']}</option>
      <option value="oz">{weights['oz']}</option>
      <option value="L">{weights['L']}</option>
      <option value="kg">{weights['kg']}</option>
    </Select>
  </section>
</div>
<div class='inventori'>
  <section class="what">
    <Input
      bind:value={sku}
      placeholder="product's SKU (Optional)"
      type={'text'}
      id={'p-sku'}
      label={'Product SKU'}
    />
  </section>

  <section class='numbers'>
    <div id="reader"></div>

    {scannedText || ''}
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
        <Link href={'/product/' + p.id} on:click={() => viewProduct(p)}>{p.weight_unit || ''}</Link>
      </td>
      <td class="flex justify-center">
        <Button on:click={() => saveProduct(p)}>Save</Button>
      </td>
    </tr>
  {/each}
</Table>

<style>
  .inventori {
    display: flex;
    flex-wrap: wrap;
  }

  section {
    width: 50%;
    min-width: 300px;
    padding: 10px;
  }
</style>