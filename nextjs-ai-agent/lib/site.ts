import { site } from "@/content/site";

export function siteUrl(): string {
  const env = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const raw = env && env.length > 0 ? env : site.url;
  return raw.replace(/\/+$/, "");
}

export function absolute(path: string): string {
  if (path.startsWith("http")) return path;
  return siteUrl() + (path.startsWith("/") ? path : "/" + path);
}

export const ids = {
  org: () => siteUrl() + "/#organization",
  website: () => siteUrl() + "/#website",
  person: () => siteUrl() + "/about#founder",
  blog: () => siteUrl() + "/blog#blog",
};

export function formatDate(iso: string): string {
  const d = new Date(iso + "T00:00:00Z");
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
}
