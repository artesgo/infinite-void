<script>
	import { page } from '$app/stores';
  export let href = '';
  export let inline = false;
</script>

<a {href} on:click
  class:inline={inline}
  class:active={$page.url.pathname === href}>
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
    color: var(--fg);
    transition: var(--animLength);
    &:visited {
      color: var(--fg);
    }
  }

  a.active,
  a:hover {
    span:last-child {
      transition: 300ms;
      width: 100%;
    }
  }
</style>