<script lang="ts">
	import { browser } from '$app/environment';
	import { theme } from '$lib/store/theme';
	import { getContext } from 'svelte';
	import Link from './Link.svelte';
	import { isBreakpoint, type MediaContext } from '@artesgo/holokit';

	function toggleTheme() {
		if ($theme === 'dark') {
			theme.setTheme('light');
		} else {
			theme.setTheme('dark');
		}
	}
	$: if (browser) {
		const _theme = localStorage.getItem('theme') || 'dark';
		theme.setTheme(_theme);
	}
	const media = getContext<MediaContext>('media');
	$: atLeastMobile = isBreakpoint($media).atLeastMobile();
</script>

<header class:bg-amber-400={$theme === 'light'} class:bg-neutral-900={$theme === 'dark'}>
	<nav class="tabs">
		{#if atLeastMobile}
			<div class="tab tab-lifted tab-xs md:tab-md fake-tab" class:grow={atLeastMobile} />
		{/if}
		<button class="tab tab-lifted tab-xs md:tab-md" on:click={toggleTheme}>
			<div class="sr-only">{$theme}</div>
			{#if $theme === 'dark'}
				<img class="w-5 h-5 md:w-9 md:h-9" src="moon.svg" alt="" role="presentation" />
			{:else}
				<img class="w-5 h-5 md:w-9 md:h-9" src="sun.svg" alt="" role="presentation" />
			{/if}
		</button>
		<Link prefetch href="/">Home</Link>
		<Link prefetch href="/product">Products</Link>
		<!-- create a drawer that pulls out to show the checklist while on the products page -->
		<Link href="/checklist">Checklist</Link>
		<Link href="/profile">Profile</Link>
		<!-- <a class="tab" href="/map">Map</a> -->
		<!-- <Link href="/about">About</Link> -->
		<div class="tab tab-lifted tab-xs md:tab-md fake-tab" class:grow={atLeastMobile} />
	</nav>
</header>

<style lang="scss">
	nav {
		display: flex;
		align-items: center;
		width: 100%;
	}
	header {
		padding-top: 20px;
	}
	.fake-tab {
		pointer-events: none;
	}
</style>
