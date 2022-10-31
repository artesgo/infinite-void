<script lang="ts">
	export let type: 'primary' | 'secondary' | 'tertiary' = 'primary';
	export let width: 'inline' | 'block' = 'block';
	$: classes = `${type} ${width}`;
</script>

<button
  on:click
  on:focus
  on:blur
  on:mouseover
  on:mouseout
  type="button"
  class={classes}>
  <slot />
</button>

<style lang="scss">
	button {
		background: none;
		padding: 0 10px;
		cursor: pointer;
		white-space: nowrap;

		color: var(--fg);
		background-color: var(--light-bg);
		transition: var(--animLength);
		height: var(--controlHeight);
		margin-bottom: var(--unit);

		&.primary {
			border: 1px solid var(--bg);
		}
		&.secondary {
			background-color: var(--bg);
			border: 1px solid var(--light-fg);
		}
		&.block {
			display: block;
			width: 100%;
		}
	}
</style>
