import { ImageResponse } from "next/og";
import { site } from "@/content/site";
import { getPost, getPosts } from "@/lib/posts";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  const title = post?.h1 ?? post?.title ?? site.name;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "72px 80px", background: site.theme.bg, color: site.theme.ink, borderLeft: `18px solid ${site.theme.accent}`, fontFamily: "serif" }}>
        <div style={{ fontSize: 40, fontWeight: 700 }}>{post ? `${site.name} · ${post.section}` : site.name}</div>
        <div style={{ fontSize: title.length > 60 ? 56 : 66, fontWeight: 700, lineHeight: 1.1, maxWidth: 1000 }}>{title}</div>
        <div style={{ fontSize: 30, color: "#4b4b55" }}>{`${site.founder.name} · ${site.founder.credentials}`}</div>
      </div>
    ),
    size,
  );
}
