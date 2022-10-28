<script>
	import Link from "./Link.svelte";
	import Button from "../cta/Button.svelte";
	import { theme } from "$lib/store/theme";
</script>

<header>
  <nav>
    <Link href="/">Home</Link>
    <Link href="/product">Products</Link>
    <!-- <Link href="/map">Map</Link> -->
    <Link href={"/about"}>About</Link>
  </nav>
  <nav>
    <Button on:click={() => theme.setTheme('searing')}>Searing Retinas</Button>
    <Button on:click={() => theme.setTheme('void')}>See Into the Void</Button>
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