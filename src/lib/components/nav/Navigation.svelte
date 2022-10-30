<script>
	import Link from "./Link.svelte";
	import Button from "../cta/Button.svelte";
	import { theme } from "$lib/store/theme";
  import { page } from '$app/stores';
</script>

<header>
  <nav>
    <Link href="/">Home</Link>
    <Link href="/product">Products</Link>
    <!-- <Link href="/map">Map</Link> -->
    <Link href={"/about"}>About</Link>
  </nav>
  <nav>
    <Button on:click={() => theme.setTheme('searing')}>Light</Button>
    <Button on:click={() => theme.setTheme('void')}>Dark</Button>
  </nav>
</header>

<style lang="scss">
  header {
    display: flex;
    justify-content: space-between;
    height: 40px;
  }

  nav {
    margin: 10px;
    display: flex;
    height: 30px;
    align-items: center;
  }
</style>