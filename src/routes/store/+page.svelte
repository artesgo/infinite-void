<script lang="ts">
	import { appState } from "$lib/store/app";
	import { onMount } from "svelte";
	import { stockStore } from '$lib/store/stock';
	import { StockClient } from '$lib/client/supabase.stock';
	import { StoreClient } from "$lib/client/supabase.store";
	import { stores } from '$lib/store/stores';
	import Button from "$lib/components/cta/Button.svelte";
	import Input from '$lib/components/input/Input.svelte';
	import Link from "$lib/components/nav/Link.svelte";
	import Table from '$lib/components/layout/Table.svelte';
	import type { Store } from "$lib/model/store";

  // TODO: 
  // Call API and save item to db
  // Double check item duplicates
  // Show list of existing items that match product name / brand
  let store: Store = {
    id: '',
    name: '',
    address: '',
    city: '',
  };

  let searching = false;

  function add() {
    StoreClient.addStore(store);
  }

  function selectStore(store: Store) {
    $appState.myStore = store;
    if (store.id) {
      localStorage.setItem('storeId', store.id );
      localStorage.setItem('storeName', store.name );
      localStorage.setItem('storeAddress', store.address );
      localStorage.setItem('storeCity', store.city );
    }
  }

  function viewStore(store: Store) {
    $appState.store = store;
  }

  async function find() {
    searching = true;
    let store$ = StoreClient.findStores(store) as Promise<Store[]>;
    let response = await store$;
    $stores = [...response];
  }

  async function getStockInfo() {
    if (!$appState.myStore) {
      return;
    }
    let stock$ = StockClient.findStock({
      storeId: $appState.myStore.id,
    });
    let response = await stock$;
    if (response?.length) {
      $stockStore = [...response];
    }
  }

  $: hasRequired = store.name && store.address && store.city;
  let headers = [
    'Name',
    'Address',
    'City',
    'Select',
  ]

  onMount(() => {
    getStockInfo();
  });
</script>

<style lang="scss">
  @use './store';
</style>

<svelte:head>
  <title>Store Info</title>
</svelte:head>

<h1>Store Selection</h1>
<div class='inventori'>
  <section class="what">
    <Input id={'s-name'} label={'store name'} type={'text'} required={true} placeholder={'Store Name'} bind:value={store.name} />
    <Input id={'s-cate'} label={'category'} type={'text'} required={true} placeholder={'Category'} bind:value={store.category} />
  </section>
  <section class="where">
    <Input id={'s-addy'} label={'address'} type={'text'} required={true} placeholder={'Address'} bind:value={store.address} />
    <Input id={'s-city'} label={'city'} type={'text'} required={true} placeholder={'City'} bind:value={store.city} />
  </section>
</div>

<div class="pl-1 pr-1">
  <Button on:click={find}>Find</Button>
</div>

{#if $stores && $stores.length > 0}
  <Table {headers} caption={'We found these stores...'}>
    {#each $stores as s (s.id)}
      <tr>
        <td><Link href={'/store/' + s.id} on:click={() => viewStore(s)}>{s.name}</Link></td>
        <td><Link href={'/store/' + s.id} on:click={() => viewStore(s)}>{s.address}</Link></td>
        <td><Link href={'/store/' + s.id} on:click={() => viewStore(s)}>{s.city}</Link></td>
        <td>
          <div class='flex justify-center'>
            {#if $appState.myStore && $appState.myStore.id === s.id}
              Selected
            {:else}
              <Button on:click={() => selectStore(s)}>Select</Button>
            {/if}
          </div>
        </td>
      </tr>
    {/each}
  </Table>
{/if}

{#if $stores && $stores.length === 0 && searching}
  We couldn't find the store, would you like to add it?
  <Button on:click={add}>Add Store</Button>
{/if}