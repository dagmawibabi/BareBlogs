---
title: Getting Started
date: 2025-11-06
description: Quick start guide on how to configure this blog site to your needs. It covers the necessary steps to set up and customize your blog site.
category: "Guides"
---

This project is one of the quickest and barebones way of configuring and deploying your blog site. After the initial setup and deployment, everything else is automated all you have to do is just write your blogs into a markdown file and add metadata. Categorizing, sorting by date, rendering and styling is all handled for you.

### Just follow the steps to configure and deploy your blog site.

1. To get started just fork this repository and clone to your machine. 
2. Open the project in your favorite IDE or text editor.
3. Open your terminal and run `pnpm install` and then `pnpm run dev` then open the link in your browser to see the default setup with the sample blog profile with example blogs.

### Now, let's start customizing and personalizing your blog site. 

4. Start by navigating to the `src\lib` directory and open the `config.json` file in your IDE.
5. Edit the `config.json` file with your personal info.

![image.png](/blog-images/GettingStarted/config-file.png)

* Most of the configurations are self explanatory but the less obvious one is the `newBlogThreshold` key which represents the maximum number of days to consider a blog post as new. It can be set to any positive integer. So the default `10` means any blog post written within the last 10 days is considered as new and the `NEW` tag and the emerald highlight will be applied to the new blog posts.

### With configurations out of the way let's get started writing your first blog post.

The file hierarchy for your blogs is as follows:

```
BareBlogs
├── static
│   └── blogs 
│       └── My-First-Blog.md
│       └── My-Second-Blog.md
│       └── My-Third-Blog.md
│   └── blog-images 
│       └── MyFirstBlog
│           └── header.png
│           └── anotherImage.jpg
│           └── yetAnotherMedia.gif
```
* The `blogs` folder is where all your writings as markdown will goto. While `blog-images` is where you place and organize your images and GIFs referenced in your blogs at. 

6. Start by creating a new markdown file in the `src\blogs` directory. Name it something like `My-First-Blog.md`. Remember to use `-` instead of spaces when naming your files as it will make the URLs more readable.  

7. Open the `My-First-Blog.md` file in your IDE and add the following metadata at the top of the file:

```
---
title: My First Blog Post
date: 2025-11-01
category: "Journal"
---
```

8. Write your blog post content below the metadata. You can use Markdown syntax to format your text, add images, links, tables, code blocks, headings, blockquotes, lists and more.

9. Copy an image to `blog-images/MyFirstBlog` as `header.png` and then reference it in your blog post using the following syntax:

```
![Header Image](/blog-images/MyFirstBlog/header.png)
```

9. Save the file and refresh your browser to see your new blog post listed in the feed, click on it to read it. 

10. That's it! You can continue and use [Vercel](https://vercel.com) to deploy your blog site. Have fun!

### Syntaxes

1. Images 
```
![Image Title](/blog-images/Folder/image.png)
```
2. Links 
```
[Link Text](https://example.com)
```
3. Code Blocks 
```
```javascript
console.log('Hello World!');
```
4. Headings
```
# Heading 1
## Heading 2
### Heading 3
```
5. Blockquotes
```
> This is a blockquote.
```
6. Lists 
```
- Unordered List Item 1
- Unordered List Item 2
1. Ordered List Item 1
2. Ordered List Item 2
```

### Have fun writing!
