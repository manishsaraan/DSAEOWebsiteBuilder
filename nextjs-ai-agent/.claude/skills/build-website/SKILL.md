---
name: build-website
description: Build the client's complete website by filling the Next.js content layer (content/site.ts, content/pages.ts, content/posts/) from client/profile.md and the reference screenshots in client/references/. Use when the user says "build", "build the website", "build my site", or after onboarding completes and the user confirms.
---

# Build the website

## Before writing any content

1. Read `client/profile.md`. If it does not exist, stop and run the `onboarding` skill first.
2. Read every image in `client/references/` with the Read tool. These screenshots define the mood: section order, hero composition, density, colour. Reproduce the structure and feel through the theme tokens and section choices. Never copy their brand assets, logos, photos, or copy.
3. Read `build-spec.md` in this skill folder. It is the binding build specification. Fill its `[PLACEHOLDERS]` from `client/profile.md`.
4. Read `lib/types.ts` so you know the exact shape of `SiteConfig`, `PageContent`, sections and post frontmatter.
5. Load the `aeo-content-writer` skill. Every word in `content/` goes through it.

## What you edit

- `content/site.ts`: business name, URL, founder (name, role, bio, sameAs links), areaServed, nav, CTA, footer, social, and `theme` tokens (accent, background, ink, heading font stack, body font stack). Choose tokens that match the reference screenshots.
- `content/pages.ts`: the five page objects (`home`, `about`, `services`, `blog`, `contact`). Each has title, description, keyword, h1, answer (40 to 60 words), sections, FAQs, CTA. Pick section types from `lib/types.ts` (`cards`, `stats`, `steps`, `prose`, `pricing`, `posts`) to mirror the reference layouts. Services page also lists `services` (for Service schema) and may include a `pricing` section (for OfferCatalog schema).
- `content/posts/*.md`: four posts, 2000+ words each, with the frontmatter fields in `lib/types.ts` (`PostFrontmatter`). Delete `content/posts/example-post.md`.
- Contact form: wired to `app/api/contact/route.ts`, which sends through Resend when `RESEND_API_KEY` and `CONTACT_TO_EMAIL` are set in `.env.local`. If they are not set, the form shows an honest "not configured" message. Tell the client to create a free Resend account, verify a sender domain, and add the two variables. Never fake a success state.

## What you do not edit

`app/`, `components/`, `lib/` are the engine. They already produce per-page metadata, canonical URLs, Open Graph images, Organization, WebSite, Person, AboutPage, Service, OfferCatalog, ContactPage, Blog, BlogPosting, FAQPage and BreadcrumbList JSON-LD, sitemap, robots, RSS, and a 404 page. Only touch them when a reference layout needs a section type that does not exist, and then add a new section type to `lib/types.ts` and `components/Sections.tsx` with the smallest possible change.

## Verify

1. `npm run check` must pass with no errors. Fix every warning you can.
2. `npm run build` must pass.
3. Run the `site-reviewer` agent and fix what it finds (it reads `content/` and the prerendered HTML in `.next/server/app`).
4. Produce the summary table required by `build-spec.md`: Page | Title Tag | Meta Description | Target Keyword | Schema Type(s).
5. Tell the user to run `npm run dev` and open http://localhost:3000, then offer `/deploy`. Never deploy without being asked.
