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

<div class="mb-1">
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
</div>

<style lang="scss">
  @use "../common.scss" as c;

  label {
    display: flex;
    justify-content: flex-start;
  }
  .label {
    margin-right: 1rem;
  }
  input {
    font-size: c.$input-font-size;
    border: 1px solid;
    @include c.input;
    padding: 0 10px;
  }
  div, input {
    width: 100%;
  }
</style>