<script lang="ts">
	import { icons, type Icon } from '$lib/assets/icons/index';
	import { themeContext } from '$lib/contexts/theme-context.svelte';

	const theme = themeContext.getOr({ isDark: false });

	interface Props {
		icon: Icon;
		color?: string;
		size?: string;
		desc?: string;
	}
	const { icon, size = '1rem', color = 'currentColor', desc }: Props = $props();

	const hasDarkVariant = $derived(icons.includes((icon + '-dark') as Icon));
	const iconName = $derived(theme.isDark && hasDarkVariant ? `${icon}-dark` : icon);

	async function loadSvg() {
		try {
			let svg = (await import(`$lib/assets/icons/${iconName}.svg?raw`)).default;

			if (desc) {
				svg = svg.replace(
					/<svg([^>]*)>/,
					desc ? `<svg$1 role="img" aria-label="${desc}">` : `<svg$1  aria-hidden="true">`
				);
			}

			return svg;
		} catch (error) {
			console.error(new Error(`failed to load icon "${iconName}"`, { cause: error }));
			return '';
		}
	}
</script>

<svelte:boundary>
	{#snippet pending()}{/snippet}

	<span class="icon" style:--icon-size={size} style:color>
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		{@html await loadSvg()}
	</span>
</svelte:boundary>

<style>
	.icon :global(svg) {
		width: var(--icon-size, 1rem);
		height: var(--icon-size, 1rem);
	}
</style>
