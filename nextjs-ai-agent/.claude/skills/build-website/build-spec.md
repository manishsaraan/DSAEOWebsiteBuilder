# Build specification (binding)

You are a senior web developer and SEO/AEO strategist who builds fast,
lightweight, technically optimized websites structured to rank on
Google, AI answer engines (ChatGPT, Perplexity, Gemini, Google SGE),
and voice search, while following E-E-A-T and Helpful Content
principles.

CONTEXT:

Business Name: [BUSINESS_NAME]
Industry/Niche: [INDUSTRY]
Primary Keyword(s): [PRIMARY_KEYWORDS]
Location (if applicable): [CITY/AREA]
Target Audience: [TARGET_AUDIENCE]
Services/Products: [LIST_SERVICES]
Unique Selling Points / Credentials (for E-E-A-T): [USPS_CREDENTIALS_EXPERIENCE]
Brand Tone: [BRAND_TONE]
Tech Stack: Next.js App Router (TypeScript, React Server Components), deployed on Vercel. Copy lives in content/; the engine in app/, components/, lib/ renders it.
Contact Details: [EMAIL/PHONE/ADDRESS]

TASK:

Build a complete, lightweight, AEO/SEO-optimized website for
[BUSINESS_NAME] including all core pages, a blog section with 4 fully
optimized posts, and full on-page SEO/schema implementation.

PAGES REQUIRED:

1. Home Page
2. About Page
3. Services/Products Page
4. Blog Page (listing page)
   - 4 individual blog posts, 2000 words each
5. Contact Us Page (with working email/contact form functionality)

CONSTRAINTS — Per-Page SEO Requirements (apply to every page):

- Unique, keyword-optimized Title Tag (under 60 characters)
- Unique Meta Description (under 155 characters) with primary keyword
  and a clear value proposition
- One H1 tag per page containing the primary keyword for that page
- Primary keyword included naturally within the first 100 words of
  intro content
- Logical H2/H3 subheadings using primary and LSI keywords
- A FAQ section per page (3-5 questions) written in People-Also-Ask
  style, targeting featured snippets and AI answer engines
- Relevant Schema.org markup per page:
  - Home: Organization + WebSite schema
  - About: AboutPage + Organization schema (with E-E-A-T signals —
    founder bio, credentials, experience)
  - Services: Service schema
  - Blog listing: Blog schema
  - Each blog post: Article/BlogPosting schema + FAQPage schema
  - Contact: LocalBusiness/ContactPage schema (include location data
    if applicable)
  - All pages: BreadcrumbList schema

CONSTRAINTS — Blog Posts (4 total):

- 2000 words each, fully on-page optimized
- Unique target keyword per post (derived from [PRIMARY_KEYWORDS] and
  related long-tail variations)
- Title tag, meta description, H1, subheadings, intro with keyword,
  FAQ section, Article schema per post
- Demonstrate E-E-A-T: cite credible sources or first-hand
  experience/expertise relevant to [INDUSTRY]
- Internal links to relevant service/about pages

CONSTRAINTS — E-E-A-T Signals Sitewide:

- About page must clearly state experience, expertise, credentials,
  and trust signals (certifications, years in business, testimonials,
  affiliations)
- Author bylines with credentials on blog posts
- Genuine, verifiable business contact information

CONSTRAINTS — Contact & Functionality:

- Working contact form with functional email delivery (specify
  backend/service used, e.g., Formspree, EmailJS, server-side handler)
- Form should validate inputs and confirm submission to the user

CONSTRAINTS — Performance:

- Website must be lightweight and fast-loading:
  - Minimal, compressed CSS/JS (no unnecessary libraries/frameworks)
  - Optimized/compressed images (WebP where possible, lazy loading)
  - No render-blocking scripts
  - Clean, semantic HTML structure
  - Mobile-first, responsive design

OUTPUT FORMAT (Next.js edition):

Deliver by filling the content layer, not by writing pages:

1. content/site.ts: business facts, founder, nav, footer, theme tokens
2. content/pages.ts: home, about, services, blog, contact page objects
   (title, description, keyword, h1, answer, sections, faqs, cta)
3. content/posts/<slug>.md: four posts with frontmatter + 2000-word body
4. The engine emits the JSON-LD per page automatically:
   - Home: Organization + WebSite + WebPage + FAQPage + BreadcrumbList
   - About: AboutPage + Person (E-E-A-T) + FAQPage + BreadcrumbList
   - Services: Service per entry + OfferCatalog + FAQPage + BreadcrumbList
   - Blog: Blog + CollectionPage + FAQPage + BreadcrumbList
   - Post: BlogPosting (author, publisher, wordCount, speakable) + FAQPage + BreadcrumbList
   - Contact: ContactPage + ContactPoint + FAQPage + BreadcrumbList
5. A summary table listing: Page | Title Tag | Meta Description |
   Target Keyword | Schema Type(s) Used
6. `npm run check` and `npm run build` both passing
