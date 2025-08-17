import xml2js from 'xml2js';
import * as cheerio from 'cheerio';
import { prerender } from '$app/server';
import { pick } from 'es-toolkit';

export type Post = {
	title: string;
	link: string;
	pubDate: string;
	description: string;
	guid: string;
	thumbnail: Record<string, string | undefined>;
};

const EXCLUDED_DW_POSTS = ['/blog/jack-goodall-datawrapper-new-hire'];
const DW_BLOG_BASE_URL = 'https://www.datawrapper.de/blog';
const DW_BLOG_POSTS_URL = `${DW_BLOG_BASE_URL}/posts/`;
const DW_BLOG_FEED_URL = `${DW_BLOG_BASE_URL}/feed/`;

let posts: Post[] | null = null;
export const getPosts = prerender(async () => {
	if (posts) return posts;
	try {
		const [feed, meta] = await Promise.all([getRSSFeed(), getPostMeta()]);
		const items = meta
			.map(({ guid, thumbnail }) => {
				const post = feed.find((item) => item.guid === guid);
				if (!post) return null;
				return {
					...post,
					thumbnail
				};
			})
			.filter((item) => item !== null);

		posts = items;
		return items;
	} catch (err) {
		console.error('Error:', err);
		return [];
	}
});

async function getPostMeta(): Promise<Pick<Post, 'guid' | 'thumbnail'>[]> {
	const response = await fetch(DW_BLOG_POSTS_URL);
	if (!response.ok) throw new Error(`HTTP error: ${response.status}`);

	const html = await response.text();
	const $ = cheerio.load(html);
	const posts = $('.post:contains("Jack")')
		.map(function () {
			return $(this).find('a').first();
		})
		.filter((_, el) => !EXCLUDED_DW_POSTS.includes(el.attr('href') || ''));

	const guids = posts
		.map((_, el) => el.attr('href'))
		.get()
		.map((href) => new URL(href, DW_BLOG_BASE_URL).href);

	const thumbnails = posts
		.get()
		.map((el) =>
			pick(el.find('img').attr() ?? {}, [
				'src',
				'srcset',
				'layout',
				'breakpoints',
				'aspectratio',
				'loading',
				'decoding',
				'sizes'
			])
		);

	return guids.map((guid, i) => ({
		guid,
		thumbnail: thumbnails[i]
	}));
}

type RSSPost = {
	[K in keyof Post]: [Post[K]];
};

async function getRSSFeed(): Promise<Omit<Post, 'thumbnail'>[]> {
	const response = await fetch(DW_BLOG_FEED_URL);
	if (!response.ok) throw new Error(`HTTP error: ${response.status}`);

	const xmlText = await response.text();
	const parsed = await xml2js.parseStringPromise(xmlText);

	return (parsed.rss.channel[0].item as RSSPost[]).map((item) => ({
		title: item.title?.[0],
		link: item.link?.[0],
		pubDate: item.pubDate?.[0],
		description: item.description?.[0],
		guid: item.guid?.[0]
	}));
}
