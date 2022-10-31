<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';
	import Button from '../cta/Button.svelte';
	export let id: string;
	export let title: string = '';
	export let closeOnBackdrop = true;
	export let triggerless = false;

	export const openModal = () => {
		updateDialog('open', true);
	};

	let open = false;
	let dispatcher = createEventDispatcher();
	function updateDialog(action: 'open' | 'cancel' | 'confirm', _open: boolean) {
		open = _open;
		dispatcher(action, { open });
	}
</script>

{#if !triggerless}
	<Button on:click={() => updateDialog('open', true)}>
		<slot name="trigger"><!-- optional fallback --></slot>
	</Button>
{/if}

{#if open}
	<div transition:fade on:click|preventDefault>
		<div
			class="dialog-backdrop"
			on:click={() => {
				if (closeOnBackdrop) updateDialog('cancel', false);
			}}
		/>
		<div class="dialogs">
			<div role="dialog" aria-labelledby={id} aria-modal="true" aria-hidden="false" class="hidden">
				<h2 {id} class="dialog-title">
					{#if $$slots.title}
						<slot name="title"><!-- optional fallback --></slot>
					{:else}
						{title}
					{/if}
				</h2>

				<div class="dialog-form">
					<slot name="modal" />
				</div>

				<div class="dialog-actions">
					<Button type={'secondary'} on:click={() => updateDialog('confirm', false)}>Save</Button>
					<!-- <button type="button" onclick="replaceDialog('dialog3', undefined, 'dialog3_close_btn')">
          Add
        </button> -->
					<Button type={'secondary'} on:click={() => updateDialog('cancel', false)}>Cancel</Button>
				</div>
			</div>
			<!-- <div id="dialog2"
         style="background: #FC0"
         role="dialog"
         aria-labelledby="dialog2_label"
         aria-describedby="dialog2_desc"
         aria-modal="true"
         class="hidden">
      <h2 id="dialog2_label" class="dialog_label">
        Verification Result
      </h2>
      <div id="dialog2_desc" class="dialog_desc">
        <p tabindex="-1" id="dialog2_para1">
          This is just a demonstration. If it were a real application, it would
          provide a message telling whether the entered address is valid.
        </p>
        <p>
          For demonstration purposes, this dialog has a lot of text. It demonstrates a
          scenario where:
        </p>
        <ul>
          <li>
            The first interactive element, the help link, is at the bottom of the dialog.
          </li>
          <li>
            If focus is placed on the first interactive element when the dialog opens, the
            validation message may not be visible.
          </li>
          <li>
            If the validation message is visible and the focus is on the help link, then
            the focus may not be visible.
          </li>
          <li>
            When the dialog opens, it is important that both:
            <ul>
              <li>
                The beginning of the text is visible so users do not have to scroll back to
                start reading.
              </li>
              <li>
                The keyboard focus always remains visible.
              </li>
            </ul>
          </li>
        </ul>
        <p>
          There are several ways to resolve this issue:
        </p>
        <ul>
          <li>
            Place an interactive element at the top of the dialog, e.g., a button or link.
          </li>
          <li>
            Make a static element focusable, e.g., the dialog title or the first block of
            text.
          </li>
        </ul>
        <p>
          Please
          <em>
            DO NOT
          </em>
          make the element with role dialog focusable!
        </p>
        <ul>
          <li>
            The larger a focusable element is, the more difficult it is to visually
            identify the location of focus, especially for users with a narrow field of view.
          </li>
          <li>
            The dialog has a visual border, so creating a clear visual indicator of focus
            when the entire dialog has focus is not very feasible.
          </li>
          <li>
            Screen readers read the label and content of focusable elements. The dialog
            contains its label and a lot of content! If a dialog like this one has focus, the
            actual focus is difficult to comprehend.
          </li>
        </ul>
        <p>
          In this dialog, the first paragraph has
          <code>
            tabindex=
            <q>
              -1
            </q>
          </code>
          . The first
          paragraph is also contained inside the element that provides the dialog description, i.e., the element that is referenced
          by
          <code>
            aria-describedby
          </code>
          . With some screen readers, this may have one negative
          but relatively insignificant side effect when the dialog opens -- the first paragraph
          may be announced twice. Nonetheless, making the first paragraph focusable and setting
          the initial focus on it is the most broadly accessible option.
        </p>
      </div>
    </div> -->
		</div>
	</div>
{/if}

<style lang="scss">
	.dialog-backdrop {
		position: fixed;
		overflow-y: auto;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background: #333;
		opacity: 0.3;
	}

	// [role="alertdialog"],
	// [role="dialog"] {
	//   box-sizing: border-box;
	//   border: 1px solid #000;
	//   background-color: #fff;
	//   min-height: 100vh;
	// }

	// [role="alertdialog"],
	[role='dialog'] {
		position: fixed;
		padding: 15px;
		top: 4rem;
		left: 50vw;
		background: var(--light-bg);
		transform: translateX(-50%);
		width: calc(100% - 40px);
		min-height: auto;
		box-shadow: 0 20px 40px rgb(0 0 0 / 12%), 0 15px 12px rgb(0 0 0 / 22%);
	}

	.dialog-actions {
		--unit: 10px;
	}
</style>
