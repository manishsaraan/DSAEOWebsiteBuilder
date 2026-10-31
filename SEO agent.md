# SEO Agent: how this project works, explained simply

This document explains the website-building agent in this repository. It is written for someone who has never worked with AI agents before. It covers what the agent is, what each part does, how the website it produces is built for search engines and AI answer engines, and how to use the Next.js edition to start a new site from scratch.

There are two editions in this repository and they share the same brain:

| | Static edition (repository root) | Next.js edition (`nextjs-ai-agent/`) |
|---|---|---|
| What it produces | Plain HTML, CSS and JavaScript files in `site/` | A Next.js application whose copy lives in `content/` |
| Where it publishes | Hostinger over SSH | Vercel |
| Who writes the pages | The agent writes HTML directly | The agent fills content files; the engine renders them |
| Contact form | Formspree | Built-in API route sending through Resend |
| Share images | One static PNG | Generated automatically per page |

Everything else, the interview, the writing rules, the proof rules, the review step, is identical.

---

## 1. What an "AI agent" means here

An AI agent is a language model (Claude) that is allowed to use tools: read and write files, run commands, search the web. On its own, a model with tools will do roughly what you ask, in roughly its own way, every time slightly differently. An agent *project* adds structure so the model does the same job, the same way, to the same standard, for every client.

In this project the structure is a set of plain text files inside a folder called `.claude/`. Claude Code reads these files when it opens the project. Think of them as the employee handbook for a new hire:

| File or folder | What it is | Plain-language role |
|---|---|---|
| `CLAUDE.md` | A short document at the root | The first page of the handbook. What the project is, what order to do things in, the rules that never bend. |
| `.claude/skills/*/SKILL.md` | One folder per skill, each with a `SKILL.md` and supporting files | A detailed procedure for one job (interview the client, build the site, write copy, deploy). Loaded only when that job starts. |
| `.claude/rules/*.md` | Short rule files | Rules that apply all the time, regardless of which skill is running. |
| `.claude/agents/site-reviewer.md` | A sub-agent definition | A second, separate reviewer with its own instructions and a smaller set of tools. It reads but cannot edit. |
| `.claude/commands/*.md` | Slash commands | Shortcuts. Typing `/build` loads the build skill with a one-line instruction. |
| `.claude/settings.json` | Permissions | Which commands the agent may run without asking you each time. |
| `client/profile.md` | Written by the agent during onboarding | The single source of truth about the client. Every fact on the website must trace back to this file. |

The important idea: **the model does not decide how to build a website. The files do.** The model reads the files, follows them, and fills in the parts that need judgement, such as choosing words or matching a layout to a screenshot.

---

## 2. The four-step workflow

Every site goes through the same four steps, in order. `CLAUDE.md` enforces the order by saying: if `client/profile.md` does not exist, run onboarding first and nothing else.

```
/onboard  →  /build  →  (review)  →  /deploy
   │            │            │            │
profile.md    site/ or    site-reviewer  live URL
             content/       agent        verified
```

1. **Onboarding** interviews you and writes `client/profile.md`.
2. **Build** turns the profile and your reference screenshots into the site. Every word of copy goes through the content-writer skill.
3. **Review** runs the `site-reviewer` sub-agent, which checks for invented facts, AI-sounding phrasing, and missing structure. The main agent fixes what it finds.
4. **Deploy** publishes and then fetches the live URL to prove the new content is being served.

---

## 3. The skills, one by one

### 3.1 `onboarding`

**Job:** collect everything needed to build and write the site, in four short rounds. Do not interrogate.

- **Round 1, the business.** Name and what it does, where it operates and who the ideal customer is, and the one action a visitor should take (call, WhatsApp, book, buy, fill a form).
- **Round 2, the money keyword.** The single search term that, if you ranked first for it, would bring paying customers. The skill is told to sharpen vague keywords ("marketing") into what a buyer types ("performance marketing agency in Chennai"). Up to four supporting keywords and a few competitors are optional.
- **Round 3, EEAT proof.** The face of the business, years in business, credentials, achievements, numbers, and two or three real testimonials. The rule here is the backbone of the whole project: record answers exactly as given, never round up, never fill gaps. If the client has nothing for a question, that section is left off the site. An empty section is fine. A fake one is not.
- **Round 4, reference screenshots.** Pictures of sites the client wants theirs to look like, saved into `client/references/`, with a note on what they liked.

**Output:** `client/profile.md`, following `profile-template.md`. The agent shows a short summary, asks you to confirm, and stops. It does not start building until you say so.

In this repository the profile was built for SortedLaunch. Because the session could not fetch the client's own websites directly, the facts came from web search results and are marked in the profile as needing verification against the live sites. Testimonials are marked "pending verbatim text", so none appear on the site yet.

### 3.2 `build-website`

**Job:** produce the complete site from the profile and the screenshots.

Before writing anything, the skill makes the agent read the profile, look at every reference image, read `build-spec.md`, and load the content-writer skill. `build-spec.md` is the binding specification. It lists:

- The five required pages: home, about, services, blog listing, contact, plus four blog posts of 2000 words each.
- Per-page requirements: unique title tag under 60 characters, unique meta description under 155 characters, exactly one H1 containing the page's keyword, the keyword in the first 100 words, logical H2/H3 headings, a 3 to 5 question FAQ section, and specific schema types for each page.
- Site-wide proof requirements: an about page that states real experience and credentials, author bylines on posts, genuine contact details.
- A working contact form with validation and a visible success state.
- Performance limits: no frameworks, no CDN scripts, compressed images, nothing that blocks rendering, mobile-first.
- A summary table at the end: Page, Title Tag, Meta Description, Target Keyword, Schema Types.

In the static edition the agent writes the HTML itself. In the Next.js edition the same skill fills typed content files instead, and the engine renders them. Section 6 explains why that matters.

### 3.3 `aeo-content-writer`

**Job:** write every piece of text on the site, from a 2000-word post down to a button label. The rule in `CLAUDE.md` and `.claude/rules/content.md` is that nothing in the site may be written or edited without this skill loaded first.

It has three supporting files:

- `SKILL.md` describes the structure that answer engines read (covered in section 4).
- `writing-rules.md` is a long list of banned phrasing. It forbids fake insight framing ("What nobody tells you is..."), tease-and-reveal sentences ("Here's the kicker"), performative honesty ("To be honest..."), formulaic reframes ("It's not about X, it's about Y"), forced groups of three, machine-gun fragments ("Simple. Fast. Effective."), generic openers, era-based introductions ("In today's fast-paced world"), overused AI vocabulary (delve, seamless, robust, cutting-edge, and about ninety more), empty business language, vague promises, absolute claims, cliché metaphors, motivational-speaker endings, and em dashes. It ends with a self-check the agent must run before showing any copy.
- `aeo-checklist.md` is the pre-publish checklist per page.

Why this matters: AI-written copy has a recognisable sound, and both human readers and search quality systems have learned to distrust it. The rules push the copy toward specific nouns, concrete numbers, mechanisms and examples, and away from rhythm and hype.

### 3.4 `deploy-hostinger` (static edition) and `deploy-vercel` (Next.js edition)

**Job:** publish, then prove it worked.

The static edition runs `scripts/deploy.sh`, which reads `.env`, syncs `site/` to the server with rsync over SSH, and fetches the live domain. The skill never handles the password directly; the script reads it from `.env`. The rules forbid printing the password anywhere, forbid hand-written ssh commands, and require explicit confirmation before deleting remote files.

The Next.js edition uses the Vercel CLI or the Git integration. Production environment variables are added with `npx vercel env add`, which prompts for the value so it never appears in chat or logs. The skill refuses to deploy a build that failed locally.

### 3.5 The `site-reviewer` sub-agent

This is a second agent with its own instructions and only three tools: Read, Grep, Glob. It cannot edit anything. Its job is to check the main agent's work with fresh eyes:

1. **Slop check.** Grep every page for the banned phrases and vocabulary, then read the copy and judge the things grep cannot catch.
2. **EEAT truth check.** Every number, year, award, credential, testimonial and named person must appear in `client/profile.md`. Anything else is reported as INVENTED, the highest severity.
3. **AEO structure check.** One H1 with the keyword, keyword in the first 100 words, a 40 to 60 word answer at the top, question-shaped H2s, 3 to 5 FAQs, FAQ schema matching the visible text, title and description lengths, breadcrumb schema, valid JSON-LD.
4. **Performance check.** No external frameworks, no render-blocking scripts, proper HTML landmarks.

It reports one line per finding with the file, line, severity and a suggested replacement. On this project it found about twenty claims the profile could not support (an NDA offer, recorded demos, working-hour overlap, extra countries, project internals) and they were all removed. That is the review step doing its job.

---

## 4. What AEO means and how the site is built for it

AEO stands for Answer Engine Optimisation. Classic SEO aims to rank a page in a list of ten blue links. AEO aims to have a page's own sentences quoted inside an AI answer (Google AI Overviews, ChatGPT, Perplexity, Gemini) and in featured snippets. Answer engines do not read a page the way a person does. They extract passages. So the page is built out of passages that stand on their own.

Every page and post in this project follows the same pattern:

**Answer first.** The page opens with a 40 to 60 word paragraph that answers the page's question completely, names the business, says what it does and where. It sits in a visually distinct "answer box". An engine can lift it verbatim. Example from the home page:

> SortedLaunch is a remote, one-person engineering practice run by Manish Saraan from India for founders in the US, UK and Europe. I fix vibe coded apps built with Cursor, Lovable, Bolt or v0, build SaaS MVPs in 3 to 6 weeks, and add AI automation to running SaaS products, at a fixed price agreed before work starts.

**Entity clarity.** Business name, what it does and where it operates appear in the first 100 words in plain words a machine can parse.

**Question-shaped headings.** H2s are written the way buyers ask: "How much does it cost to fix a vibe coded app?", "How long does a project take?". The first sentence under each heading answers it.

**Self-contained FAQs.** Every page has 3 to 5 real questions with 2 to 4 sentence answers that make sense on their own. The same text is emitted as FAQPage structured data, word for word, so the visible answer and the machine-readable answer never disagree.

**Scannable facts.** Numbers, prices, timeframes and mechanisms beat adjectives. "Scoping takes 2 to 3 days and ends with a fixed quote" is quotable. "Fast and transparent" is not.

**One idea per paragraph.** Engines extract paragraphs, not essays.

**Speakable markup.** Each page's answer box is marked in schema as `speakable`, which tells voice assistants and answer engines which part of the page to read aloud or quote.

**Proof the engine can verify.** EEAT stands for Experience, Expertise, Authoritativeness, Trust. Google's quality guidelines reward pages that show who wrote them and why they should be believed. Here that means: a real named author on every post with a role and credentials, a Person entity in schema linked to the author's public profiles (GitHub, LinkedIn, X, personal site), an about page that states years, numbers and case studies, and the hard rule that none of it may be invented.

---

## 5. The SEO work that is already done

This is the full list of what each page carries. In the static edition it was written into the HTML. In the Next.js edition the engine produces it automatically from the content files.

**In the `<head>` of every page**

- A unique title under 60 characters with the page's keyword
- A unique meta description under 155 characters with the keyword and a concrete value proposition
- A canonical URL, so duplicates (with and without `www`, with and without `index.html`) point at one address
- Open Graph and Twitter card tags with a 1200×630 share image, so links look right on LinkedIn, X and Slack
- An author tag and an RSS link
- One stylesheet, no web fonts, no external scripts, one small JavaScript file loaded with `defer`

**Structured data (JSON-LD) per page**

| Page | Schema types |
|---|---|
| Home | Organization (with logo, founder, areas served, social profiles), WebSite, Person, WebPage, FAQPage, BreadcrumbList |
| About | AboutPage with the Person as main entity, Organization, FAQPage, BreadcrumbList |
| Services | A Service node per service, an OfferCatalog with prices, Organization, FAQPage, BreadcrumbList |
| Blog listing | Blog, CollectionPage, FAQPage, BreadcrumbList |
| Each post | BlogPosting with author, publisher, word count, image and speakable; Blog; FAQPage; BreadcrumbList |
| Contact | ContactPage, Organization with a ContactPoint, FAQPage, BreadcrumbList |

All nodes share stable identifiers (`#organization`, `#website`, `#founder`) so engines understand that the author of the posts is the founder of the organisation that owns the site.

**Site level**

- `sitemap.xml` listing every page, `robots.txt` pointing at it
- `feed.xml`, an RSS feed of the posts
- A 404 page with links to the main pages
- In the static edition, an `.htaccess` that forces HTTPS and the non-www host, sets security headers, caching and compression. In the Next.js edition, the same headers come from `next.config.ts`.
- Keyword mapping with no overlap: the home page targets the commercial phrase ("fix vibe coded app"), the repair guide targets the informational phrase ("how to fix a vibe coded app"), and every other page and post has its own term. Two pages chasing the same keyword compete with each other, so this was fixed during review.
- Internal links in both directions: every post links to the services and about pages, the home page and footer link to every post.
- External citations in every post to a credible source (OWASP, Supabase and Stripe documentation, NIST, The Lean Startup), which is part of EEAT.

**Performance**

The pages are small, text-first, and need nothing from a third party to render. There are no frameworks, no font downloads, no tracking scripts. This is the cheapest and most reliable way to pass Core Web Vitals.

---

## 6. How the Next.js edition works and why it is built the way it is

The static edition asks the agent to write HTML for every page. That works, but it has a weakness: every time the agent writes a page, it can get the structure slightly wrong, forget a schema node, or misplace a canonical tag. The reviewer catches most of it, but prevention beats review.

The Next.js edition separates the two things the agent is good and bad at:

- **Words and facts** go into `content/`. This is the only place the agent writes.
- **Structure** lives in `app/`, `components/` and `lib/`. This is the engine. It was written once, tested, and the agent is told not to touch it.

```
nextjs-ai-agent/
├── CLAUDE.md                 handbook for the agent
├── .claude/                  skills, rules, reviewer, commands, permissions
├── client/                   profile.md and reference screenshots
├── content/
│   ├── site.ts               business facts, founder, navigation, footer, theme colours and fonts
│   ├── pages.ts              the five page objects: title, description, keyword, h1, answer, sections, FAQs
│   └── posts/*.md            blog posts: frontmatter (title, description, keyword, summary, FAQs) + markdown body
├── app/                      routes, metadata, sitemap, robots, feed, OG images, contact API, 404
├── components/               header, footer, page renderer, section types, FAQ, contact form
├── lib/                      types, schema builders, SEO helpers, markdown and post loaders
└── scripts/check-seo.mjs     the automated content check
```

**What a page object looks like.** Each page in `pages.ts` is a typed object: a title, a description, a keyword, an H1, a 40 to 60 word answer, a list of sections, 3 to 5 FAQs and a closing call to action. Sections are chosen from a small menu of types: `cards`, `stats`, `steps`, `prose`, `pricing`, `posts`. The agent picks the mix that matches the reference screenshots. Because the type system checks the shape, a missing field is a build error, not a silent omission.

**What the engine does with it.** For each page the engine emits the title, description, canonical URL, Open Graph tags, a generated share image, the JSON-LD graph for that page type, the visible breadcrumb, the answer box, the sections, the FAQ with matching FAQPage schema, and the call to action. A post gets a byline with the author's credentials, a table of contents generated from its headings, the answer box, the body, its FAQs, an author card, and BlogPosting schema with the word count filled in.

**The automated check.** `npm run check` reads the content files and reports: titles over 60 characters, descriptions over 155, answers outside 40 to 60 words, posts under 2000 words, FAQ counts outside 3 to 5, missing internal or external links, em dashes, banned phrases, and any leftover placeholder text. The placeholder content that ships with the scaffold fails this check on purpose, so a site cannot be deployed before it has been built.

**The contact form.** The form posts to `/api/contact`, which validates server-side, ignores bots through a hidden honeypot field, and sends the message through Resend when `RESEND_API_KEY` and `CONTACT_TO_EMAIL` are set. When they are not set it returns an honest "not connected" message. It never fakes a success.

**The theme.** Colours and fonts are tokens in `site.ts`, applied as CSS variables on the `<html>` element. The agent changes a handful of values to match the client's references rather than rewriting a stylesheet.

### Kickstarting a new site with the Next.js edition

1. Copy `nextjs-ai-agent/` into its own folder and open it in Claude Code. Its own `CLAUDE.md` loads.
2. Run `npm install`, copy `.env.example` to `.env.local`.
3. Say "Let's get started". Because `client/profile.md` does not exist, the agent runs onboarding and asks the same four rounds of questions. Confirm the summary.
4. Say "build". The agent reads the profile and screenshots, loads the content-writer skill, fills `site.ts`, `pages.ts` and four posts, deletes the example post, runs `npm run check` and `npm run build`, runs the reviewer, fixes findings, and shows the summary table.
5. Run `npm run dev` and open http://localhost:3000 to preview.
6. Say "deploy". The agent walks through `npx vercel login`, `npx vercel link`, the environment variables, and `npx vercel --prod`, then fetches the live URL and reports the status.

---

## 7. The safety rules and why each one exists

| Rule | Where it lives | Why |
|---|---|---|
| No copy without the content-writer skill loaded | `CLAUDE.md`, `rules/content.md` | Stops the model from writing "normal" AI prose when it is in a hurry. |
| Every fact traces to `client/profile.md` | `CLAUDE.md`, `rules/content.md`, reviewer step 2 | Invented reviews, numbers or credentials are the fastest way to lose trust and, in some places, break the law. |
| No em dashes, no banned phrases | `writing-rules.md`, `check-seo.mjs` | The two most reliable tells of machine-written text. |
| Run the reviewer before offering to deploy | `CLAUDE.md` | A second agent with fresh context catches what the first one rationalised. |
| Never print the SSH password or API keys | `rules/deployment.md`, both deploy skills | Secrets printed in chat end up in logs and transcripts. |
| Deploy only `site/`, verify with a fetch | `rules/deployment.md` | The agent should never touch other folders on a shared server, and "I deployed" means nothing without proof. |
| Deleting remote files needs explicit confirmation | `rules/deployment.md` | A sync with delete on the wrong path erases a client's other site. |
| Ask before deploying, never deploy on its own | both build skills | Publishing is outward-facing and hard to undo. |

---

## 8. How the pieces are wired together in Claude Code

A few mechanics worth knowing, because they explain why the files are named and placed the way they are:

- **`CLAUDE.md` is always loaded.** It must stay short and point to the skills rather than repeat them.
- **A skill's `SKILL.md` has a `description` in its header.** Claude uses that description to decide when to load the skill, so the description lists trigger words ("build", "deploy", "write copy"). The body is only read after the skill is chosen. Supporting files (`writing-rules.md`, `build-spec.md`) are read by the skill's instructions, not automatically.
- **Rules in `.claude/rules/` are always on.** Keep them to one line per rule.
- **The reviewer agent's header lists `tools: Read, Grep, Glob`.** That is what makes it read-only. It also gets its own memory file under `.claude/agent-memory/`, where recurring findings can accumulate across reviews.
- **Commands in `.claude/commands/` are one-paragraph prompts.** `/build` simply says "load the build-website skill and follow it, then do not deploy".
- **`settings.json` pre-approves safe commands** (the deploy script, `curl` to https URLs, `npm run`), so the agent is not interrupted for routine steps, while anything unusual still asks.
- **The stop hook** in this environment checks for uncommitted or unpushed work when the agent finishes a turn, which is why every stage was committed and pushed.

---

## 9. How to extend the agent

**Add a page type.** Next.js edition: add a section type to `lib/types.ts`, render it in `components/Sections.tsx`, mention it in `build-website/SKILL.md`. Static edition: describe it in `build-spec.md`.

**Add a skill.** Create `.claude/skills/<name>/SKILL.md` with a header (`name`, `description` with trigger words) and a numbered procedure. Reference it from `CLAUDE.md` if it belongs in the main workflow. Keep facts it needs in files it reads, not in the skill body.

**Change the writing standard.** Edit `writing-rules.md`. Both the content-writer skill and the check script read it, so a new banned phrase takes effect everywhere at once.

**Add a check.** Static edition: extend the reviewer agent's instructions. Next.js edition: add it to `scripts/check-seo.mjs` so it runs on every build, and to the reviewer for the judgement calls a script cannot make.

**Swap the host.** Write a new deploy skill (`deploy-netlify`, `deploy-cloudflare`), point the `/deploy` command at it, and update `rules/deployment.md`. Nothing else changes.

---

## 10. Glossary

- **Agent:** a language model allowed to use tools, guided by instruction files.
- **Skill:** a folder of instructions for one job, loaded when that job starts.
- **Sub-agent:** a separate agent with its own instructions and tools, started by the main agent for a bounded task such as review.
- **AEO:** Answer Engine Optimisation. Writing so AI answers and featured snippets can quote the page.
- **EEAT:** Experience, Expertise, Authoritativeness, Trust. Google's label for the proof signals that make a page believable.
- **Money keyword:** the one search term that, ranked first, brings paying customers.
- **JSON-LD / schema / structured data:** a block of machine-readable facts in the page head, using the vocabulary at schema.org, so engines know what the page is about without guessing.
- **Canonical URL:** the one official address for a page, so copies at other addresses do not split its ranking.
- **Open Graph:** the tags that control how a link looks when shared on social platforms.
- **Answer box:** the 40 to 60 word opening paragraph that answers the page's question completely.
- **Speakable:** schema that marks which part of a page is suitable to be read aloud or quoted.
- **Vibe coded app:** an app built mainly by prompting AI coding tools. The money keyword of the example client in this repository.

---

## 11. State of this repository right now

- `client/profile.md`: SortedLaunch profile, with testimonials and contact email pending from the client, and facts marked for verification against the live sites.
- `site/`: nine pages built, reviewed, and fixed; share image, logo, 404, `.htaccess`, sitemap, RSS in place. Needs a Formspree form ID, the `.env` for Hostinger, and testimonial quotes before deploy.
- `nextjs-ai-agent/`: complete standalone edition with placeholder content; builds and serves correctly; waiting for a client interview to fill it.
- Branch: `claude/intelligent-brown-oo1y7q`, all work pushed.
