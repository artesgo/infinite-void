<script>
	import { page } from '$app/stores';
  export let href = '';
  export let inline = false;
  export let prefetch = false;
  export let disabled = false;
</script>

<a {href} on:click
  data-prefetch-sveltekit={prefetch}
  class="tab tab-lifted"
  class:grow={$page.url.pathname === href}
  class:inline
  class:disabled
  tabindex={disabled ? -1 : 0}
  class:tab-active={$page.url.pathname === href}>
  <span><slot></slot></span>
  {#if $$slots.default}
    <span></span>
  {/if}
</a>

<style>
  .grow {
    flex-grow: 1;
  }

  a.disabled {
    pointer-events: none;
    cursor: default;
  }
</style>