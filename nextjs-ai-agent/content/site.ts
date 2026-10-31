import type { SiteConfig } from "@/lib/types";

/**
 * PLACEHOLDER CONTENT. The build-website skill replaces every value below from client/profile.md.
 * Only facts recorded in the profile may appear here.
 */
export const site: SiteConfig = {
  name: "Your Business",
  url: "https://example.com",
  tagline: "PLACEHOLDER: one line that says what you do and for whom",
  description: "PLACEHOLDER: a 120 to 155 character description of the business, who it serves and where, used as the default meta description.",
  locale: "en",
  areaServed: ["US"],
  founder: {
    name: "Founder Name",
    jobTitle: "Founder",
    description: "PLACEHOLDER: two sentences of real, profile-backed bio.",
    url: "https://example.com/about",
    sameAs: [],
    credentials: "PLACEHOLDER credential line",
    knowsAbout: [],
  },
  org: {
    sameAs: [],
    addressCountry: "US",
  },
  nav: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
  ],
  cta: { label: "Contact", href: "/contact" },
  footer: {
    blurb: "PLACEHOLDER: one sentence about the business for the footer.",
    columns: [
      { title: "Pages", links: [{ label: "Services", href: "/services" }, { label: "About", href: "/about" }, { label: "Blog", href: "/blog" }, { label: "Contact", href: "/contact" }] },
    ],
    legal: "All rights reserved.",
  },
  theme: {
    accent: "#0b6b4f",
    accentDark: "#084f3a",
    accentSoft: "#e4f1ec",
    bg: "#fcfbf8",
    bgAlt: "#f3f1ea",
    ink: "#1b1b1f",
    headingFont: '"Iowan Old Style", "Palatino Linotype", "Book Antiqua", Palatino, Georgia, "Times New Roman", serif',
    bodyFont: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
};

/** Contact page extras: form heading, select options, success message, and side cards. */
export const contactForm = {
  heading: "Send a message",
  projectOptions: [
    { value: "general", label: "General enquiry" },
  ],
  successText: "Thanks. Your message is in. You will get a reply by email.",
  asides: [
    {
      title: "Other ways to reach us",
      items: [{ label: "PLACEHOLDER: email or social link", href: "" }],
      note: "PLACEHOLDER: location or hours, only if the profile records them.",
    },
  ] as { title: string; items?: { label: string; href?: string }[]; steps?: string[]; note?: string }[],
};
