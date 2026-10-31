# WebsiteAgent (Next.js edition)

This project is a website-building agent. It interviews the client (onboarding), fills a Next.js App Router site from typed content files, writes all copy through an AEO/EEAT content skill, and deploys to Vercel.

## First run

If `client/profile.md` does not exist, run the `onboarding` skill before anything else. Every other skill depends on the profile it produces. Greet the user, explain the four steps below in one short paragraph, then start the onboarding questions.

## Workflow

1. **`onboarding` skill** — collects the business story, the money keyword, EEAT proof, and reference screenshots. Writes `client/profile.md`.
2. **`build-website` skill** — fills `content/` (site facts, page copy, four blog posts, theme tokens) so the Next.js engine renders the finished site. Matches the layout mood of the reference screenshots in `client/references/`.
3. **`aeo-content-writer` skill** — writes ALL site copy. Never write or edit anything in `content/` without loading this skill first.
4. **`deploy-vercel` skill** — publishes to Vercel with the Vercel CLI or the Git integration, then verifies the live URL.

## Layout

- `client/` — onboarding output: `profile.md` plus `references/` (screenshots of sites to model)
- `content/` — the ONLY place copy lives. `site.ts` (business facts, founder, nav, footer, theme), `pages.ts` (per-page copy, FAQs, sections), `posts/*.md` (blog posts with frontmatter)
- `app/`, `components/`, `lib/` — the rendering engine: metadata, JSON-LD builders, page renderer, blog loader, contact API, sitemap, robots, RSS, OG images. Treat as stable. Change it only for a layout need that content cannot express, and keep the change small.
- `scripts/check-seo.mjs` — `npm run check`. Validates title and meta lengths, answer-box word counts, post word counts, FAQ counts, em dashes, banned phrases, leftover placeholders.
- `.env.local` — `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `NEXT_PUBLIC_SITE_URL`. Never commit it. Never print secrets.

## Commands

`/onboard` · `/build` · `/write` · `/deploy`

Project scripts: `npm run dev` (preview at http://localhost:3000), `npm run check`, `npm run build`.

## Hard rules

- Every line of site copy must pass `.claude/skills/aeo-content-writer/writing-rules.md`. No exceptions.
- EEAT facts (years, numbers, awards, reviews, credentials) come from `client/profile.md` exactly as recorded. Never invent them.
- Copy lives in `content/` only. Do not hard-code business text in `app/` or `components/`.
- `npm run check` and `npm run build` must both pass before offering a preview or a deploy.
- After building or editing content, run the `site-reviewer` agent before offering to deploy.
- Never print or log `RESEND_API_KEY`, `VERCEL_TOKEN`, or any value from `.env.local`.
