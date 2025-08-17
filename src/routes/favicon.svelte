<script module lang="ts">
	// your script goes here
</script>

<script lang="ts">
	import faviconLight from '$lib/assets/favicon/light.svg';
	import faviconDark from '$lib/assets/favicon/dark.svg';
	import faviconLightDev from '$lib/assets/favicon/light-dev.svg';
	import faviconDarkDev from '$lib/assets/favicon/dark-dev.svg';
	import { dev } from '$app/environment';

	let { dark }: { dark: boolean } = $props();

	const icon = $derived.by(() => {
		if (dev) {
			return dark ? faviconDarkDev : faviconLightDev;
		}
		return dark ? faviconDark : faviconLight;
	});
</script>

<link rel="icon" href={icon} />
