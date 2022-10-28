<script lang="ts">
  export let id: string;
  export let value: string | undefined;
  export let placeholder: string = '';
  export let disabled = false;
  export let srOnlyLabel = false;
</script>

<label for={id} class:sr-only={srOnlyLabel}>
  Weight Unit
</label>
<select
  {id}
  bind:value={value}
  {placeholder}
  {disabled}
  on:focus
  on:blur
>
  <!-- options -->
  <slot></slot>
</select>

<style lang="scss">
  label, select {
    font-size: var(--controlFontSize);
    height: var(--controlHeight);
  }

  select {
    width: 100%;
    color: var(--fg);
    background-color: var(--light-bg);
    transition: var(--animLength);
    &::placeholder {
      color: var(--placeholder);
    }
  }
</style>