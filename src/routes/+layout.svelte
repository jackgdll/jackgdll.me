<script lang="ts">
	import '../app.css';
	import '@fontsource/aldrich';
	import favicon from '$lib/assets/favicon.svg';
	import Footer from './footer.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<section class="mx-auto prose mt-8">
	{@render children?.()}
	<Footer />
</section>
