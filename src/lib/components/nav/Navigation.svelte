<script>
	import { browser } from '$app/environment';
	import { theme } from "$lib/store/theme";
	import Link from "./Link.svelte";

  function toggleTheme() {
    if ($theme === 'dark') {
      theme.setTheme('light');
    } else {
      theme.setTheme('dark');
    }
  }
  $: if (browser) {
    const _theme = localStorage.getItem('theme') || 'dark';
    theme.setTheme(_theme);
  }
</script>

<header class:bg-amber-400={$theme === 'light'} class:bg-neutral-900={$theme === 'dark'}>
  <nav class="tabs">
    <Link disabled></Link>
    <Link prefetch href="/">Home</Link>
    <Link prefetch href="/product">Products</Link>
    <!-- create a drawer that pulls out to show the checklist while on the products page -->
    <Link href="/checklist">Checklist</Link>
    <Link href="/profile">Profile</Link>
    <!-- <a class="tab" href="/map">Map</a> -->
    <!-- <Link href="/about">About</Link> -->
    <button class="tab tab-lifted" on:click={toggleTheme}>
      <div class='sr-only'>{$theme}</div>
      {#if $theme === 'dark'}
        <img width="32px" src='moon.svg' alt='' role="presentation" />
      {:else}
        <img width="32px" src='sun.svg' alt='' role="presentation" />
      {/if}
    </button>
    <Link disabled></Link>
  </nav>
</header>

<style lang="scss">
  nav {
    display: flex;
    height: 30px;
    align-items: center;
    width: 100%;
  }
  header {
    padding-top: 20px;
    padding-bottom: 2px;
  }
</style>