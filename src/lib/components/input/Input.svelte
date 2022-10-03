<script lang="ts">
  import Required from "./Required.svelte";

  export let type = 'text';
  export let id: string;
  export let value = '';
  export let label = '';
  export let required = false;
  export let placeholder = 'placeholder';
  export let pattern = '';
  $: props = {
    id, required, placeholder, pattern
  }
</script>

<label for={id}>
  <span class='label'>{label}</span>
  {#if required}
    <Required />
  {/if}
</label>
{#if type === 'text'}
  <input type="text" bind:value {...props} />
{:else}
  <input type="number" bind:value {...props} />
{/if}

<style>
  label {
    display: flex;
    justify-content: flex-start;
  }
  .label {
    margin-right: 1rem;
  }
</style>