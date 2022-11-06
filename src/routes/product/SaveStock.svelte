<script lang="ts">
	import Input from '$lib/components/input/Input.svelte';
	import type { Product } from '$lib/model/product';
	import type { Stock } from '$lib/model/stock';
	import type { Store } from '$lib/model/store';
	import { stockStore } from '$lib/store/stock';

	export let stock: Stock = {
    storeId: '',
    productId: '',
    aisle: 0,
    level: 0,
    shelf: 0,
    price: 0,
    updated: null,
  };
  export let store: Store | undefined;
  export let product: Product | undefined;

  export const saveStock = () => {
    stockStore.saveStock(stock, store?.id || '', product?.id || '');
  }
</script>

<Input id={'s-aisle'}
	label={'aisle'}
	type={'text'}
	required={true}
	placeholder={'Aisle...'}
	bind:value={stock.aisle}
/>
<Input id={'s-shelf'}
	label={'shelf'}
	type={'text'}
	required={true}
	placeholder={'Shelf...'}
	bind:value={stock.shelf}
/>
<Input id={'s-level'}
	label={'level'}
	type={'text'}
	required={true}
	placeholder={'Level...'}
	bind:value={stock.level}
/>
<Input id={'s-price'}
	label={'price'}
	type={'text'}
	required={true}
	placeholder={'Price...'}
	bind:value={stock.price}
/>
