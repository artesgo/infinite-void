<script lang="ts">
	import { stockStore } from '$lib/store/stock';
	import type { Stock } from '$lib/model/stock';
	import BarCodeScanner from '$lib/components/input/BarCodeScanner.svelte';
  import Input from '$lib/components/input/Input.svelte';
	import Select from '$lib/components/input/Select.svelte';
	import { appState } from '$lib/store/app';
	import { onMount } from 'svelte';
	import AddToStore from '../AddToStore.svelte';
	import Delete from '../Delete.svelte';
	import Save from '../Save.svelte';
	import { weights } from '../_product';

  let aisle: number;
  let shelf: number;
  let level: number;
  let price: number;
  let _stock: Stock | undefined;
  function onErr(err: { detail: string }) {
    console.warn(err);
  }

  onMount(() => {
    // get the product/store match
    _stock = $stockStore.find((s: Stock) => (
      s.productId === $appState.product?.id &&
      s.storeId === $appState.myStore?.id
    ));
    if (_stock) {
      aisle = _stock.aisle;
      shelf = _stock.shelf;
      level = _stock.level;
      price = _stock.price;
    }
  })
</script>

<svelte:head>
  <title>Product and Stock Info</title>
</svelte:head>

{#if $appState.product}
  <h2>Product Info</h2>
  <!-- product identification -->
  <div class='flex'>
    <section class='half'>
      <Input
        bind:value={$appState.product.brand}
        placeholder="enter the product's brand"
        id={'p-brand'}
        label={'Brand'}
      />
    </section>
    <section class='half'>
      <Input
        bind:value={$appState.product.name}
        placeholder="enter the product's name"
        id={'p-name'}
        label={'Name'}
      />
    </section>
  </div>

  <div class='flex'>
    <BarCodeScanner bind:value={$appState.product.sku} on:err={onErr} />
  </div>

  <!-- product weight -->
  <div class='flex'>
    <section class='third'>
      <Input
        bind:value={$appState.product.weight}
        placeholder="enter the product's weight"
        type={'number'}
        id={'p-weight'}
        label={'Weight'}
      />
    </section>
    <section class='third'>
      <Select id={"p-units"} bind:value={$appState.product.weight_unit} disabled={!$appState.product.weight}>
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
    <section class='third'>
      <Input bind:value={$appState.product.sku} 
        placeholder="SKU"
        id={'p-sku'}
        label={'sku'}
      />
    </section>
  </div>

  {@const product = $appState.product}
  <div class='flex justify-between'>
    <Save {product} />
    <Delete {product} />
  </div>

  <hr />

  <!-- If you've selected home store -->
  {#if $appState.myStore}
    <h2>Product Location in {$appState.myStore?.name} @ {$appState.myStore?.address}</h2>
    <div class='flex'>
      <section class='third'>
        <Input
          bind:value={aisle}
          placeholder="Aisle"
          type={'number'}
          id={'p-aisle'}
          label={'Aisle'}
        />
      </section>
      <section class='third'>
        <Input
          bind:value={shelf}
          placeholder="Shelf"
          type={'number'}
          id={'p-shelf'}
          label={'Shelf'}
        />
      </section>
      <section class='third'>
        <Input
          bind:value={level}
          placeholder="Level"
          type={'number'}
          id={'p-level'}
          label={'Level'}
        />
      </section>
    </div>

    <div class='flex'>
      <section class='half'>
        <Input
          bind:value={price}
          placeholder="Price"
          type={'number'}
          id={'p-price'}
          label={'Price'}
        />
      </section>
    </div>

    <div class='flex justify-between'>
      <AddToStore {product} stock={_stock} {aisle} {shelf} {level} {price} />
    </div>
  {/if}
{:else}
  Oh no, what happened here...
{/if}