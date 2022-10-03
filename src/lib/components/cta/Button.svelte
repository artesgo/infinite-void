<button
  on:click
  on:focus
  on:blur
  on:mouseover
  on:mouseout
><slot></slot></button>

<style lang="scss">
  button {
    background: none;
    font-size: 1.25rem;
    padding: 0 10px;
    border: 1px solid;
    cursor: pointer;
  }
</style>