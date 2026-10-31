export type Faq = { q: string; a: string };
export type Link = { label: string; href: string; ghost?: boolean };

export type Theme = {
  accent: string;
  accentDark: string;
  accentSoft: string;
  bg: string;
  bgAlt: string;
  ink: string;
  headingFont: string;
  bodyFont: string;
};

export type SiteConfig = {
  name: string;
  /** Fallback origin when NEXT_PUBLIC_SITE_URL is not set. No trailing slash. */
  url: string;
  tagline: string;
  description: string;
  locale: string;
  /** ISO country codes or region names served, e.g. ["US", "GB"]. */
  areaServed: string[];
  founder: {
    name: string;
    jobTitle: string;
    description: string;
    url?: string;
    sameAs: string[];
    /** Short credential line shown in bylines, e.g. "10+ years, 50+ MVPs launched". */
    credentials: string;
    /** Topics for Person.knowsAbout. Only what the profile supports. */
    knowsAbout: string[];
  };
  org: {
    sameAs: string[];
    foundingCountry?: string;
    email?: string;
    phone?: string;
    /** ISO code for Organization.location, e.g. "IN". */
    addressCountry?: string;
  };
  twitterHandle?: string;
  nav: Link[];
  cta: Link;
  footer: {
    blurb: string;
    columns: { title: string; links: Link[] }[];
    legal: string;
  };
  theme: Theme;
};

export type Stat = { value: string; label: string };
export type Card = { title: string; body: string; href?: string; meta?: string; bullets?: string[] };
export type Step = { title: string; body: string };
export type PriceCard = {
  meta?: string;
  title: string;
  price: string;
  priceNote?: string;
  bullets: string[];
  cta: Link;
  /** Feeds OfferCatalog schema. */
  offer: { price: string; currency: string; unitText?: string; description: string };
};

export type Section =
  | { type: "cards"; id: string; heading: string; eyebrow?: string; intro?: string; cards: Card[]; alt?: boolean }
  | { type: "stats"; id: string; heading: string; intro?: string; stats: Stat[]; cards?: Card[]; cardsHeading?: string }
  | { type: "steps"; id: string; heading: string; intro?: string; steps: Step[]; alt?: boolean }
  | { type: "prose"; id: string; heading: string; markdown: string }
  | { type: "pricing"; id: string; heading: string; intro?: string; cards: PriceCard[] }
  | { type: "posts"; id: string; heading: string; intro?: string; limit?: number };

export type PageContent = {
  /** Title tag, under 60 characters. */
  title: string;
  /** Meta description, under 155 characters. */
  description: string;
  keyword: string;
  eyebrow?: string;
  h1: string;
  /** 40 to 60 words. Opens the page; also used for speakable. */
  answer: string;
  lede?: string;
  buttons?: Link[];
  sections: Section[];
  faqs: Faq[];
  cta?: { heading: string; body: string; label: string; href: string };
};

export type ServiceDef = { id: string; name: string; description: string };

export type PagesContent = {
  home: PageContent;
  about: PageContent;
  services: PageContent & { services: ServiceDef[] };
  blog: PageContent;
  contact: PageContent;
};

export type PostFrontmatter = {
  title: string;
  description: string;
  h1?: string;
  keyword: string;
  section: string;
  /** ISO date, e.g. 2026-10-31 */
  date: string;
  updated?: string;
  /** 40 to 60 words. Shown in the answer box and used for speakable. */
  summary: string;
  faqs: Faq[];
};

export type Post = PostFrontmatter & {
  slug: string;
  html: string;
  toc: { id: string; text: string }[];
  wordCount: number;
};
