<script lang="ts">
	export let type: 'button' | 'submit' | 'reset' | null | undefined = 'button';
	export let formaction = '';
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
>
	<slot />
</button>
