<script lang="ts">
	import Required from './Required.svelte';

	export let id: string;
	export let name: string;
	export let value: string | number | undefined;
	export let label = '';
	export let join = false;
	export let full = false;
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
	$: _class = full ? 'w-full' : 'w-1/2';
</script>

<label {...$$restProps} for={id}
	class:join-item={join}
	class="input input-success mb-2 flex items-center {_class}">
	<span class="sr-only">{label}</span>
	{#if required}
		<Required />
	{/if}
	<input class="px-4" {...props} bind:value />
</label>

<style lang="scss">
	input {
		width: 100%;
    height: 100%;
		background: transparent;
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
