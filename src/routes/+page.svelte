<script lang="ts">
	import { appState } from '$lib/store/app';
	import { onMount } from 'svelte';
	import { slide } from 'svelte/transition';
	import { StockClient } from '$lib/client/supabase.stock';
	import { stockStore } from '$lib/store/stock';
	import { StoreClient } from '$lib/client/supabase.store';
	import { stores } from '$lib/store/stores';

	import Button from '$lib/components/cta/Button.svelte';
	import Input from '$lib/components/input/Input.svelte';
	import Modal from '$lib/components/overlay/Modal.svelte';
	import Table from '$lib/components/layout/Table.svelte';
	import type { Store } from '$lib/model/store';

	// TODO:
	// Call API and save item to db
	// Double check item duplicates
	// Show list of existing items that match product name / brand
	let store: Store = {
		id: '',
		name: '',
		address: '',
		city: ''
	};
	let searching = false;

  // Svelte: rebind child component method to be called from parent
	let modalTrigger: any[] = [];

	function add() {
		StoreClient.addStore(store);
	}

	function save(store: Store) {
		StoreClient.updateStore(store);
	}

	function selectStore(store: Store) {
		$appState.myStore = store;
		if (store.id) {
			localStorage.setItem('storeId', store.id);
			localStorage.setItem('storeName', store.name);
			localStorage.setItem('storeAddress', store.address);
			localStorage.setItem('storeCity', store.city);
		}
	}

	async function find() {
		searching = true;
		let store$ = StoreClient.findStores(store) as Promise<Store[]>;
		let response = await store$;
		$stores = [...response];
	}

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

	$: hasRequired = store.name && store.address && store.city;

	onMount(() => {
		getStockInfo();
	});
</script>

<svelte:head>
	<title>Store Info</title>
</svelte:head>

<h1>Store Selection</h1>
<div class="flex-dt">
	<section class="half-dt">
		<Input
			id={'s-name'}
			label={'store name'}
			type={'text'}
			required={true}
			srOnlyLabel={true}
			placeholder={'Store Name...'}
			bind:value={store.name}
		/>
		<Input
			id={'s-cate'}
			label={'category'}
			type={'text'}
			required={true}
			srOnlyLabel={true}
			placeholder={'Category...'}
			bind:value={store.category}
		/>
	</section>
	<section class="half-dt">
		<Input
			id={'s-addy'}
			label={'address'}
			type={'text'}
			required={true}
			srOnlyLabel={true}
			placeholder={'Address...'}
			bind:value={store.address}
		/>
		<Input
			id={'s-city'}
			label={'city'}
			type={'text'}
			required={true}
			srOnlyLabel={true}
			placeholder={'City...'}
			bind:value={store.city}
		/>
	</section>
</div>

<div class="pl-1 pr-1">
	<Button on:click={find}>Find</Button>
</div>

{#if $stores && $stores.length > 0}
	<div transition:slide|local class="reset">
		<Table caption={'We found these stores...'}>
			<tr slot="headerTemplate">
				<th>Name</th>
				<th>Address</th>
				<th class="dt-only">City</th>
				<th>Action</th>
			</tr>
			{#each $stores as s, i (s.id)}
				<tr>
					<td>
						<Modal id={s.id || ''} on:confirm={() => save(s)} bind:openModal={modalTrigger[i]}>
							<div slot="trigger">{s.name}</div>
							<div slot="title">Store Details</div>
							<div slot="modal">
								<Input id={'s-name'}
									label={'store name'}
									type={'text'}
									required={true}
									srOnlyLabel={true}
									placeholder={'Store Name...'}
									bind:value={s.name}
								/>
								<Input id={'s-cate'}
									label={'category'}
									type={'text'}
									required={true}
									srOnlyLabel={true}
									placeholder={'Category...'}
									bind:value={s.category}
								/>
								<Input id={'s-addy'}
									label={'address'}
									type={'text'}
									required={true}
									srOnlyLabel={true}
									placeholder={'Address...'}
									bind:value={s.address}
								/>
								<Input id={'s-city'}
									label={'city'}
									type={'text'}
									required={true}
									srOnlyLabel={true}
									placeholder={'City...'}
									bind:value={s.city}
								/>
							</div>
						</Modal>
					</td>
					<td>
						<Button on:click={modalTrigger[i]}>{s.address}</Button>
					</td>
					<td class="dt-only">
						<Button on:click={modalTrigger[i]}>{s.city}</Button>
					</td>
					<td>
						<div class="flex justify-center">
							{#if $appState.myStore && $appState.myStore.id === s.id}
								Selected
							{:else}
								<Button on:click={() => selectStore(s)}>Select</Button>
							{/if}
						</div>
					</td>
				</tr>
			{/each}
		</Table>
	</div>
{:else}
	<p transition:slide|local>
		If this is your first time, please find and set your closest or preferred source of
		sustenance...
	</p>
{/if}

{#if $stores && $stores.length === 0 && searching}
	We couldn't find the store, would you like to add it?
	<Button on:click={add}>Add Store</Button>
{/if}

<style>
	.reset {
		--unit: 0;
	}
</style>
