<script>
	import Navigation from "$lib/components/Navigation.svelte";
</script>
<Navigation />

<main>
  <slot></slot>
</main>

<style global>
  @font-face {
    font-family: 'Caveat';
    src: local('Caveat') url('/Caveat-VariableFont_wght.ttf');
  }

  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  * {
    font-family: 'Caveat', 'Courier New', Courier, monospace;
  }

  p {
    font-size: 20px;
  }

  .sr-only {
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
    width: 1px;
  }
  
  main {
    margin: 0 auto;
    padding: 10px;
    max-width: 800px;
  }
</style>