<script lang="ts">
	import { type Icon } from '$lib/assets/icons/index';
	import type { HTMLImgAttributes } from 'svelte/elements';

	interface Props extends Omit<HTMLImgAttributes, 'src'> {
		icon: Icon;
		size?: string;
	}
	const { icon, size = '1rem', class: className, ...restProps }: Props = $props();
</script>

<svelte:boundary>
	{#snippet pending()}{/snippet}
	{#snippet failed(error)}
		<img
			alt={icon}
			style="width: {size}; height: {size};"
			class={['not-prose', className]}
			{...restProps}
		/>
		{console.error(new Error(`failed to load icon "${icon}"`, { cause: error }))}
	{/snippet}

	<img
		src={(await import(`$lib/assets/icons/${icon}.svg`)).default}
		alt={icon}
		style="width: {size}; height: {size};"
		class={['not-prose', className]}
		{...restProps}
	/>
</svelte:boundary>
