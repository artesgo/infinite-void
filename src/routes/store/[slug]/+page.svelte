<script lang="ts">
	import Button from '$lib/components/cta/Button.svelte';
	import { appState } from '$lib/store/app';
	import Delete from '../delete.svelte';

  let deleteStore = false;
  function del() {
    deleteStore = true;
  }
</script>

{#if $appState.store}
  {@const store = $appState.store}
  <div>{store.name}</div>
  <div>{store.address}, {store.city}</div>
  <div>{store.category || ''}</div>
  {#if deleteStore}
    <Delete {store} />
  {:else}
    <!-- delete store not implemented, until trust system is implemented -->
    <Button on:click={del}>Delete</Button>
  {/if}
{:else}
  Oh no, what happened here...
{/if}
