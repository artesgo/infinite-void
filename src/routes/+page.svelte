<script>
	import Button from "$lib/components/cta/Button.svelte";
	import { appState } from "$lib/store/app";
</script>

<svelte:head>
  <title>The Void</title>
</svelte:head>

<!-- TODO: Find User Store -->
<h1>Salutations..</h1>

{#if $appState.myStore}
  <p>You have {$appState.myStore.name} @ {$appState.myStore.address} selected.</p>
{:else}
  <p>If this is your first time, please find and set your closest or preferred source of sustenance...</p>
  <Button>Bring up Search for stores</Button>
{/if}
