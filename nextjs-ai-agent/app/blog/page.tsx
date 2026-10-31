import { pages } from "@/content/pages";
import { Page } from "@/components/Page";
import { PostList } from "@/components/Sections";
import { pageMetadata } from "@/lib/seo";
import { blog, breadcrumb, faqPage, graph, organization, pageSpeakable, person, webPage, website } from "@/lib/schema";
import { getPosts } from "@/lib/posts";
import { ids } from "@/lib/site";

export const metadata = pageMetadata(pages.blog, "/blog");

const crumbs = [{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" }];

export default function Blog() {
  const page = pages.blog;
  const posts = getPosts();
  const schema = graph([
    webPage("CollectionPage", "/blog", page.title, { mainEntity: { "@id": ids.blog() }, speakable: pageSpeakable() }),
    blog(posts),
    breadcrumb(crumbs),
    faqPage(page.faqs),
    organization(),
    website(),
    person(),
  ]);
  return (
    <Page page={page} schema={schema} crumbs={crumbs}>
      <section aria-labelledby="list-h">
        <div className="wrap">
          <h2 id="list-h" className="mt-0">All articles</h2>
          <PostList posts={posts} />
        </div>
      </section>
    </Page>
  );
}
