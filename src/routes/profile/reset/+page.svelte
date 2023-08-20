<script>
	import { enhance } from "$app/forms";
	import { Button, Password } from "@artesgo/holokit";
    let password = '';
    let confirm = '';
    $: match = password === confirm;
</script>

<div class='narrow-page'>
    <form method='POST' use:enhance>
        <Password id="password" name="password" bind:value={password}>Password</Password>
        <Password id="confirm" bind:value={confirm}>Confirmation</Password>
        <div>
            {#if !match}
                Password confirmation does not match.
            {/if}
        </div>
        <Button type="submit">Reset Password</Button>
    </form>
</div>