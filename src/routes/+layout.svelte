<script lang="ts">
	import '$lib/global.scss';

	import { appState } from '$lib/store/app';
	import { onMount, setContext } from 'svelte';
	import { theme } from '$lib/store/theme';
	import Footer from '$lib/components/nav/Footer.svelte';
	import Navigation from '$lib/components/nav/Navigation.svelte';
	import { MediaMonitor, createFocusManager, createMediaManager } from '@artesgo/holokit';

	let loaded = false;

	onMount(() => {
		const t = window.localStorage.getItem('theme');
		if (t) {
			theme.setTheme(t);
		}
		if (localStorage.getItem('store-id')) {
			$appState.myStore = {
				id: localStorage.getItem('store-id') || '',
				name: localStorage.getItem('store-name') || '',
				address: localStorage.getItem('store-address') || '',
				city: localStorage.getItem('store-city') || ''
			};
		}
		setTimeout(() => {
			loaded = true;
		}, 10);
	});
	
	const focusManager = createFocusManager();
	setContext('focus', focusManager);

	const mediaManager = createMediaManager();
	setContext('media', mediaManager);
</script>

<section data-theme={$theme} class="min-h-full">
	<MediaMonitor />
	<Navigation />
	<main>
		<slot />
	</main>
	<Footer />
</section>

<style>
	section {
		padding: 20px 0;
	}
</style>