<script lang='ts'>
	import { userFacade } from '$lib/store/user.facade';
	import type { ActionData } from './$types';
	import { enhance } from '$app/forms';
	import { slide } from 'svelte/transition';
	import { onMount } from 'svelte';
	import type { Session } from '@supabase/supabase-js';
	import { Button, Card, Checkbox, Input, Password } from '@artesgo/holokit';
	export let form: ActionData;

	let signup = false;
	let match = false;
	let confirmPw = '';
	let saveEmail = false;
	let pw = '';
	let checkEmail = false;
	$: if (form?.user) {
		if (form?.displayName) {
			userFacade.updateUser(form.user);
		} else if (form?.session) {
			userFacade.loggedIn(form.session as Session);
		} else {
			checkEmail = true;
		}
	}

	function checkError() {
		match = confirmPw !== '' && confirmPw === pw;
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
	<Card>
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
						Set your username before you create your own tabs
					{/if}
					<Input theme="info" name='displayName' placeholder='Display Name' value={$userFacade.user.user_metadata.displayName} />
					<Button type='submit' formaction='?/displayName'>Update Display Name</Button>
					<Button
						theme="warning"
						on:click={userFacade.loggedout} type='submit'
						formaction='?/logout'
					>Sign Out</Button>
				{:else}
					<Input theme="info" name='email' placeholder='Email' bind:value={$userFacade.email} />
					<Password theme="info" name='password' placeholder='Password' bind:value={pw} />
					{#if signup}
						<Password
							on:change={checkError}
							bind:value={confirmPw}
							placeholder='Confirm Password'
						/>
						{#if !match}
							<div transition:slide>Password Confirmation Mismatch.</div>
						{/if}
					{/if}
					<Checkbox id="saveLogin" reverse bind:checked={saveEmail} on:change={save}>Save Login</Checkbox>
					<Checkbox id="signup" reverse bind:checked={signup}>Signup</Checkbox>
					{#if signup}
						<Button theme="info" type='submit' formaction='?/register'>Register</Button>
					{:else}
						<Button theme="info" type='submit'>Sign In</Button>
					{/if}

					<a href="/profile/recovery">
						<Button theme="info" >
							Forgot Password
						</Button>
					</a>
				{/if}
			</form>
		{/if}
	</Card>
</div>