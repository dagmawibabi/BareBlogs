<script lang="ts">
	import BlogHeader from '../../../components/blog_header.svelte';
	type BlogData = {
		content: string;
		meta: {
			title: string;
			date: string;
			description: string;
			category: string;
		};
	};

	export let data: BlogData;
</script>

<svelte:head>
	<title>{data.meta.title}</title>
</svelte:head>

<div
	class="no-scrollbar relative mx-auto w-[96%] pb-56 pt-4 md:w-[96%] lg:w-1/2 xl:w-1/2 2xl:w-1/2"
>
	<!-- Header -->
	<div class="sticky top-0 mb-3 bg-white dark:bg-zinc-950">
		<BlogHeader showDescription={false} link="/blog" />
	</div>

	<!-- Metadata -->
	<div class="flex text-sm italic md:hidden">
		{new Date(data.meta.date).toDateString()}
	</div>
	<div class="flex items-center justify-between pb-2">
		<div
			class="prose prose-h1:text-2xl prose-h1:font-semibold dark:text-white dark:prose-headings:text-white"
		>
			<h1>{data.meta.title}</h1>
		</div>
		<div class="hidden text-sm italic dark:text-neutral-400 md:flex">
			{new Date(data.meta.date).toDateString()}
		</div>
	</div>

	<!-- Content -->
	<div
		class="prose min-w-full prose-h1:text-2xl prose-h1:font-semibold prose-h2:text-xl prose-h2:font-semibold prose-h3:text-lg prose-h3:font-semibold prose-code:rounded-l prose-code:bg-neutral-100 prose-code:text-red-500 prose-pre:whitespace-pre-wrap prose-pre:break-all prose-pre:bg-neutral-100 prose-pre:font-mono prose-pre:text-black prose-img:my-0 prose-img:py-0 dark:text-white dark:prose-headings:text-white dark:prose-a:text-blue-500 dark:prose-blockquote:text-neutral-300 dark:prose-strong:text-white dark:prose-code:bg-neutral-900 dark:prose-code:text-orange-500 dark:prose-pre:bg-neutral-900 dark:prose-ol:text-white dark:prose-ul:text-white dark:prose-li:text-white"
	>
		{@html data.content}
	</div>
</div>
