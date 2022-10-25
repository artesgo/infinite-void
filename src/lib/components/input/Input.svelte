<script lang="ts">
  import Required from "./Required.svelte";

  export let type = 'text';
  export let id: string;
  export let value: string | number | undefined;
  export let label = '';
  export let required = false;
  export let placeholder = 'placeholder';
  export let pattern = '';
  export let srOnlyLabel = false;
  $: props = {
    id, required, placeholder, pattern
  }
</script>

<label for={id} class:sr-only={srOnlyLabel}>
  <span class='label'>{label}</span>
  {#if required}
    <Required />
  {/if}
</label>
{#if type === 'text'}
  <input type="text" bind:value {...props}
    on:click on:blur on:focus
    on:mouseenter on:mouseout
    on:keydown on:keypress on:keyup />
{:else}
  <input type="number" bind:value {...props}
    on:click on:blur on:focus
    on:mouseenter on:mouseout
    on:keydown on:keypress on:keyup />
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