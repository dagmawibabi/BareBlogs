<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import config from '../lib/config.json';
	import { SunIcon, MoonIcon } from 'lucide-svelte';
	import { toggleMode } from 'mode-watcher';
</script>

<svelte:head>
	<title>{config.name}</title>
</svelte:head>

<div
	class="no-scrollbar relative mx-auto flex h-screen w-[96%] items-center justify-center pt-4 md:w-2/5"
>
	<div class="flex flex-col gap-y-2">
		<div class="flex items-center justify-between">
			<div class="text-xl font-semibold">BareBlogs</div>

			<Button onclick={toggleMode} variant="ghost" size="icon">
				<SunIcon
					class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 !transition-all dark:-rotate-90 dark:scale-0"
				/>
				<MoonIcon
					class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 !transition-all dark:rotate-0 dark:scale-100"
				/>
				<span class="sr-only">Toggle theme</span>
			</Button>
		</div>
		<div class="pb-5">
			This is one of the quickest ways to create and setup a blog site. All you have to do is fork
			<a href="https://github.com/dagmawibabi/bareblogs" target="_blank" class="text-blue-600"
				>this repository
			</a>
			and deploy it to a hosting provider like
			<a href="https://www.vercel.com" target="_blank" class="text-blue-600">Vercel</a>. This
			project is completely open-source and free to use. It's also very easy and straightforward to
			configure, use and customize. You will find a sample blog profile and guide on how to
			configure and customize the blog site in the next page.
		</div>
		<div class="pb-5">
			The project is built using <a href="https://svelte.dev" target="_blank" class="text-blue-600"
				>SvelteKit</a
			>
			and
			<a href="https://tailwindcss.com" target="_blank" class="text-blue-600">TailwindCSS</a>
			with a few
			<a href="https://www.shadcn-svelte.com" target="_blank" class="text-blue-600">ShadCN</a> components.
			It has dark and light mode support and is responsive. You can simply write your blog posts in markdown,
			add a few metadata and the site will automatically add it to the feed, categorize it in the appropriate
			category and add your tags for quick navigations.
		</div>
		<div class="pb-5">
			If this is your first time dealing with Markdown, I recommend you checkout this <a
				href="https://www.markdownguide.org/"
				target="_blank"
				class="text-blue-600">introduction to Markdown</a
			>
			and then checking out
			<a href="https://commonmark.org/help" target="_blank" class="text-blue-600">
				this cheatsheet</a
			> for the syntax. Enjoy writing and consider starring the repo!
		</div>
		<Button href="https://github.com/dagmawibabi/bareblogs" target="_blank" variant="secondary"
			>Clone Repository</Button
		>
		<Button class="bg-emerald-500 text-black hover:bg-emerald-400" href="/write">Write Blog</Button>
		<Button href="/blog">Goto Blogs</Button>
	</div>
</div>
