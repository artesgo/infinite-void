<script>
  export let href = '';
</script>

<a {href} on:click>
  <span><slot></slot></span>
  <span></span>
</a>

<style lang="scss">
  a {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 10px;
    // font-size: 20px;
    text-decoration: none;
    color: #333;
    padding: 0 10px;
    span:last-child {
      transition: 300ms;
      width: 10px;
      border-bottom: 1px solid #333;
      height: 1px;
    }
  }

  a:hover {
    span:last-child {
      transition: 300ms;
      width: 100%;
      border-bottom: 1px solid #333;
    }
  }
</style>