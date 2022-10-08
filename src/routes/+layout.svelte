<script>
	import { onMount } from "svelte";
	import { theme } from "$lib/store/theme";
	import Footer from "$lib/components/nav/Footer.svelte";
	import Navigation from "$lib/components/nav/Navigation.svelte";
  import './global.scss';

  onMount(() => {
    const t = window.localStorage.getItem('theme');
    if (t) {
      $theme = t;
    }
  })
</script>

<Navigation />
<main>
  <slot></slot>
</main>
<Footer></Footer>
