<script lang="ts">
	import Required from './Required.svelte';

	export let id: string;
	export let name: string;
	export let value: string | number | undefined;
	export let label = '';
	export let required = false;
	export let placeholder = 'placeholder';
	export let pattern = '.*';
	export let autocomplete: 'on' | 'off' = 'off';
	$: props = {
		id,
		required,
		placeholder,
		pattern,
		autocomplete,
		name
	};
</script>

<label {...$$restProps} for={id} class="join-item input input-success mb-2 w-1/2 flex items-center">
	<span class="sr-only">{label}</span>
	{#if required}
		<Required />
	{/if}
	<input class="px-4 input-success" {...props} bind:value />
</label>

<style lang="scss">
	input {
		width: 100%;
    height: 100%;
	}
  input:focus {
    outline-offset: 3px;
    z-index: 1;
    outline-color: rgb(54, 211, 153);
  }
	label {
		padding: 0;
	}
</style>
