import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Post, PostFrontmatter } from "./types";
import { renderMarkdown, wordCount } from "./markdown";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

function load(file: string): Post {
  const source = fs.readFileSync(path.join(POSTS_DIR, file), "utf8");
  const { data, content } = matter(source);
  const fm = data as PostFrontmatter;
  const { html, toc } = renderMarkdown(content);
  return {
    ...fm,
    faqs: fm.faqs ?? [],
    slug: file.replace(/\.md$/, ""),
    html,
    toc,
    wordCount: wordCount(html),
  };
}

export function getPosts(): Post[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map(load)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string): Post | undefined {
  const file = `${slug}.md`;
  if (!fs.existsSync(path.join(POSTS_DIR, file))) return undefined;
  return load(file);
}
