<script lang="ts">
  export let id: string;
  export let value: string | undefined;
  export let disabled = false;
</script>

<label for={id}>
  Weight Unit
</label>
<select
  {id}
  {value}
  {disabled}
  on:focus
  on:blur
>
  <!-- options -->
  <slot></slot>
</select>