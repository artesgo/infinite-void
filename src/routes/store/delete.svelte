<script lang="ts">
	import Button from '$lib/components/cta/Button.svelte';
  import type { Store } from '$lib/model/store';
	import { storesStore } from '$lib/store/stores';

  export let store: Store;

  function deleteStore () {
    // TODO: delete from db
    $storesStore = [...$storesStore.filter((_store: Store) => _store.id !== store.id)];
  }
</script>

<Button on:click={() => deleteStore()}>Confirm Delete Store</Button>