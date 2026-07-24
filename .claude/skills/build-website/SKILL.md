---
name: build-website
description: Build the client's complete static website in site/ from client/profile.md and the reference screenshots in client/references/. Use when the user says "build", "build the website", "build my site", or after onboarding completes and the user confirms.
---

# Build the website

## Before writing any code

1. Read `client/profile.md`. If it does not exist, stop and run the `onboarding` skill first.
2. Read every image in `client/references/` with the Read tool. These screenshots define the layout: section order, hero composition, spacing, density, color mood. Reproduce the structure and feel — never their brand assets, logos, photos, or copy.
3. Read `build-spec.md` in this skill folder. It is the binding build specification. Fill its `[PLACEHOLDERS]` from `client/profile.md`:
   - `[BUSINESS_NAME]`, `[INDUSTRY]`, `[CITY/AREA]`, `[TARGET_AUDIENCE]`, `[LIST_SERVICES]`, `[EMAIL/PHONE/ADDRESS]` → Business section
   - `[PRIMARY_KEYWORDS]` → money keyword + supporting keywords
   - `[USPS_CREDENTIALS_EXPERIENCE]` → EEAT proof section
   - `[BRAND_TONE]` → Notes section (default: plain, confident, specific)
   - `[TECH_STACK]` → static HTML/CSS/vanilla JS unless the profile says otherwise
4. Load the `aeo-content-writer` skill. Every word of copy on every page and blog post goes through it.

## Build rules

- Everything is built inside `site/`. Structure: one folder or file per page, shared `css/styles.css`, `js/main.js` only if needed, `images/` for assets, `blog/` for the four posts.
- Follow `build-spec.md` exactly: the five core pages, four 2000-word blog posts, per-page SEO constraints, schema types per page, EEAT signals, contact form, and performance constraints are all mandatory.
- Contact form: default to Formspree (`https://formspree.io/f/FORM_ID` placeholder with a clear TODO comment telling the client to create a free Formspree form and paste their ID). Client-side validation plus a visible success state. No fake "message sent" without a real backend wired.
- JSON-LD blocks are embedded per page per the spec. EEAT data inside schema (founder, credentials, reviews) comes verbatim from `client/profile.md`.
- No frameworks, no CDN dependencies, no web fonts unless the reference design demands one (then use one font, preloaded). Inline critical CSS if the page is small enough.
- Images: use the client's own images if provided in `client/references/` or described in the profile; otherwise neutral placeholders with descriptive alt text and a TODO list of images the client should supply. WebP where possible, `loading="lazy"` below the fold.

## After building

1. Produce the summary table required by `build-spec.md`: Page | Title Tag | Meta Description | Target Keyword | Schema Type(s).
2. Run the `site-reviewer` agent on `site/` and fix what it finds.
3. Open `site/index.html` locally for the user to preview, then offer `/deploy`. Never deploy without being asked.
