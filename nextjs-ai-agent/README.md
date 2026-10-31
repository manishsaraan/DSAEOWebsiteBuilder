# WebsiteAgent, Next.js edition

A reusable starter for building and deploying AEO-focused business websites with Claude Code project skills, on Next.js and Vercel. Open the folder in Claude Code, answer the onboarding questions, and the skills fill a typed content layer that the Next.js engine renders into a complete, schema-rich site.

Same workflow as the static edition, different engine:

| | Static edition | This edition |
|---|---|---|
| Output | `site/` HTML, CSS, JS | `content/` (TypeScript + Markdown) rendered by Next.js |
| Deploy | Hostinger over SSH | Vercel (CLI or Git integration) |
| Contact form | Formspree | `/api/contact` route sending through Resend |
| OG images | Static PNG | Generated per page with `next/og` |
| Checks | Manual | `npm run check` plus the site-reviewer agent |

## Quick start

```bash
cd nextjs-ai-agent
npm install
cp .env.example .env.local   # fill in later; the site runs without it
```

Open the folder in Claude Code and start with:

> "Let's get started. I want to build a website. I will give you the Vercel and Resend details when we get to deployment."

Claude runs the four steps:

1. `/onboard` collects your business story, money keyword, EEAT proof and reference screenshots into `client/profile.md`.
2. `/build` fills `content/site.ts`, `content/pages.ts` and four posts in `content/posts/`, picks theme tokens from your references, then runs `npm run check`, `npm run build` and the site-reviewer agent.
3. `/write` rewrites or adds copy through the AEO content skill at any time.
4. `/deploy` publishes to Vercel and verifies the live URL.

Preview any time with `npm run dev` at http://localhost:3000.

## What the engine gives every page

- Unique title, meta description, canonical URL, Open Graph and Twitter tags, generated share image
- One H1, an answer-first box, question-shaped sections, 3 to 5 FAQs
- JSON-LD: Organization, WebSite, Person, WebPage, AboutPage, Service, OfferCatalog, ContactPage, Blog, BlogPosting, FAQPage, BreadcrumbList, speakable
- `sitemap.xml`, `robots.txt`, `feed.xml`, a 404 page, security headers
- A contact form with server-side validation, a honeypot, and an honest "not configured" state until Resend is connected

## Environment variables

Copy `.env.example` to `.env.local` for local work. In production, set them in the Vercel project.

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Live https origin, no trailing slash. Drives canonicals, sitemap, JSON-LD. |
| `RESEND_API_KEY` | Resend API key for the contact form. |
| `CONTACT_TO_EMAIL` | Where contact form messages are delivered. |
| `CONTACT_FROM_EMAIL` | Optional. Verified sender in Resend. Defaults to `onboarding@resend.dev` for testing. |

## Folder map

```
client/            onboarding output (profile.md, references/)
content/           ALL copy: site.ts, pages.ts, posts/*.md
app/               Next.js routes, metadata, sitemap, robots, feed, OG images, contact API
components/        header, footer, page renderer, sections, FAQ, contact form, JSON-LD
lib/               types, schema builders, SEO helpers, markdown and post loaders
scripts/           check-seo.mjs (npm run check)
.claude/           skills, rules, agents, commands for Claude Code
```

## Deploying

```bash
npx vercel login
npx vercel link
npx vercel env add NEXT_PUBLIC_SITE_URL production
npx vercel env add RESEND_API_KEY production
npx vercel env add CONTACT_TO_EMAIL production
npx vercel --prod
```

Or push the repository to GitHub and import it at https://vercel.com/new. Then add your domain in the project's Domains tab, point DNS as instructed, update `NEXT_PUBLIC_SITE_URL`, and redeploy.
