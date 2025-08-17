<script lang="ts">
	import '../app.css';
	import '@fontsource/aldrich';
	import ThemeSwitcher from '$lib/components/theme-switcher.svelte';
	import ThemeContext from '$lib/contexts/theme-context.svelte';
	import Socials from '$lib/components/socials.svelte';
	import Favicon from './favicon.svelte';

	let { children } = $props();

	let dark = $state(false);
</script>

<svelte:head>
	<Favicon {dark} />
	<title>jack goodall</title>
</svelte:head>

<ThemeContext bind:dark>
	<ThemeSwitcher class="fixed top-4 right-4 z-50" />

	<section class="mx-auto mt-8 w-3xl max-w-screen px-4">
		{@render children?.()}

		<footer class="mt-15 mb-7 text-right text-gray-400">
			<Socials />

			<p>
				&copy; {new Date().getFullYear()} Jack Goodall
			</p>
		</footer>
	</section>
</ThemeContext>
