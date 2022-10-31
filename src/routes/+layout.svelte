<script>
	import './global.scss';
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
		if (localStorage.getItem('storeId')) {
			$appState.myStore = {
				id: localStorage.getItem('storeId') || '',
				name: localStorage.getItem('storeName') || '',
				address: localStorage.getItem('storeAddress') || '',
				city: localStorage.getItem('storeCity') || ''
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
	class:searing={$theme === 'searing'}
	class:void={$theme === 'void'}
	class:halloween={$theme === 'ween'}
>
	<Navigation />
	<main>
		<slot />
	</main>
	<Footer />
</div>
