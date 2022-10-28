<script lang="ts">
  export let type: "primary" | "secondary" | "tertiary" = "primary";
  export let width: "inline" | "block" = "block";
  $: classes = `${type} ${width}`;
</script>

<button
  on:click
  on:focus
  on:blur
  on:mouseover
  on:mouseout
  type="button"
  class={classes}
><slot></slot></button>

<style lang="scss">
  @use "../common.scss" as c;

  button {
    background: none;
    padding: 0 10px;
    cursor: pointer;
    white-space: nowrap;

    @include c.input;

    &.primary {
      border: 1px solid var(--void);
    }
    &.block {
      display: block;
      width: 100%;
    }
  }
</style>