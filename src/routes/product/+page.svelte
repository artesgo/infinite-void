<script lang="ts">
	import { slide } from 'svelte/transition';

	import { enhance } from '$app/forms';

	import { weights, weightsShort } from './_product';
	import type { ActionData } from './$types';
	import SaveStock from './SaveStock.svelte';

	import { appState } from '$lib/store/app';
	import { productsStore } from '$lib/store/products';
	import { stockStore } from '$lib/store/stock';
	import BarCodeScanner from '$lib/components/input/BarCodeScanner.svelte';
	import Button from '$lib/components/cta/Button.svelte';
	import Checkbox from '$lib/components/input/Checkbox.svelte';
	import Input from '$lib/components/input/Input.svelte';
	import Modal from '$lib/components/overlay/Modal.svelte';
	import Select from '$lib/components/input/Select.svelte';
	import Table from '$lib/components/layout/Table.svelte';
	import type { Product } from '$lib/model/product';

	// export let data: PageData;
	export let form: ActionData;
	// Double check item duplicates
	// Show list of existing items that match product name / brand
	let homeStore = false;
	let modalTrigger: any[] = [];
	let saveTrigger: any[] = [];

	function clear() {
		if (form) {
			form.brand = '';
			form.name = '';
			form.sku = '';
			form.weight_unit = '';
			form.weight = '';
		}
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
</script>

<svelte:head>
	<title>Product Info</title>
</svelte:head>

<h1>Product List</h1>

<form method="POST" use:enhance={(data) => handleFormActions(data)}>
	<div class="flex-dt wrap">
		<section class="half-dt">
			<!-- save to product table -->
			<Input
				value={form?.brand ?? ''}
				placeholder="enter the product's brand..."
				type={'text'}
				id={'p-brand'}
				name={'brand'}
				label={'Product Brand'}
				srOnlyLabel={true}
			/>
			<Input
				value={form?.name ?? ''}
				placeholder="enter the product's name..."
				type={'text'}
				id={'p-name'}
				name={'name'}
				label={'Product Name'}
				srOnlyLabel={true}
			/>
		</section>
		<section class="half-dt">
			<Input
				value={form?.weight ?? ''}
				placeholder="enter the product's weight..."
				type={'number'}
				id={'p-weight'}
				name={'weight'}
				label={'Weight'}
				srOnlyLabel={true}
			/>
			<Select id={'p-units'} name={'weight_unit'} value={form?.weight_unit ?? ''} disabled={!form?.weight} srOnlyLabel={true}>
				<option value="g">{weights.get('g')}</option>
				<option value="ml">{weights.get('ml')}</option>
				<option value="u">{weights.get('u')}</option>
				<option value="ea">{weights.get('ea')}</option>
				<option value="lb">{weights.get('lb')}</option>
				<option value="oz">{weights.get('oz')}</option>
				<option value="L">{weights.get('L')}</option>
				<option value="kg">{weights.get('kg')}</option>
			</Select>
		</section>
	</div>
	<div class="flex-dt wrap">
		<section class="half-dt">
			<Input
				value={form?.sku ?? ''}
				placeholder="product's SKU (Optional)..."
				type={'text'}
				id={'p-sku'}
				name={'sku'}
				label={'Product SKU'}
				srOnlyLabel={true}
			/>
		</section>
		{#if $appState.myStore}
			<section class="half-dt">
				<Checkbox bind:checked={homeStore} id={'p-home-store'}>Show only products at {$appState.myStore.address}</Checkbox>
			</section>
		{/if}
	</div>

	<div class="pl-1 pr-1">
		<!-- <Button on:click={find}>Find</Button> -->
		<Button formaction='/product?/find' type="submit">Find Product</Button>
		<Button formaction='/product?/add' type="submit">Add Product</Button>
		<Button on:click={clear}>Clear Inputs</Button>
	</div>

	<div class="flex">
		<section>
			<BarCodeScanner on:code={(event) => setSku(event)} on:err={onBarcodeErr} />
		</section>
	</div>
</form>

{#if filtered.length}
	<div transition:slide|local class="reset">
		<Table caption={'We found ' + filtered.length + ' matching products'}>
			<tr slot="headerTemplate">
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
				<tr>
					<td>
						<Modal id={p.id || ''} bind:openModal={modalTrigger[i]}>
							<div slot="trigger">{p.name}</div>
							<div slot="title">{p.name}</div>
							<form slot="modal" method="POST" use:enhance>
								<Input
									id={'modal-p-brand'}
									name={'brand'}
									label={'Brand Name'}
									type={'text'}
									required={true}
									placeholder={'Brand Name...'}
									bind:value={p.brand}
								/>
								<Input
									id={'modal-p-name'}
									name={'name'}
									label={'Product Name'}
									type={'text'}
									required={true}
									placeholder={'Product Name...'}
									bind:value={p.name}
								/>
								<Input
									id={'modal-p-weight'}
									name={'weight'}
									label={'Weight'}
									type={'text'}
									required={true}
									placeholder={'Weight...'}
									bind:value={p.weight}
								/>
                <Select id={'modal-p-units'} name={'weight_unit'} bind:value={p.weight_unit} srOnlyLabel={true}>
                  <option value="g">{weights.get('g')}</option>
                  <option value="ml">{weights.get('ml')}</option>
                  <option value="u">{weights.get('u')}</option>
                  <option value="ea">{weights.get('ea')}</option>
                  <option value="lb">{weights.get('lb')}</option>
                  <option value="oz">{weights.get('oz')}</option>
                  <option value="L">{weights.get('L')}</option>
                  <option value="kg">{weights.get('kg')}</option>
                </Select>
								{#if stock || myStore}
									<SaveStock {stock} store={myStore} product={p} bind:saveStock={saveTrigger[i]} />
								{/if}
							</form>
							<div slot="actions">
								<Button style={'secondary'} formaction="product?/saveStockProduct" type="submit">Save</Button>
								<Button style={'secondary'} on:click>Cancel</Button>
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
		</Table>
	</div>
{/if}

<style>
	.reset {
		--unit: 0;
	}
</style>
