<script lang="ts">
	import { stores } from '$lib/store/stores';
	import type { Store } from "$lib/model/store";
	import { StoreClient } from "$lib/client/supabase.store";
	import Button from "$lib/components/Button.svelte";
	import Required from "$lib/components/Required.svelte";
	import Link from "$lib/components/Link.svelte";
	import { appState } from "$lib/store/app";
	import Delete from "./delete.svelte";

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

  let store$: Promise<Store[]>;
  let searching = false;

  function add() {
    StoreClient.addStore(store);
  }

  function selectStore(store: Store) {
    $appState.myStore = store;
  }

  function viewStore(store: Store) {
    $appState.store = store;
  }

  async function find() {
    searching = true;
    store$ = StoreClient.findStores(store) as Promise<Store[]>;
    let response = await store$;
    $stores = [...response];
  }

  $: hasRequired = store.name && store.address && store.city;
</script>

<div class='inventori'>
  <h1>Store Selection</h1>
  <section class="what">
    <!-- save to product table -->
    <label>
      Store Name <Required />
      <input type="text" required
        bind:value={store.name} placeholder="enter the store's name" />
    </label>
    <label>
      Address <Required />
      <input type="text" required
        bind:value={store.address} placeholder="address" />
    </label>
    <label>
      City <Required />
      <input type="text" required
        bind:value={store.city} placeholder="city" />
    </label>
    <label>
      Category
      <input type="text" required
        bind:value={store.category} placeholder="category" />
    </label>
  </section>
</div>

<div>
  <Button on:click={find}>Find</Button>
</div>

{#if $stores && $stores.length > 0}
  <table>
    <caption>We found these stores...</caption>
    <thead>
      <tr>
        <th>Name</th>
        <th>Address</th>
        <th>City</th>
        <th>View</th>
        <th>Select</th>
      </tr>
    </thead>
    <tbody>
      {#each $stores as s (s.id)}
      <tr>
        <td>{s.name}</td>
        <td>{s.address}</td>
        <td>{s.city}</td>
        <td class="action">
          <Link href={'/store/' + s.id} on:click={() => viewStore(s)}>View and Edit</Link>
        </td>
        <td>
          <div class='action'>
            {#if $appState.myStore && $appState.myStore.id === s.id}
              Selected
            {:else}
              <Button on:click={() => selectStore(s)}>Select</Button>
            {/if}
          </div>
        </td>
      </tr>
      {/each}
    </tbody>
  </table>
{/if}


{#if $stores && $stores.length === 0 && searching}
  We couldn't find the store, would you like to add it?
  <Button on:click={add}>Add Store</Button>
{/if}
<style lang="scss">
  label {
    display: flex;
    justify-content: space-between;
  }

  table {
    width: 100%;
  }

  .action {
    display: flex;
    justify-content: center;
  }
</style>