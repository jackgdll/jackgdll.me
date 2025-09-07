<script lang="ts">
	import { page } from '$app/state';
	import CustomCursor from '$lib/components/custom-cursor.svelte';
	import Icon from '$lib/components/icon.svelte';
	import Socials from '$lib/components/socials.svelte';
	import Backdrop from './backdrop.svelte';
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
	<div class="mb-2 flex flex-1 items-center gap-4 sm:mb-0">
		<h1 class="mr-auto text-3xl">Jack Goodall</h1>
		<Socials class="mb-1" />
	</div>
</header>
<p class="prose mt-0 mb-8 dark:prose-invert">
	Software engineer based in Lyon, France. <br />
	<a href="https://www.datawrapper.de">@Datawrapper</a> since 2023.
</p>

<Backdrop />

<h2 class="text-xl">Posts</h2>
<ul>
	<svelte:boundary>
		{#snippet pending()}{/snippet}
		{#each await getPosts() as item (item.guid)}
			{@const url = new URL(item.link)}
			{@const external = url.host !== page.url.host}

			<li
				class="my-3 flex flex-col gap-4 rounded border-slate-300 bg-neutral-50 p-2 shadow-sm sm:flex-row dark:bg-zinc-950"
			>
				<a href={item.link} class="flex-shrink-0">
					<img {...item.thumbnail} alt={item.title} class="w-full rounded-md sm:max-w-70" />
				</a>

				<div class="flex flex-col py-1">
					<a href={item.link} class="group hover:underline">
						{item.title}
						{#if external}
							<Icon
								icon="arrow-up-right-square"
								class="mb-0.5 inline-block align-middle text-gray-700 group-hover:text-inherit dark:text-gray-300"
								size="0.75rem"
								desc="External link"
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
