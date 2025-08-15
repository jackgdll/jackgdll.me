<script lang="ts">
	import '../app.css';
	import '@fontsource/aldrich';
	import favicon from '$lib/assets/favicon.svg';
	import Footer from './footer.svelte';
	import ThemeSwitcher from '$lib/components/theme-switcher.svelte';
	import ThemeContext from '$lib/contexts/theme-context.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<ThemeContext>
	<ThemeSwitcher class="fixed top-4 right-4 z-50" />

	<section class="mx-auto mt-8 w-2xl px-8">
		{@render children?.()}
		<Footer />
	</section>
</ThemeContext>
