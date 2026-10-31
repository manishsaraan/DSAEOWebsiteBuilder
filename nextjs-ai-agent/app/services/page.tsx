import { pages } from "@/content/pages";
import { Page } from "@/components/Page";
import { pageMetadata } from "@/lib/seo";
import { breadcrumb, faqPage, graph, offerCatalog, organization, pageSpeakable, person, service, webPage, website } from "@/lib/schema";

export const metadata = pageMetadata(pages.services, "/services");

const crumbs = [{ name: "Home", path: "/" }, { name: "Services", path: "/services" }];

export default function Services() {
  const page = pages.services;
  const pricing = page.sections.find((s) => s.type === "pricing");
  const schema = graph([
    webPage("WebPage", "/services", page.title, { speakable: pageSpeakable() }),
    breadcrumb(crumbs),
    faqPage(page.faqs),
    organization(pricing && pricing.type === "pricing" ? { hasOfferCatalog: offerCatalog(pricing.cards) } : {}),
    website(),
    person(),
    ...page.services.map(service),
  ]);
  return <Page page={page} schema={schema} crumbs={crumbs} />;
}
