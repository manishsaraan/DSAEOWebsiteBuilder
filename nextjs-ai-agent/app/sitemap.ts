import type { MetadataRoute } from "next";
import { getPosts } from "@/lib/posts";
import { absolute, siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages = ["/about", "/services", "/blog", "/contact"].map((p) => ({ url: absolute(p), lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 }));
  const posts = getPosts().map((p) => ({ url: absolute(`/blog/${p.slug}`), lastModified: new Date(p.updated ?? p.date), changeFrequency: "monthly" as const, priority: 0.7 }));
  return [{ url: siteUrl() + "/", lastModified: now, changeFrequency: "weekly", priority: 1 }, ...pages, ...posts];
}
