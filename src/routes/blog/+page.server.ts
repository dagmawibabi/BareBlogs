import type { PageServerLoad } from './$types';
import fm from 'front-matter';

export const load: PageServerLoad = async () => {
	const files = import.meta.glob('/static/blogs/*.md', {
		query: '?raw',
		import: 'default',
		eager: true
	});

	const blogs = Object.entries(files)
		.map(([path, raw]) => {
			interface FrontMatter {
				title?: string;
				date?: string;
				description?: string;
				category?: string;
			}
			const { attributes } = fm<FrontMatter>(raw as string);
			const data = attributes;
			const slug = path.split('/').pop()?.replace('.md', '') ?? '';
			return {
				slug,
				title: data.title || slug,
				date: data.date || null,
				description: data.description || '',
				category: data.category || 'Uncategorized'
			};
		})
		.sort((a, b) => {
			const dateA = a.date ? new Date(a.date) : new Date(0);
			const dateB = b.date ? new Date(b.date) : new Date(0);
			return dateB.getTime() - dateA.getTime();
		});

	const grouped: Record<string, typeof blogs> = {};
	for (const blog of blogs) {
		if (!grouped[blog.category]) grouped[blog.category] = [];
		grouped[blog.category].push(blog);
	}

	return { grouped };
};
