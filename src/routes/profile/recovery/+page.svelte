<script>
	import { enhance } from '$app/forms';
	import Input from '$lib/components/input/Input.svelte';
</script>

<form method="POST" use:enhance class="mx-auto w-full join">
	<Input join id="email" name="email" placeholder="Email" value=''>Email</Input>
	<button class="join-item btn btn-success w-1/2" type="submit">Send Recovery Email</button>
</form>
