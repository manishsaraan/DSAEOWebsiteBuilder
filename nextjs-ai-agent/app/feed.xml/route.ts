import { site } from "@/content/site";
import { getPosts } from "@/lib/posts";
import { absolute } from "@/lib/site";

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

export const dynamic = "force-static";

export function GET() {
  const items = getPosts()
    .map(
      (p) => `  <item>
    <title>${esc(p.h1 ?? p.title)}</title>
    <link>${absolute(`/blog/${p.slug}`)}</link>
    <guid>${absolute(`/blog/${p.slug}`)}</guid>
    <description>${esc(p.description)}</description>
    <pubDate>${new Date(p.date + "T00:00:00Z").toUTCString()}</pubDate>
    <author>${esc(site.founder.name)}</author>
  </item>`,
    )
    .join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>${esc(site.name)} blog</title>
  <link>${absolute("/blog")}</link>
  <atom:link href="${absolute("/feed.xml")}" rel="self" type="application/rss+xml"/>
  <description>${esc(site.description)}</description>
  <language>${site.locale}</language>
${items}
</channel>
</rss>
`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
