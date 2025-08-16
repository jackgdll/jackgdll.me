<script lang="ts">
	import { themeContext, themes, type Theme } from '$lib/contexts/theme-context.svelte';
	import Icon from './icon.svelte';

	const theme = themeContext.get();

	const { class: clazz }: { class?: string } = $props();

	function getNextTheme(current: Theme): Theme {
		return themes[(themes.indexOf(current) + 1) % themes.length];
	}

	const iconMap = {
		light: 'sun',
		dark: 'moon',
		system: 'laptop'
	} as const;
</script>

<button
	onclick={() => (theme.current = getNextTheme(theme.current))}
	class={['cursor-pointer rounded border border-gray-400 p-2', clazz]}
>
	<Icon icon={iconMap[theme.current]} size="1.5rem" />
</button>
