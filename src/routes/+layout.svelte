<script lang="ts">
	import '../app.css';
	import '@fontsource/aldrich';
	import faviconLight from '$lib/assets/favicon-light.svg';
	import faviconDark from '$lib/assets/favicon-dark.svg';
	import ThemeSwitcher from '$lib/components/theme-switcher.svelte';
	import ThemeContext from '$lib/contexts/theme-context.svelte';
	import Socials from '$lib/components/socials.svelte';

	let { children } = $props();

	let dark = $state<boolean>();
</script>

<svelte:head>
	<link rel="icon" href={dark ? faviconDark : faviconLight} />
	<title>jack goodall</title>
</svelte:head>

<ThemeContext bind:dark>
	<ThemeSwitcher class="fixed top-4 right-4 z-50" />

	<section class="mx-auto mt-8 w-3xl max-w-screen px-4">
		{@render children?.()}

		<footer class="mt-15 mb-7 text-right text-gray-400">
			<Socials />

			<p>
				&copy; {new Date().getFullYear()} Jack Goodall.
			</p>
		</footer>
	</section>
</ThemeContext>
