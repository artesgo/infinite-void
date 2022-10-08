<script lang="ts">
	import Required from "./Required.svelte";

  export let id: string;
  export let required = false;
</script>

<label for={id}>
  <slot></slot>
  {#if required}<Required />{/if}
</label>
<input {id} type="checkbox"
  on:focus
  on:blur />