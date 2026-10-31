import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { site } from "@/content/site";
import { pages } from "@/content/pages";
import { getPost, getPosts } from "@/lib/posts";
import { pageMetadata } from "@/lib/seo";
import { blogPosting, breadcrumb, faqPage, graph, organization, person, website } from "@/lib/schema";
import { formatDate, ids } from "@/lib/site";
import { JsonLd } from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Faq } from "@/components/Faq";
import { AuthorCard } from "@/components/AuthorCard";
import { CtaBand } from "@/components/Page";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const base = pageMetadata(post, `/blog/${slug}`, "article");
  return {
    ...base,
    openGraph: { ...base.openGraph, type: "article", publishedTime: post.date, modifiedTime: post.updated ?? post.date, authors: [site.founder.url ?? site.url] },
  };
}

export default async function PostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const h1 = post.h1 ?? post.title;
  const crumbs = [{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" }, { name: h1, path: `/blog/${slug}` }];
  const schema = graph([
    blogPosting(post),
    { "@type": "Blog", "@id": ids.blog(), url: `${site.url}/blog`, name: `${site.name} blog`, publisher: { "@id": ids.org() } },
    breadcrumb(crumbs),
    faqPage(post.faqs),
    organization(),
    website(),
    person(),
  ]);
  return (
    <>
      <JsonLd data={schema} />
      <article>
        <header className="article-header">
          <div className="wrap">
            <Breadcrumbs items={crumbs} />
            <p className="eyebrow">{post.section}</p>
            <h1>{h1}</h1>
            <p className="byline">
              <span>By <Link href="/about" rel="author">{site.founder.name}</Link>, {site.founder.jobTitle}, {site.name}. {site.founder.credentials}.</span>
              <span>Published <time dateTime={post.date}>{formatDate(post.date)}</time>{post.updated && <> &middot; Updated <time dateTime={post.updated}>{formatDate(post.updated)}</time></>}</span>
            </p>
          </div>
        </header>
        <div className="article-body wrap">
          <div className="answer-box"><p>{post.summary}</p></div>
          {post.toc.length > 2 && (
            <nav className="toc" aria-label="Contents">
              <strong>Contents</strong>
              <ol>
                {post.toc.map((t) => <li key={t.id}><a href={"#" + t.id}>{t.text}</a></li>)}
                {post.faqs.length > 0 && <li><a href="#faq">FAQ</a></li>}
              </ol>
            </nav>
          )}
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
          <Faq faqs={post.faqs} wrap={false} />
          <AuthorCard />
        </div>
      </article>
      <CtaBand cta={pages.blog.cta} />
    </>
  );
}
