<script>
	import Link from "./Link.svelte";
</script>

<header>
  <nav>
    <Link href="/">Home</Link>
    <Link href="/product">Products</Link>
    <!-- <Link href="/map">Map</Link> -->
    <Link href={"/about"}>About</Link>
  </nav>
  <nav>
    Themes: Searing Retinas / Stare Into the Void
  </nav>
</header>

<style lang="scss">
  header {
    display: flex;
    justify-content: space-between;
  }

  nav {
    margin: 10px;
    display: flex;
    font-size: 1.25rem;
  }
</style>