import type { Metadata } from "next";
import type { CSSProperties } from "react";
import "./globals.css";
import { site } from "@/content/site";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: { default: site.name, template: `%s | ${site.name}` },
  description: site.description,
  authors: [{ name: site.founder.name, url: site.founder.url }],
  alternates: { types: { "application/rss+xml": `${siteUrl()}/feed.xml` } },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const t = site.theme;
  const vars = {
    "--accent": t.accent,
    "--accent-dark": t.accentDark,
    "--accent-soft": t.accentSoft,
    "--bg": t.bg,
    "--bg-alt": t.bgAlt,
    "--ink": t.ink,
    "--serif": t.headingFont,
    "--sans": t.bodyFont,
  } as CSSProperties;
  return (
    <html lang={site.locale} style={vars}>
      <body>
        <a className="skip-link" href="#main">Skip to content</a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
