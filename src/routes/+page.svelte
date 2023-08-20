<script lang="ts">
	import { enhance } from '$app/forms';
	import { appState } from '$lib/store/app';
	import { slide } from 'svelte/transition';
	import { storesStore } from '$lib/store/stores';
	import Table from '$lib/components/layout/Table.svelte';
	import type { Store } from '$lib/model/store';
	import type { ActionData } from './$types';
	import { Modal, Button, Flex, isBreakpoint, type MediaState, MediaMonitor, type MediaContext } from '@artesgo/holokit';
	import { getContext } from 'svelte';
	import Input from '$lib/components/input/Input.svelte';
	export let form: ActionData;

  // Svelte: rebind child component method to be called from parent
	let modalTrigger: any[] = [];

	function selectStore(store: Store) {
		appState.setMyStore(store);
	}

	$: {
		if (form && form?.stores?.length) {
			let { stores } = form;
			$storesStore = [...stores as Store[]];
		}
	}

	const mediaManager = getContext<MediaContext>('media');
	$: atLeastMobile = isBreakpoint($mediaManager).atLeastMobile();
</script>

<svelte:head>
	<title>Cookie Providers List</title>
</svelte:head>

<h1>Place of Cookies</h1>
<form method="POST" use:enhance class="mb-4">
	<div class='join w-full'>
		<Input
			id={'s-name'}
			name={'name'}
			placeholder={'Store Name...'}
			label={'Store Name'}
			value={form?.name || ''}
		/>
		<Input
			id={'s-cate'}
			name={'category'}
			placeholder={'Category...'}
			label={'Category'}
			value={form?.category || ''}
		/>
	</div>
	
	<div class='join w-full'>
		<Input
			id={'s-addy'}
			name={'address'}
			placeholder={'Address...'}
			value={form?.address || ''}
		>Store address</Input>
		<Input
			id={'s-city'}
			name={'city'}
			placeholder={'City...'}
			value={form?.city || ''}
		>Store City</Input>
	</div>

	<button class="btn btn-success btn-xs" formaction={'?/find'} type="submit">Find</button>
	{#if $storesStore && $storesStore.length === 0}
		We couldn't find the store, would you like to add it?
		<button class="btn btn-success btn-xs" formaction='?/add' type="submit">Add Store</button>
	{/if}
</form>

{#if $storesStore && $storesStore.length > 0}
	<div transition:slide|local class="reset">
		<Table caption={'We found these potential cookie providers...'}>
			<tr slot="headerTemplate">
				<th>Name</th>
				<th>Address</th>
				<th class="dt-only">City</th>
				<th>Action</th>
			</tr>
			{#each $storesStore as s, i (s.id)}
				<tr>
					<td>
            <button class="btn btn-success btn-sm w-full mb-2" on:click={() => modalTrigger[i] = true}>{s.name}</button>
						<Modal id={s.id || ''} bind:open={modalTrigger[i]}>
							<h1 slot="header">{s.name}</h1>
							<div>Store Details</div>
							<form method="POST" use:enhance action="?/updateStore">
								<Input id={'s-name'}
									name={'name'}
									placeholder={'Store Name...'}
									bind:value={s.name}
								/>
								<Input id={'s-cate'}
									name={'category'}
									placeholder={'Category...'}
									bind:value={s.category}
								/>
								<Input id={'s-addy'}
									name={'address'}
									placeholder={'Address...'}
									bind:value={s.address}
								/>
								<Input id={'s-city'}
									name={'city'}
									placeholder={'City...'}
									bind:value={s.city}
								/>
							</form>
						</Modal>
					</td>
					<td>
						{s.address}
					</td>
					<td class="dt-only">
						{s.city}
					</td>
					<td>
						<div class="flex justify-center">
							{#if $appState.myStore && $appState.myStore.id === s.id}
								<button class="btn btn-info btn-disabled btn-xs w-full mb-2" on:click={() => selectStore(s)}>Selected</button>
							{:else}
								<button class="btn btn-info btn-xs w-full mb-2" on:click={() => selectStore(s)}>Select</button>
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

<style>
	.reset {
		--unit: 0;
	}
	td {
		padding: 0 0.5rem;
	}
</style>
