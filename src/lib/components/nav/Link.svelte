<script>
	import { theme } from '$lib/store/theme';
	import { page } from '$app/stores';

  export let href = '';
  export let inline = false;
  export let prefetch = false;
  $: active = $page.url.pathname === href;
</script>

<a {href} on:click
  data-prefetch-sveltekit={prefetch}
  class="tab tab-lifted"
  class:bg-white={active && $theme === 'light'} class:bg-neutral-800={active && $theme === 'dark'}
  class:grow={active}
  class:inline
  class:tab-active={active}>
  <span><slot></slot></span>
</a>

<style>
  .grow {
    flex-grow: 1;
  }
</style>