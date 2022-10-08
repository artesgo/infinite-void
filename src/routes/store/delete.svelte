<script lang="ts">
	import Button from '$lib/components/cta/Button.svelte';
  import type { Store } from '$lib/model/store';
	import { stores } from '$lib/store/stores';

  export let store: Store;

  function deleteStore () {
    // TODO: delete from db
    $stores = [...$stores.filter(_store => _store.id !== store.id)];
  }
</script>

<Button on:click={() => deleteStore()}>Delete Store</Button>