<script>
	import Navigation from "$lib/components/nav/Navigation.svelte";
</script>

<Navigation />
<main>
  <slot></slot>
</main>

<style global lang="scss">
  @use "./styles/partials.scss";

  * {
    font-family: 'Caveat', 'Courier New', Courier, monospace;
    box-sizing: border-box;
  }

  body {
    margin: 0;
    padding: 0;
  }

  p {
    font-size: 1.5rem;
  }
  
  main {
    margin: 0 auto;
    padding: 10px;
    max-width: 800px;
  }
</style>