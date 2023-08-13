<script lang="ts">
	import '$lib/global.scss';
	import { appState } from '$lib/store/app';
	import { onMount } from 'svelte';
	import { theme } from '$lib/store/theme';
	import Footer from '$lib/components/nav/Footer.svelte';
	import Navigation from '$lib/components/nav/Navigation.svelte';

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
</script>

<div
	class="app"
	class:loaded
>
	<Navigation />
	<main>
		<slot />
	</main>
	<!-- <Footer /> -->
</div>
