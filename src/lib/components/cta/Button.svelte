<script lang="ts">
	export let style: 'primary' | 'secondary' | 'tertiary' = 'primary';
	export let type: 'button' | 'submit' | 'reset' | null | undefined = 'button';
	export let width: 'inline' | 'block' = 'block';
	export let formaction = '';
	/**
	 * @type boolean
	 */
	export let borderless = false;
	$: classes = `btn ${style} ${width} ${borderless ? 'borderless' : ''}`;
</script>

<button
	on:click
	on:focus
	on:blur
	on:mouseover
	on:mouseout
	{...$$restProps}
	{type}
	{formaction}
	class={classes}
>
	<slot />
</button>
