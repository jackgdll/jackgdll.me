<script module lang="ts">
	import { Context } from 'runed';

	export const themes = ['light', 'dark', 'system'] as const;
	export type Theme = (typeof themes)[number];
	export const themeContext = new Context<{ current: Theme; readonly isDark: boolean }>('theme');
</script>

<script lang="ts">
	import { browser } from '$app/environment';
	import { useEventListener, PersistedState } from 'runed';
	import type { Snippet } from 'svelte';

	let { dark = $bindable(), children }: { dark?: boolean | undefined; children?: Snippet } =
		$props();

	const theme = new PersistedState<Theme>('theme', 'system');

	const media = browser ? window.matchMedia('(prefers-color-scheme: dark)') : null;
	let prefersDark = $state(browser && (media?.matches ?? false));

	useEventListener(
		() => media,
		'change',
		(event) => (prefersDark = event.matches),
		{ passive: true }
	);

	const isDark = $derived.by(() => {
		switch (theme.current) {
			case 'dark':
				return true;
			case 'light':
				return false;
			case 'system':
				return prefersDark;
		}
	});

	$effect(() => {
		if (isDark) {
			document.documentElement.setAttribute('data-theme', 'dark');
			dark = true;
		} else {
			document.documentElement.removeAttribute('data-theme');
			dark = false;
		}
	});

	themeContext.set({
		get current() {
			return theme.current;
		},
		set current(value: Theme) {
			theme.current = value;
		},
		get isDark() {
			return isDark;
		}
	});
</script>

{@render children?.()}
