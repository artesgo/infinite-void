<script>
	import { stockStore } from '$lib/store/stock';
	import '$lib/global.scss';
	import { appState } from '$lib/store/app';
	import { onMount } from 'svelte';
	import { theme } from '$lib/store/theme';
	import Footer from '$lib/components/nav/Footer.svelte';
	import Navigation from '$lib/components/nav/Navigation.svelte';
	import { StockClient } from '$lib/client/supabase.stock';

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
		
		getStockInfo();
	});
	
	// we want to to load stock info no matter where the user is
	async function getStockInfo() {
		if (!$appState.myStore) {
			return;
		}
		let stock$ = StockClient.findStock({
			storeId: $appState.myStore.id
		});
		let response = await stock$;
		if (response?.length) {
			$stockStore = [...response];
		}
	}
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
