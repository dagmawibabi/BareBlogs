import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';
import { error, json } from '@sveltejs/kit';

export const POST = async ({ request }) => {
	try {
		const { filename, fileContent } = await request.json();

		// 1. Define the directory path (root/static/blogs)
		// process.cwd() points to your project root
		const dirPath = join(process.cwd(), 'static', 'blogs');

		// 2. Ensure the directory exists (prevents error if folder is missing)
		mkdirSync(dirPath, { recursive: true });

		// 3. Define the full file path
		const filePath = join(dirPath, `${filename}.md`);

		// 4. Write the file to disk
		writeFileSync(filePath, fileContent, 'utf-8');

		return json({ success: true, path: filePath });
	} catch (err) {
		console.error('File System Error:', err);
		throw error(500, 'Could not save file to disk');
	}
};
