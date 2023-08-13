<script>
	import { page } from '$app/stores';
  export let href = '';
  export let inline = false;
  export let prefetch = false;
</script>

<a {href} on:click
  data-prefetch-sveltekit={prefetch}
  class:inline={inline}
  class:active={$page.url.pathname === href}>
  <span><slot></slot></span>
  {#if $$slots.default}
    <span></span>
  {/if}
</a>

<style>
  a {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-decoration: none;
    padding: 0 10px;
    color: var(--fg);
    transition: var(--animLength);
  }

  a span:last-child {
    transition: 300ms;
    width: 10px;
    border-bottom: 1px solid;
    height: 1px;
  }

  a:visited {
    color: var(--fg);
  }

  a.active,
  a:hover span:last-child {
    transition: 300ms;
    width: 100%;
  }
</style>