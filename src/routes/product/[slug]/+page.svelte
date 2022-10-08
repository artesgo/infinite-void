<script lang="ts">
	import { appState } from '$lib/store/app';
	import Delete from '../Delete.svelte';
</script>

{#if $appState.product}
  {@const product = $appState.product}
  <div>{product.name}</div>
  <div>{product.brand}</div>
  <div>{product.weight} {product.weight_unit}</div>
  <Delete {product} />
{:else}
  Oh no, what happened here...
{/if}