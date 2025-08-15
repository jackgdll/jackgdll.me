<script lang="ts">
	import type { Snippet } from 'svelte';

	const { cursor, children }: { cursor: string | Snippet; children: Snippet } = $props();

	let show = $state(false);
	let cursorPosition: { x: number; y: number } | null = $state(null);

	function onmousemove(event: MouseEvent) {
		if (!show) return;
		cursorPosition = { x: event.clientX, y: event.clientY };
	}
</script>

<div
	role="region"
	onmouseenter={() => (show = true)}
	onmouseleave={() => (show = false)}
	onmousemovecapture={onmousemove}
>
	{@render children?.()}
</div>

{#if show}
	<div
		class="pointer-events-none fixed z-50 -translate-1/2"
		style:top="{cursorPosition?.y}px"
		style:left="{cursorPosition?.x}px"
	>
		{#if typeof cursor === 'string'}
			<span class="text-2xl">{cursor}</span>
		{:else}
			{@render cursor()}
		{/if}
	</div>
{/if}
