import { site } from "@/content/site";
import type { Faq, PageContent, Post, PriceCard, ServiceDef } from "./types";
import { absolute, ids, siteUrl } from "./site";

type Node = Record<string, unknown>;

export function organization(extra: Node = {}): Node {
  return {
    "@type": "Organization",
    "@id": ids.org(),
    name: site.name,
    url: siteUrl() + "/",
    description: site.description,
    logo: { "@type": "ImageObject", url: absolute("/opengraph-image") },
    image: absolute("/opengraph-image"),
    founder: { "@id": ids.person() },
    areaServed: site.areaServed,
    sameAs: site.org.sameAs,
    ...(site.org.email ? { email: site.org.email } : {}),
    ...(site.org.phone ? { telephone: site.org.phone } : {}),
    ...(site.org.addressCountry
      ? { location: { "@type": "Place", address: { "@type": "PostalAddress", addressCountry: site.org.addressCountry } } }
      : {}),
    ...extra,
  };
}

export function website(): Node {
  return {
    "@type": "WebSite",
    "@id": ids.website(),
    url: siteUrl() + "/",
    name: site.name,
    publisher: { "@id": ids.org() },
    inLanguage: site.locale,
  };
}

export function person(extra: Node = {}): Node {
  const f = site.founder;
  return {
    "@type": "Person",
    "@id": ids.person(),
    name: f.name,
    jobTitle: f.jobTitle,
    description: f.description,
    ...(f.url ? { url: f.url } : {}),
    worksFor: { "@id": ids.org() },
    sameAs: f.sameAs,
    knowsAbout: f.knowsAbout,
    ...extra,
  };
}

export function webPage(type: string, path: string, name: string, extra: Node = {}): Node {
  return {
    "@type": type,
    "@id": absolute(path),
    url: absolute(path),
    name,
    isPartOf: { "@id": ids.website() },
    about: { "@id": ids.org() },
    inLanguage: site.locale,
    ...extra,
  };
}

export function breadcrumb(items: { name: string; path: string }[]): Node {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.path === "/" ? siteUrl() + "/" : absolute(it.path),
    })),
  };
}

export function faqPage(faqs: Faq[]): Node {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function service(s: ServiceDef): Node {
  const url = absolute("/services#" + s.id);
  return {
    "@type": "Service",
    "@id": url,
    name: s.name,
    serviceType: s.name,
    description: s.description,
    url,
    provider: { "@id": ids.org() },
    areaServed: site.areaServed,
    availableChannel: { "@type": "ServiceChannel", serviceUrl: absolute("/contact") },
  };
}

export function offerCatalog(cards: PriceCard[]): Node {
  return {
    "@type": "OfferCatalog",
    name: `${site.name} pricing`,
    itemListElement: cards.map((c) => ({
      "@type": "Offer",
      name: c.title,
      description: c.offer.description,
      price: c.offer.price,
      priceCurrency: c.offer.currency,
      priceSpecification: c.offer.unitText
        ? { "@type": "UnitPriceSpecification", price: c.offer.price, priceCurrency: c.offer.currency, unitText: c.offer.unitText }
        : { "@type": "PriceSpecification", minPrice: c.offer.price, priceCurrency: c.offer.currency },
    })),
  };
}

export function blog(posts: Post[]): Node {
  return {
    "@type": "Blog",
    "@id": ids.blog(),
    url: absolute("/blog"),
    name: `${site.name} blog`,
    publisher: { "@id": ids.org() },
    author: { "@id": ids.person() },
    inLanguage: site.locale,
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      "@id": absolute(`/blog/${p.slug}`) + "#article",
      headline: p.h1 ?? p.title,
      url: absolute(`/blog/${p.slug}`),
      datePublished: p.date,
      author: { "@id": ids.person() },
    })),
  };
}

export function blogPosting(p: Post): Node {
  const url = absolute(`/blog/${p.slug}`);
  return {
    "@type": "BlogPosting",
    "@id": url + "#article",
    headline: p.h1 ?? p.title,
    name: p.title,
    description: p.description,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    datePublished: p.date,
    dateModified: p.updated ?? p.date,
    author: { "@id": ids.person() },
    publisher: { "@id": ids.org() },
    isPartOf: { "@id": ids.blog() },
    inLanguage: site.locale,
    keywords: p.keyword,
    articleSection: p.section,
    wordCount: p.wordCount,
    image: absolute(`/blog/${p.slug}/opengraph-image`),
    speakable: { "@type": "SpeakableSpecification", cssSelector: [".answer-box"] },
  };
}

export function pageSpeakable(): Node {
  return { "@type": "SpeakableSpecification", cssSelector: [".answer-box"] };
}

export function graph(nodes: Node[]): Node {
  return { "@context": "https://schema.org", "@graph": nodes };
}

/** Standard graph for a content page: page node + breadcrumb + FAQ + org + person + website. */
export function pageGraph(type: string, path: string, page: PageContent, crumbs: { name: string; path: string }[], extra: Node[] = []): Node {
  return graph([
    webPage(type, path, page.title, { speakable: pageSpeakable() }),
    breadcrumb(crumbs),
    ...(page.faqs.length ? [faqPage(page.faqs)] : []),
    organization(),
    website(),
    person(),
    ...extra,
  ]);
}
