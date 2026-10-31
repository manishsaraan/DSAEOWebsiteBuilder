import Link from "next/link";
import type { PageContent } from "@/lib/types";
import { Breadcrumbs } from "./Breadcrumbs";
import { Faq } from "./Faq";
import { JsonLd } from "./JsonLd";
import { RenderSection } from "./Sections";

export function Hero({ page, crumbs }: { page: PageContent; crumbs?: { name: string; path?: string }[] }) {
  return (
    <section className="hero">
      <div className="wrap">
        {crumbs && crumbs.length > 1 && <Breadcrumbs items={crumbs} />}
        {page.eyebrow && <p className="eyebrow">{page.eyebrow}</p>}
        <h1>{page.h1}</h1>
        <div className="answer-box"><p>{page.answer}</p></div>
        {page.lede && <p className="lede">{page.lede}</p>}
        {page.buttons && (
          <div className="btn-row">
            {page.buttons.map((b) => (
              <Link key={b.href} className={"btn" + (b.ghost ? " btn-ghost" : "")} href={b.href}>{b.label}</Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export function CtaBand({ cta }: { cta: PageContent["cta"] }) {
  if (!cta) return null;
  return (
    <section className="cta-band">
      <div className="wrap">
        <h2>{cta.heading}</h2>
        <p>{cta.body}</p>
        <Link className="btn" href={cta.href}>{cta.label}</Link>
      </div>
    </section>
  );
}

export function Page({ page, schema, crumbs, children }: { page: PageContent; schema: Record<string, unknown>; crumbs?: { name: string; path?: string }[]; children?: React.ReactNode }) {
  return (
    <>
      <JsonLd data={schema} />
      <Hero page={page} crumbs={crumbs} />
      {children}
      {page.sections.map((s) => <RenderSection key={s.id} section={s} />)}
      <Faq faqs={page.faqs} />
      <CtaBand cta={page.cta} />
    </>
  );
}
