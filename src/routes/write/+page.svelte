<script lang="ts">
	// import Button from '$lib/components/ui/button/button.svelte';
	import { Toaster, toast } from 'svelte-sonner';
	import { SunIcon, MoonIcon, Save } from 'lucide-svelte';
	import { toggleMode } from 'mode-watcher';
	import { remark } from 'remark';
	import remarkParse from 'remark-parse';
	import remarkRehype from 'remark-rehype';
	import rehypeKatex from 'rehype-katex';
	import rehypeHighlight from 'rehype-highlight';
	import rehypeSanitize from 'rehype-sanitize';
	import rehypeStringify from 'rehype-stringify';
	import 'highlight.js/styles/github-dark.css';

	import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { goto } from '$app/navigation';

	let content = $state();
	let processed = $state();
	async function processMD() {
		processed = await remark()
			.use(remarkParse)
			.use(remarkRehype)
			.use(rehypeKatex)
			.use(rehypeHighlight)
			.use(rehypeSanitize)
			.use(rehypeStringify)
			.process(content);
	}

	async function saveMarkdown(e: SubmitEvent) {
		e.preventDefault();

		const form = e.currentTarget as HTMLFormElement;
		const formData = new FormData(form);

		// Extract values from form
		const title = formData.get('title') as string;
		const description = formData.get('description') as string;
		const date = formData.get('date') as string;
		const category = formData.get('category') as string;

		// 1. Create the YAML Frontmatter + Content
		const fileContent = `---
title: "${title}"
description: "${description}"
date: "${date}"
category: "${category}"
---

${content}`;

		// 2. Generate the safe filename
		const filename = title
			.toLowerCase()
			.replace(/[^a-z0-9]+/g, '-')
			.replace(/(^-|-$)+/g, '');

		try {
			// 3. Send the data to our API route
			const response = await fetch('/api/save-blog', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ filename, fileContent })
			});

			if (response.ok) {
				// Optional: Close the dialog or show a success toast here
				toast.success(`Saved: ${filename}.md`);
				isDialogOpen = false;
				goto(`/blog/${filename}`);
			} else {
				const err = await response.json();
				toast.error(`Error: ${err.message}`);
			}
		} catch (err) {
			alert('Failed to connect to the server');
		}
	}
	let isDialogOpen = $state(false);
</script>

<Dialog.Root bind:open={isDialogOpen}>
	<div class="no-scrollbar flex h-screen w-full overflow-scroll">
		<!-- Input -->
		<div class="no-scrollbar h-screen w-full overflow-scroll border-r-4 border-black">
			<div
				class="sticky top-0 flex items-center justify-between bg-neutral-900 py-3 pl-5 pr-3 font-semibold text-white"
			>
				Markdown

				<div>
					<Dialog.Trigger><Save size={20} /></Dialog.Trigger>
				</div>
			</div>
			<div>
				<textarea
					class="h-full w-full p-4"
					rows="200"
					bind:value={content}
					oninput={() => processMD()}
					placeholder="Write your blog here"
				></textarea>
			</div>
		</div>

		<!-- Preview -->
		<div class="no-scrollbar h-screen w-full overflow-scroll">
			<div
				class="sticky top-0 flex items-center justify-between bg-neutral-900 py-1 pl-5 pr-1 font-semibold text-white"
			>
				Preview

				<div class="flex items-center justify-between gap-x-2">
					<Button href="/blog" class="dark:bg-neutral-900 dark:text-white">View Blogs</Button>

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
			</div>
			<div
				class="prose min-w-full p-4 prose-h1:text-2xl prose-h1:font-semibold prose-h2:text-xl prose-h2:font-semibold prose-h3:text-lg prose-h3:font-semibold prose-code:rounded-l prose-code:bg-neutral-100 prose-code:text-red-500 prose-pre:whitespace-pre-wrap prose-pre:break-all prose-pre:bg-neutral-100 prose-pre:font-mono prose-pre:text-black prose-img:my-0 prose-img:py-0 dark:text-white dark:prose-headings:text-white dark:prose-a:text-blue-500 dark:prose-blockquote:text-neutral-300 dark:prose-strong:text-white dark:prose-code:bg-neutral-900 dark:prose-code:text-orange-500 dark:prose-pre:bg-neutral-900 dark:prose-ol:text-white dark:prose-ul:text-white dark:prose-li:text-white"
			>
				{@html processed}
			</div>
		</div>
	</div>

	<Dialog.Content class="sm:max-w-[425px]">
		<form onsubmit={(e) => saveMarkdown(e)}>
			<Dialog.Header>
				<Dialog.Title>Save Blog</Dialog.Title>
				<Dialog.Description>Edit the metadata of your blog here and save.</Dialog.Description>
			</Dialog.Header>
			<div class="grid gap-4">
				<div class="grid gap-3">
					<Label for="title">Title</Label>
					<Input id="title" name="title" defaultValue="First Blog Post" />
				</div>
				<div class="grid gap-3">
					<Label for="description">Description</Label>
					<Input
						id="description"
						name="description"
						defaultValue="This is my first blog post about..."
					/>
				</div>
				<div class="grid gap-3">
					<Label for="date">Date (YYYY-MM-DD)</Label>
					<Input id="date" name="date" defaultValue="2025-12-24" />
				</div>
				<div class="grid gap-3">
					<Label for="category">Category (one word)</Label>
					<Input id="category" name="category" defaultValue="Guides" />
				</div>
			</div>
			<Dialog.Footer>
				<Dialog.Close class={buttonVariants({ variant: 'outline' })}>Cancel</Dialog.Close>
				<Button type="submit">Save changes</Button>
			</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root>

<Toaster />
