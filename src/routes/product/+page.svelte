<script lang="ts">
	import { enhance } from '$app/forms';

	import { weights, weightsShort } from './_product';
	import type { ActionData } from './$types';
	import SaveStock from './SaveStock.svelte';

	import { appState } from '$lib/store/app';
	import { productsStore } from '$lib/store/products';
	import { stockStore } from '$lib/store/stock';
	import BarCodeScanner from '$lib/components/input/BarCodeScanner.svelte';
	import { Button, Modal, type MediaContext, isBreakpoint, gfly } from '@artesgo/holokit';
	import { getContext } from 'svelte';
	import Input from '$lib/components/input/Input.svelte';

	export let form: ActionData;
	// Double check item duplicates
	// Show list of existing items that match product name / brand
	let homeStore = true;
	let modalTrigger: any[] = [];
	let saveTrigger: any[] = [];
	let brand = '';
	let name = '';
	let sku = '';
	let weight_unit = '';
	let weight = '';

	function clear() {
		brand = '';
		name = '';
		sku = '';
		weight_unit = '';
		weight = '';
	}

	function onBarcodeErr(err: { detail: string }) {
		console.warn(err);
	}

	function setSku(event: any) {
		if (form) form.sku = event.details;
	}

	$: filtered = [
		...$productsStore.filter((p) => {
			if (homeStore) {
				return (
					$stockStore.findIndex(
						(stk) => $appState.myStore?.id === stk.storeId && stk.productId === p.id
					) > -1
				);
			}
			return p;
		})
	];

	$: {
		if (form?.products?.length) {
			const { products } = form;
			$productsStore = [...products];
		} else {
			$productsStore = [ ];
		}
	}

	function handleFormActions(data: any) {
		console.log(data);
	}
	const mediaManager = getContext<MediaContext>('media');
	$: atLeastMobile = isBreakpoint($mediaManager).atLeastMobile();
</script>

<svelte:head>
	<title>Product Info</title>
</svelte:head>

<h1>Product List</h1>

<form method="POST" use:enhance={(data) => handleFormActions(data)}  class="mb-4">
	<!-- save to product table -->
	<div class='join w-full'>
		<Input
			bind:value={brand}
			placeholder="product brand..."
			label="Product Brand"
			id={'p-brand'}
			name={'brand'}
		/>
		<Input
			bind:value={name}
			placeholder="product name..."
			label="Product Name"
			id={'p-name'}
			name={'name'}
		/>
	</div>
	<div class='join w-full'>
		<Input
			bind:value={weight}
			placeholder="product weight..."
			label="Product Weight"
			id={'p-weight'}
			name={'weight'}
		/>
		<select class="join-item select select-success w-1/2" id={'p-units'} bind:value={weight_unit} disabled={!weight}>
			<option value="g">{weights.get('g')}</option>
			<option value="ml">{weights.get('ml')}</option>
			<option value="u">{weights.get('u')}</option>
			<option value="ea">{weights.get('ea')}</option>
			<option value="lb">{weights.get('lb')}</option>
			<option value="oz">{weights.get('oz')}</option>
			<option value="L">{weights.get('L')}</option>
			<option value="kg">{weights.get('kg')}</option>
		</select>
	</div>

	<div class='join w-full'>
		<Input
			value={form?.sku ?? ''}
			placeholder="product SKU (Optional)..."
			label="Product SKU (Optional)"
			id={'p-sku'}
			name={'sku'}
		/>
		{#if $appState.myStore}
			<section class="join-item input input-success flex items-center w-1/2">
				<input class="checkbox checkbox-success mx-2" type="checkbox" bind:checked={homeStore} id='p-home-store' />
				<label for="p-home-store">
					only products at {$appState.myStore.address}
				</label>
			</section>
		{/if}
	</div>

	<div>
		<!-- <Button on:click={find}>Find</Button> -->
		<button class="btn btn-xs btn-success" formaction='/product?/find' type="submit">Find Product</button>
		<button class="btn btn-xs btn-success" formaction='/product?/add' type="submit">Add Product</button>
		<button class="btn btn-xs btn-success" on:click={clear}>Clear Inputs</button>
	</div>

	<div class="flex">
		<section>
			<BarCodeScanner on:code={(event) => setSku(event)} on:err={onBarcodeErr} />
		</section>
	</div>
</form>

{#if filtered.length}
	<div transition:gfly={{ y: 999 }} class="reset">
		<table class="table">
			<caption>{'We found ' + filtered.length + ' matching products'}</caption>
			<tr>
				<th>Name</th>
				<th class="dt-only">Brand</th>
				<th>Weight</th>
				<th>Unit</th>
        <th class="dt-only">Aisle</th>
        <th class="dt-only">Shelf</th>
        <th class="dt-only">Level</th>
        <th class="dt-only">Price</th>
			</tr>

			{#each filtered as p, i (p.id)}
				{@const myStore = $appState.myStore}
        {@const stock = $stockStore.find(
					(s) => myStore && s.productId === p.id && s.storeId === myStore.id
				)}
				<tr class="hover">
					<td>
						<button class="btn btn-success btn-md w-full" on:click={() => modalTrigger[i] = true}>{p.name}</button>
						<Modal id={p.id || ''} bind:open={modalTrigger[i]}>
							<h1 slot="header">{p.name}</h1>
							<form method="POST" use:enhance>
								<input
									class="input input-success w-full"
									id={'modal-p-brand'}
									name={'brand'}
									placeholder={'Brand Name...'}
									bind:value={p.brand}
								/>
								<input
									class="input input-success w-full"
									id={'modal-p-name'}
									name={'name'}
									placeholder={'Product Name...'}
									bind:value={p.name}
								/>
								<input
									class="input input-success w-full"
									id={'modal-p-weight'}
									name={'weight'}
									placeholder={'Weight...'}
									bind:value={p.weight}
								/>
                <select class="select" id={'modal-p-units'} value={p.weight_unit ?? ""}>
                  <option value="g">{weights.get('g')}</option>
                  <option value="ml">{weights.get('ml')}</option>
                  <option value="u">{weights.get('u')}</option>
                  <option value="ea">{weights.get('ea')}</option>
                  <option value="lb">{weights.get('lb')}</option>
                  <option value="oz">{weights.get('oz')}</option>
                  <option value="L">{weights.get('L')}</option>
                  <option value="kg">{weights.get('kg')}</option>
								</select>
								{#if stock || myStore}
									<SaveStock {stock} store={myStore} product={p} bind:saveStock={saveTrigger[i]} />
								{/if}
							</form>
							<div slot="footer">
								<Button theme={'info'} formaction="product?/saveStockProduct" type="submit">Save</Button>
								<Button theme={'info'} on:click={() => modalTrigger[i] = !modalTrigger[i]} type="button">Cancel</Button>
							</div>
						</Modal>
					</td>
					<td class="emulate-button dt-only">{p.brand || ''}</td>
					<td class="emulate-button">{p.weight || ''}</td>
					<td class="emulate-button">{weightsShort.get(p.weight_unit || '')}</td>
          <td class="emulate-button dt-only">{stock?.aisle || ''}</td>
          <td class="emulate-button dt-only">{stock?.shelf || ''}</td>
          <td class="emulate-button dt-only">{stock?.level || ''}</td>
          <td class="emulate-button dt-only">{#if stock?.price}
            ${stock?.price}
          {/if}</td>
				</tr>
			{/each}
		</table>
	</div>
{/if}

<style>
	.reset {
		--unit: 0;
	}
</style>
