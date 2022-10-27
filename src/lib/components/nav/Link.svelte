<script>
  export let href = '';
  export let inline = false;
</script>

<a {href} on:click class:inline={inline}>
  <span><slot></slot></span>
  {#if $$slots.default}
    <span></span>
  {/if}
</a>

<style lang="scss">
  a {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-decoration: none;
    padding: 0 10px;
    span:last-child {
      transition: 300ms;
      width: 10px;
      border-bottom: 1px solid;
      height: 1px;
    }
  }

  a:hover {
    span:last-child {
      transition: 300ms;
      width: 100%;
    }
  }
</style>