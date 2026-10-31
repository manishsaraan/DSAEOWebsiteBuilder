import { pages } from "@/content/pages";
import { Page } from "@/components/Page";
import { pageMetadata } from "@/lib/seo";
import { breadcrumb, faqPage, graph, organization, pageSpeakable, person, webPage, website } from "@/lib/schema";
import { ids } from "@/lib/site";

export const metadata = pageMetadata(pages.about, "/about");

const crumbs = [{ name: "Home", path: "/" }, { name: "About", path: "/about" }];

export default function About() {
  const page = pages.about;
  const schema = graph([
    webPage("AboutPage", "/about", page.title, { mainEntity: { "@id": ids.person() }, speakable: pageSpeakable() }),
    breadcrumb(crumbs),
    faqPage(page.faqs),
    organization(),
    website(),
    person(),
  ]);
  return <Page page={page} schema={schema} crumbs={crumbs} />;
}
