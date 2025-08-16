<script lang="ts">
	import '../app.css';
	import '@fontsource/aldrich';
	import faviconLight from '$lib/assets/favicon-light.svg';
	import faviconDark from '$lib/assets/favicon-dark.svg';
	import Footer from './footer.svelte';
	import ThemeSwitcher from '$lib/components/theme-switcher.svelte';
	import ThemeContext from '$lib/contexts/theme-context.svelte';

	let { children } = $props();

	let dark = $state<boolean>();
</script>

<svelte:head>
	<link rel="icon" href={dark ? faviconDark : faviconLight} />
	<title>jack goodall</title>
</svelte:head>

<ThemeContext bind:dark>
	<ThemeSwitcher class="fixed top-4 right-4 z-50" />

	<section class="mx-auto mt-8 w-2xl max-w-screen px-8">
		{@render children?.()}
		<Footer />
	</section>
</ThemeContext>
