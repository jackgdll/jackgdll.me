<script lang="ts">
	import Icon from '$lib/components/icon.svelte';

	const { class: clazz }: { class?: string } = $props();

	const links = [
		{ href: 'https://github.com/jackgdll', icon: 'github', label: 'GitHub' },
		{ href: 'https://www.linkedin.com/in/jackgoodall', icon: 'linkedin', label: 'LinkedIn' }
	] as const;
</script>

<p class={['mb-0 inline-flex items-center gap-2', clazz]}>
	{#each links as link, i (link.href)}
		<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
		<a href={link.href}>
			<Icon icon={link.icon} desc={link.label} size="1.5rem" />
		</a>
		{#if i < links.length - 1}
			<span class="text-xs">·</span>
		{/if}
	{/each}
</p>
