<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	interface Props extends HTMLAttributes<HTMLDivElement> {
		cursor: string | Snippet;
		children?: Snippet;
	}
	const { cursor, class: clazz, children, ...restProps }: Props = $props();

	let show = $state(false);
	let cursorPosition: { x: number; y: number } | null = $state(null);

	function onmousemove(event: MouseEvent) {
		if (!show) return;
		cursorPosition = { x: event.clientX, y: event.clientY };
	}
</script>

<div
	role="region"
	onpointerenter={() => (show = true)}
	onpointerleave={() => (show = false)}
	onmousemovecapture={onmousemove}
	class={[{ 'cursor-none': show }, clazz]}
	{...restProps}
>
	{@render children?.()}
</div>

{#if show}
	<div
		class={['fixed z-50 -translate-1/2', { 'pointer-events-none': show }]}
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
