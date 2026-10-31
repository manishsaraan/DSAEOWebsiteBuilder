import Link from "next/link";
import type { Section } from "@/lib/types";
import { renderMarkdown } from "@/lib/markdown";
import { getPosts } from "@/lib/posts";
import { formatDate } from "@/lib/site";

function Anchor({ href, className, children }: { href: string; className?: string; children: React.ReactNode }) {
  return href.startsWith("http") ? (
    <a href={href} className={className} rel="noopener">{children}</a>
  ) : (
    <Link href={href} className={className}>{children}</Link>
  );
}

function Intro({ eyebrow, heading, intro, id }: { eyebrow?: string; heading: string; intro?: string; id: string }) {
  return (
    <div className="section-head">
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 id={id + "-h"}>{heading}</h2>
      {intro && <p dangerouslySetInnerHTML={{ __html: inlineMd(intro) }} />}
    </div>
  );
}

/** Minimal inline markdown: links and bold only, for intros and card bodies. */
export function inlineMd(text: string): string {
  return text
    .replace(/&/g, "&amp;").replace(/</g, "&lt;")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
}

export function RenderSection({ section }: { section: Section }) {
  const s = section;
  const cls = "alt" in s && s.alt ? "section-alt" : undefined;
  switch (s.type) {
    case "cards":
      return (
        <section id={s.id} className={cls} aria-labelledby={s.id + "-h"}>
          <div className="wrap">
            <Intro eyebrow={s.eyebrow} heading={s.heading} intro={s.intro} id={s.id} />
            <div className="grid">
              {s.cards.map((c) => (
                <div className="card" key={c.title}>
                  {c.meta && <div className="meta">{c.meta}</div>}
                  <h3>{c.href ? <Anchor href={c.href}>{c.title}</Anchor> : c.title}</h3>
                  {c.body && <p dangerouslySetInnerHTML={{ __html: inlineMd(c.body) }} />}
                  {c.bullets && <ul>{c.bullets.map((b) => <li key={b}>{b}</li>)}</ul>}
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    case "stats":
      return (
        <section id={s.id} aria-labelledby={s.id + "-h"}>
          <div className="wrap">
            <Intro heading={s.heading} intro={s.intro} id={s.id} />
            <div className="stat-row">
              {s.stats.map((st) => (
                <div className="stat" key={st.label}><strong>{st.value}</strong><span>{st.label}</span></div>
              ))}
            </div>
            {s.cards && (
              <>
                {s.cardsHeading && <h3>{s.cardsHeading}</h3>}
                <div className="grid">
                  {s.cards.map((c) => (
                    <div className="card" key={c.title}>
                      <h3>{c.title}</h3>
                      <p dangerouslySetInnerHTML={{ __html: inlineMd(c.body) }} />
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>
      );
    case "steps":
      return (
        <section id={s.id} className={cls} aria-labelledby={s.id + "-h"}>
          <div className="wrap">
            <Intro heading={s.heading} intro={s.intro} id={s.id} />
            <ol className="steps">
              {s.steps.map((st) => (
                <li key={st.title}><strong>{st.title}</strong><p>{st.body}</p></li>
              ))}
            </ol>
          </div>
        </section>
      );
    case "prose": {
      const { html } = renderMarkdown(s.markdown);
      return (
        <section id={s.id} aria-labelledby={s.id + "-h"}>
          <div className="wrap prose">
            <h2 id={s.id + "-h"}>{s.heading}</h2>
            <div dangerouslySetInnerHTML={{ __html: html }} />
          </div>
        </section>
      );
    }
    case "pricing":
      return (
        <section id={s.id} aria-labelledby={s.id + "-h"}>
          <div className="wrap">
            <Intro heading={s.heading} intro={s.intro} id={s.id} />
            <div className="grid">
              {s.cards.map((c) => (
                <div className="card price-card" key={c.title}>
                  {c.meta && <div className="meta">{c.meta}</div>}
                  <h3>{c.title}</h3>
                  <div className="price">{c.price}{c.priceNote && <small> {c.priceNote}</small>}</div>
                  <ul>{c.bullets.map((b) => <li key={b}>{b}</li>)}</ul>
                  <Anchor href={c.cta.href} className={"btn" + (c.cta.ghost ? " btn-ghost" : "")}>{c.cta.label}</Anchor>
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    case "posts": {
      const posts = getPosts().slice(0, s.limit ?? 4);
      return (
        <section id={s.id} aria-labelledby={s.id + "-h"}>
          <div className="wrap">
            <Intro heading={s.heading} intro={s.intro} id={s.id} />
            <PostList posts={posts} />
          </div>
        </section>
      );
    }
  }
}

export function PostList({ posts }: { posts: ReturnType<typeof getPosts> }) {
  if (!posts.length) return <p className="muted">No articles yet.</p>;
  return (
    <ul className="post-list">
      {posts.map((p) => (
        <li key={p.slug}>
          <div className="meta">{p.section} &middot; <time dateTime={p.date}>{formatDate(p.date)}</time></div>
          <h3><Link href={`/blog/${p.slug}`}>{p.h1 ?? p.title}</Link></h3>
          <p>{p.description}</p>
        </li>
      ))}
    </ul>
  );
}
