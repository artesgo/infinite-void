<script lang="ts">
	import Required from "./Required.svelte";

  export let id: string;
  export let required = false;
  export let checked = false;
</script>

<label for={id}>
  <slot></slot>
  {#if required}<Required />{/if}
  <input {id} type="checkbox" bind:checked
    on:focus
    on:blur />
</label>

<style lang="scss">
  label {
    font-size: var(--controlFontSize);
  }
</style>