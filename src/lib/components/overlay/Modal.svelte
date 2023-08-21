<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Button from '../cta/Button.svelte';
	import { gfade } from '@artesgo/holokit';
	export let id: string;
	export let title: string = '';
	export let closeOnBackdrop = true;
  export let open = false;

	export const openModal = () => {
		updateDialog('open', true);
	};

	let dispatcher = createEventDispatcher();
	export function updateDialog(action: 'open' | 'cancel' | 'confirm', _open: boolean) {
		open = _open;
		dispatcher(action, { open });
	}
</script>

{#if open}
	<dialog class="modal" transition:gfade>
		<button
			class="modal-backdrop"
			on:click={() => {
				if (closeOnBackdrop) updateDialog('cancel', false);
			}}
		>Close Modal</button>
		<div class="modal-box">
			<div role="dialog" aria-labelledby={id} aria-modal="true" aria-hidden="false" class="hidden">
				<h1 {id} class="dialog-title">
					{#if $$slots.header}
						<slot name="header"><!-- optional fallback --></slot>
					{:else}
						{title}
					{/if}
				</h1>

				<div class="dialog-form">
					<slot name="modal" />
				</div>

				<div class="modal-action">
          {#if !$$slots.actions}
					  <Button style={'secondary'} on:click={() => updateDialog('confirm', false)}>Save</Button>
            <Button style={'secondary'} on:click={() => updateDialog('cancel', false)}>Cancel</Button>
             <!-- content here -->
          {/if}
					<slot name="actions" />
				</div>
			</div>
		</div>
	</dialog>
{/if}

