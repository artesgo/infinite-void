<script lang="ts">
  export let id: string;
  export let value: string | undefined;
  export let disabled = false;
  export let srOnlyLabel = false;
</script>

<label for={id} class:sr-only={srOnlyLabel}>
  Weight Unit
</label>
<select
  {id}
  bind:value={value}
  {disabled}
  on:focus
  on:blur
>
  <!-- options -->
  <slot></slot>
</select>