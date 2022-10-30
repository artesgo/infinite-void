<script lang="ts">
	import Input from "$lib/components/input/Input.svelte";
	import type { Stock } from "$lib/model/stock";
  export let stock: Stock;
  // TODO: emit stock on change
</script>

<Input id={'s-aisle'} label={'aisle'} type={'text'} required={true}
  placeholder={'Aisle'} bind:value={stock.aisle} />
<Input id={'s-shelf'} label={'shelf'} type={'text'} required={true}
  placeholder={'Shelf'} bind:value={stock.shelf} />
<Input id={'s-level'} label={'level'} type={'text'} required={true}
  placeholder={'Level'} bind:value={stock.level} />
<Input id={'s-price'} label={'price'} type={'text'} required={true}
  placeholder={'Price'} bind:value={stock.price} />