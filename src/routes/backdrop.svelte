<script module lang="ts">
	import elevationData from './elevation_data.json';
	const data = elevationData;

	const longitudes = Object.keys(data).map(Number);
	const latitudes = Object.values(data)
		.flatMap((i) => i.flatMap((i) => i.latitude))
		.map(Number);
	const elevations = Object.values(data)
		.flatMap((i) => i.flatMap((i) => i.elevation))
		.map(Number);

	const minLon = Math.min(...longitudes);
	const maxLon = Math.max(...longitudes);
	const minLat = Math.min(...latitudes);
	const maxLat = Math.max(...latitudes);
	const minEle = Math.min(...elevations);
	const maxEle = Math.max(...elevations);
</script>

<script lang="ts">
	import { themeContext } from '$lib/contexts/theme-context.svelte';
	import { useEventListener } from 'runed';
	import { browser } from '$app/environment';

	const theme = themeContext.get();

	function eleToColor(elevation: number): string {
		const land = theme.isDark ? '255, 255, 255, 0.15' : '0, 0, 0, 0.15';
		const sea = theme.isDark ? '100, 130, 150, 0.075' : '100, 130, 150, 0.075';
		return `rgba(${elevation > 0 ? land : sea})`;
	}

	let scrollY = $state(0);
	let scrollHeight = $state(0);
	let innerHeight = $state(0);

	const scrollProgress = $derived(
		Math.min(scrollHeight > innerHeight ? scrollY / (scrollHeight - innerHeight) : 0, 1)
	);
	const aspectRatio = $derived(`${maxLon - minLon} / ${maxLat - minLat}`);

	// Calculate proper viewbox dimensions based on data range
	const viewboxWidth = $derived(100);
	const viewboxHeight = $derived(Math.floor(100 * ((maxLat - minLat) / (maxLon - minLon))));

	function lonToX(lon: number): number {
		return ((lon - minLon) / (maxLon - minLon)) * viewboxWidth;
	}

	function latToY(lat: number): number {
		return viewboxHeight - ((lat - minLat) / (maxLat - minLat)) * viewboxHeight;
	}

	function eleToOffset(ele: number): number {
		return ((ele - minEle) / (maxEle - minEle) - 0.5) * 5;
	}

	useEventListener(
		() => (browser ? window.document : null),
		'scroll',
		() => (scrollHeight = window.document.body.scrollHeight),
		{ passive: true }
	);
</script>

<svelte:window bind:scrollY bind:innerHeight />

<div class="fixed top-0 left-0 -z-50 h-screen min-w-screen overflow-hidden">
	<svg
		class="min-w-screen"
		style:aspect-ratio={aspectRatio}
		style:transform="translateX(calc(-1 * {scrollProgress} * (100% - 100vw)))"
		style:height="max(100vh, calc((1 / ({aspectRatio})) * 100vw))"
		viewBox="0 {eleToOffset(minEle)} {viewboxWidth} {viewboxHeight + eleToOffset(minEle)}"
		preserveAspectRatio="xMinYMin meet"
	>
		{#each Object.entries(data) as [lon, values] (lon)}
			<g>
				{#each values as { latitude, elevation }, i (`${lon}${latitude}${i}`)}
					<circle
						cx={lonToX(Number(lon))}
						cy={latToY(latitude) + eleToOffset(elevation)}
						r="0.1"
						fill={eleToColor(elevation)}
					/>
				{/each}
			</g>
		{/each}
	</svg>
</div>
