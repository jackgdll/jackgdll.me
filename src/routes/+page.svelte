<script lang="ts">
	import { page } from '$app/state';
	import CustomCursor from '$lib/components/custom-cursor.svelte';
	import Icon from '$lib/components/icon.svelte';
	import { getPosts } from './getPosts.remote';
</script>

<header
	class="flex flex-col items-center justify-center gap-4 lowercase sm:flex-row sm:justify-start"
>
	<CustomCursor cursor="🥸" class="mt-8 sm:mb-8">
		<img
			src="https://avatars.githubusercontent.com/u/55743301"
			alt="Jack Goodall"
			class="aspect-square w-30 min-w-18 rounded-md"
		/>
	</CustomCursor>
	<h1 class="mb-2 text-3xl sm:mb-0">Jack Goodall</h1>
</header>
<p class="prose mt-0 mb-8 dark:prose-invert">
	Software engineer based in Lyon, France. <br />
	<a href="https://www.datawrapper.de">@Datawrapper</a> since 2023.
</p>

<h2 class="text-xl">Posts</h2>
<ul>
	<svelte:boundary>
		{#snippet pending()}{/snippet}
		{#each await getPosts() as item (item.guid)}
			{@const url = new URL(item.link)}
			{@const external = url.host !== page.url.host}
			{@const linkAttrs = {
				href: item.link,
				target: external ? '_blank' : undefined,
				rel: external ? 'noopener noreferrer' : undefined
			}}

			<li
				class="my-2 flex flex-col gap-4 rounded border border-slate-300 p-2 sm:flex-row dark:border-slate-700"
			>
				<a {...linkAttrs} class="flex-shrink-0">
					<img {...item.thumbnail} alt={item.title} class="w-full rounded-md sm:max-w-70" />
				</a>

				<div class="flex flex-col py-1">
					<a {...linkAttrs} class="hover:underline">
						{item.title}
						{#if external}
							<Icon
								icon="arrow-up-right-square"
								class="mb-0.5 inline-block align-middle text-gray-700 dark:text-gray-300"
								size="0.75rem"
							/>
						{/if}
					</a><br />
					<span class="mt-auto text-sm text-gray-500 dark:text-gray-400">
						{new Date(item.pubDate).toLocaleDateString(undefined, { dateStyle: 'long' })}
						{#if url.hostname === 'www.datawrapper.de'}
							<span class="text-xs">·</span> Datawrapper Blog
						{/if}
					</span>
				</div>
			</li>
		{/each}
	</svelte:boundary>
</ul>
