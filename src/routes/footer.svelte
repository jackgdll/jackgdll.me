<script lang="ts">
	import Icon from '$lib/components/icon.svelte';

	const links = [
		{ href: 'https://github.com/jackgdll', icon: 'github', label: 'GitHub' },
		{ href: 'https://www.linkedin.com/in/jackgoodall', icon: 'linkedin', label: 'LinkedIn' }
	] as const;
</script>

<footer class="mt-15 text-right text-gray-400">
	<p class="mb-0 inline-flex items-center gap-2">
		{#each links as link, i (link.href)}
			<a href={link.href}>
				<Icon icon={link.icon} desc={link.label} size="1.5rem" />
			</a>
			{#if i < links.length - 1}
				<span class="text-xs">⚫︎</span>
			{/if}
		{/each}
	</p>

	<p>
		&copy; {new Date().getFullYear()} Jack Goodall.
	</p>
</footer>
