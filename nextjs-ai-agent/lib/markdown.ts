import { marked } from "marked";

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/<[^>]+>/g, "")
    .replace(/&[a-z]+;/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

/** Render markdown to HTML and give every h2/h3 an id for anchors and the table of contents. */
export function renderMarkdown(md: string): { html: string; toc: { id: string; text: string }[] } {
  const raw = marked.parse(md, { async: false, gfm: true }) as string;
  const toc: { id: string; text: string }[] = [];
  const used = new Set<string>();
  const html = raw.replace(/<h([23])>(.*?)<\/h\1>/g, (_m, level: string, inner: string) => {
    let id = slugify(inner) || "section";
    let n = 2;
    while (used.has(id)) id = `${slugify(inner)}-${n++}`;
    used.add(id);
    if (level === "2") toc.push({ id, text: inner.replace(/<[^>]+>/g, "") });
    return `<h${level} id="${id}">${inner}</h${level}>`;
  });
  return { html, toc };
}

export function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

export function wordCount(text: string): number {
  return stripHtml(text).split(/\s+/).filter(Boolean).length;
}
