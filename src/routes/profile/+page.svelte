<script lang='ts'>
	import { userFacade } from '$lib/store/user.facade';
	import type { ActionData } from './$types';
	import { enhance } from '$app/forms';
	import { slide } from 'svelte/transition';
	import { onMount } from 'svelte';
	import type { Session } from '@supabase/supabase-js';
	import Input from '$lib/components/input/Input.svelte';
	import Button from '$lib/components/cta/Button.svelte';
	export let form: ActionData;

	let signup = false;
	let match = false;
	let confirmPw = '';
	let saveEmail = false;
	let pw = '';
	let checkEmail = false;
	$: if (form?.user) {
		pw = '';
		if (form?.displayName) {
			userFacade.updateUser(form.user);
		} else if (form?.session) {
			userFacade.loggedIn(form.session as Session);
		} else {
			checkEmail = true;
		}
	}

	function save() {
		if (saveEmail) {
			localStorage.setItem('email', $userFacade.email);
			localStorage.setItem('saveEmail', 'true');
		} else {
			localStorage.removeItem('email');
			localStorage.removeItem('saveEmail');
		}
	}

	onMount(() => {
		$userFacade.email = localStorage.getItem('email') || '';
		saveEmail = localStorage.getItem('saveEmail') === 'true';
	});
</script>

<svelte:head>
	<title>Profile</title>
</svelte:head>

<div class='narrow-page'>
	{#if checkEmail}
		Check your email to confirm your signup! &lt;3
	{:else}
		<form method='POST' use:enhance action='?/login'>
			{#if !!$userFacade.user}
				{#if $userFacade.user.user_metadata.displayName}
					<h2>
						Welcome {$userFacade.user.user_metadata.displayName}
					</h2>
				{:else}
					<div>Set your username before you can </div>
				{/if}
				<div class='join w-full'>
					<Input join id="displayName" name='displayName' placeholder='Display Name' value={$userFacade.user.user_metadata.displayName} />
					<Button class="join-item btn btn-warning w-1/2" type='submit' formaction='?/displayName'>Update Display Name</Button>
				</div>
				<div class='join w-full'>
					<Button class="join-item btn btn-success w-1/2"
						on:click={userFacade.loggedout} type='submit'
						formaction='?/logout'
					>Sign Out</Button>
				</div>
			{:else}
				<div class='join w-full'>
					<Input join id="email" name='email' placeholder='Email' bind:value={$userFacade.email} />
					<label class='input input-success join-item w-1/2 flex items-center'>
						<input class="checkbox checkbox-success mr-4" id="saveLogin" type="checkbox" bind:checked={saveEmail} on:change={save} />
						Save Email
					</label>
				</div>
				<div class='join w-full'>
					<Input join id="pw" name='password' placeholder='Password' bind:value={pw} />
					<button class="join-item btn btn-success w-1/2" type='submit'>Sign In</button>
				</div>
				<h2>Don't have an account?</h2>
				<div class='join w-full'>
					<Button class="join-item btn btn-warning w-1/2" type='submit' formaction='?/register'>Register</Button>
					<a href="/profile/recovery" class="join-item btn btn-success w-1/2">
						<Button>
							Forgot Password
						</Button>
					</a>
				</div>
			{/if}
		</form>
	{/if}
</div>