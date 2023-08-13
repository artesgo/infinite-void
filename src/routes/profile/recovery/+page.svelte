<script>
	import { enhance } from '$app/forms';
	import { Button, Input } from 'artesgo-holokit';
</script>

<div class="narrow-page">
	<form method="POST" use:enhance>
		<Input id="email" name="email" placeholder="Email">Email</Input>
		<Button type="submit">Send Recovery Email</Button>
	</form>
</div>
