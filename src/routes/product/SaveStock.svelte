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
    updated: undefined,
  };
  export let store: Store | undefined;
  export let product: Product | undefined;

  export const saveStock = () => {
    stockStore.saveStock(stock, store?.id || '', product?.id || '');
  }
</script>

<div class="sr-only">
	<Input id={'s-storeId'}
		name="storeId"
		label={'storeId'}
		type={'text'}
		required={true}
		placeholder={'storeId...'}
		value={store?.id}
	/>
	<Input id={'s-productId'}
		name="productId"
		label={'productId'}
		type={'text'}
		required={true}
		placeholder={'productId...'}
		value={product?.id}
	/>
</div>
<Input id={'s-aisle'}
	name="aisle"
	label={'aisle'}
	type={'text'}
	required={true}
	placeholder={'Aisle...'}
	value={stock.aisle ?? ''}
/>
<Input id={'s-shelf'}
	name="shelf"
	label={'shelf'}
	type={'text'}
	required={true}
	placeholder={'Shelf...'}
	value={stock.shelf ?? ''}
/>
<Input id={'s-level'}
	name="level"
	label={'level'}
	type={'text'}
	required={true}
	placeholder={'Level...'}
	value={stock.level ?? ''}
/>
<Input id={'s-price'}
	name="price"
	label={'price'}
	type={'text'}
	required={true}
	placeholder={'Price...'}
	value={stock.price ?? ''}
/>
