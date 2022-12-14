<script lang="ts">
	import { appState } from '$lib/store/app';
	import { ProductClient } from '$lib/client/supabase.product';
	import { products } from '$lib/store/products';
	import { slide } from 'svelte/transition';
	import { stockStore } from '$lib/store/stock';
	import { weights, weightsShort } from './_product';

	import BarCodeScanner from '$lib/components/input/BarCodeScanner.svelte';
	import Button from '$lib/components/cta/Button.svelte';
	import Checkbox from '$lib/components/input/Checkbox.svelte';
	import Input from '$lib/components/input/Input.svelte';
	import Modal from '$lib/components/overlay/Modal.svelte';
	import Select from '$lib/components/input/Select.svelte';
	import Table from '$lib/components/layout/Table.svelte';
	import type { Product } from '$lib/model/product';
	import SaveStock from './SaveStock.svelte';

	// TODO:
	// Call API and save item to db
	// Double check item duplicates
	// Show list of existing items that match product name / brand
	let brand = '';
	let name = '';
	let searching = false;
	let sku = '';
	let homeStore = false;
	let weight_unit = '';
	let weight = '';
	let modalTrigger: any[] = [];
	let saveTrigger: any[] = [];

	function add() {
		const product = { name, brand, weight, weight_unit, sku };
		ProductClient.addProduct(product);
	}

	function save(product: Product, index: number) {
		ProductClient.updateProduct(product);
    saveTrigger[index]();
	}

	function clear() {
		brand = '';
		name = '';
		sku = '';
		weight_unit = '';
		weight = '';
	}

	async function find() {
		searching = true;
		const product = { name, brand, weight, weight_unit, sku };
		let products$ = ProductClient.findProducts(product) as Promise<Product[]>;
		let response = await products$;
		$products = [...response];
	}

	function onErr(err: { detail: string }) {
		console.warn(err);
	}

	$: filtered = [
		...$products.filter((p) => {
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
</script>

<svelte:head>
	<title>Product Info</title>
</svelte:head>

<h1>Product List</h1>
<div class="flex-dt wrap">
	<section class="half-dt">
		<!-- save to product table -->
		<Input
			bind:value={brand}
			placeholder="enter the product's brand..."
			type={'text'}
			id={'p-brand'}
			label={'Product Brand'}
			required={true}
			srOnlyLabel={true}
		/>
		<Input
			bind:value={name}
			placeholder="enter the product's name..."
			type={'text'}
			id={'p-name'}
			label={'Product Name'}
			required={true}
			srOnlyLabel={true}
		/>
	</section>
	<section class="half-dt">
		<Input
			bind:value={weight}
			placeholder="enter the product's weight..."
			type={'number'}
			id={'p-weight'}
			label={'Weight'}
			srOnlyLabel={true}
		/>
		<Select id={'p-units'} bind:value={weight_unit} disabled={!weight} srOnlyLabel={true}>
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
			bind:value={sku}
			placeholder="product's SKU (Optional)..."
			type={'text'}
			id={'p-sku'}
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
<div class="flex">
	<section>
		<BarCodeScanner bind:value={sku} on:err={onErr} />
	</section>
</div>

<div class="pl-1 pr-1">
	<Button on:click={find}>Find</Button>
	<Button on:click={add}>Add Product</Button>
	<Button on:click={clear}>Clear Inputs</Button>
</div>

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
						<Modal id={p.id || ''} on:confirm={() => save(p, i)} bind:openModal={modalTrigger[i]}>
							<div slot="trigger">{p.name}</div>
							<div slot="title">{p.name}</div>
							<div slot="modal">
								<Input
									id={'modal-p-brand'}
									label={'Brand Name'}
									type={'text'}
									required={true}
									placeholder={'Brand Name...'}
									bind:value={p.brand}
								/>
								<Input
									id={'modal-p-name'}
									label={'Product Name'}
									type={'text'}
									required={true}
									placeholder={'Product Name...'}
									bind:value={p.name}
								/>
								<Input
									id={'modal-p-weight'}
									label={'Weight'}
									type={'text'}
									required={true}
									placeholder={'Weight...'}
									bind:value={p.weight}
								/>
                <Select id={'modal-p-units'} bind:value={p.weight_unit} srOnlyLabel={true}>
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
