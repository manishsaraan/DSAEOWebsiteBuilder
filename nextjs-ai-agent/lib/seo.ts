import type { Metadata } from "next";
import { site } from "@/content/site";
import type { PageContent } from "./types";
import { absolute } from "./site";

export function pageMetadata(page: Pick<PageContent, "title" | "description">, path: string, type: "website" | "article" = "website", extra: Metadata = {}): Metadata {
  const url = absolute(path);
  const image = type === "article" ? absolute(path + "/opengraph-image") : absolute("/opengraph-image");
  return {
    title: { absolute: page.title },
    description: page.description,
    alternates: { canonical: url },
    openGraph: {
      type,
      title: page.title,
      description: page.description,
      url,
      siteName: site.name,
      locale: site.locale.replace("-", "_"),
      images: [{ url: image, width: 1200, height: 630, alt: page.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: [image],
      ...(site.twitterHandle ? { creator: site.twitterHandle } : {}),
    },
    ...extra,
  };
}
