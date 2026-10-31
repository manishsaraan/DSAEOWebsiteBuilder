import { pages } from "@/content/pages";
import { Page } from "@/components/Page";
import { pageMetadata } from "@/lib/seo";
import { pageGraph } from "@/lib/schema";

export const metadata = pageMetadata(pages.home, "/");

export default function Home() {
  const page = pages.home;
  return <Page page={page} schema={pageGraph("WebPage", "/", page, [{ name: "Home", path: "/" }])} />;
}
