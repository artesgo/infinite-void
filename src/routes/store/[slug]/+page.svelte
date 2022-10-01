<script lang="ts">
	import { appState } from '$lib/store/app';
	import Delete from '../delete.svelte';
</script>

{#if $appState.store}
  {@const store = $appState.store}
  <div>{store.name}</div>
  <div>{store.address}, {store.city}</div>
  <div>{store.category || ''}</div>
  <Delete {store} />
{:else}
  Oh no, what happened here...
{/if}
