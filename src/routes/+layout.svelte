<script>
	import { appState } from '$lib/store/app';
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
    if (localStorage.getItem('storeId')) {
      $appState.myStore = {
        id: localStorage.getItem('storeId') || '',
        name: localStorage.getItem('storeName') || '',
        address: localStorage.getItem('storeAddress') || '',
        city: localStorage.getItem('storeCity') || '',
      }
    }
  })
</script>

<Navigation />
<main>
  <slot></slot>
</main>
<Footer />
