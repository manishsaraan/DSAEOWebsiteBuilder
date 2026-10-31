---
name: aeo-content-writer
description: Write AEO-optimized, EEAT-backed website copy for the client. MUST be loaded before writing or editing any text in site/ — headlines, section copy, FAQs, meta tags, schema text, blog posts. Triggers: "write content", "write copy", "rewrite this section", any copy work.
---

# AEO content writer

Purpose: copy that ranks in Google AND gets cited by AI answer engines (ChatGPT, Perplexity, Gemini, Google AI Overviews), written like an intelligent human with a point of view.

## Before writing a single word

1. Read `client/profile.md`. No profile, no copy — run `onboarding` first.
2. Read `writing-rules.md` in this skill folder. Every rule in it is binding for every piece of copy, from a button label to a 2000-word post.
3. Know the target: one page (or post) targets exactly one primary keyword. Confirm which one before writing.

## AEO structure (how answer engines read a page)

- **Answer first.** Open every page and every major section with a direct, self-contained answer: 40–60 words that could be lifted verbatim into an AI answer. Context and detail come after, never before.
- **Question-shaped H2s.** Use headings that match what real buyers ask around the money keyword ("How much does teeth whitening cost in Chennai?"), then answer immediately in the first sentence under the heading.
- **Entity clarity.** Business name, what it does, and where it operates appear in the first 100 words of every page, in plain words a machine can parse.
- **FAQ sections.** 3–5 real questions per page, People-Also-Ask style. Each answer stands alone in 2–4 sentences. These feed the FAQPage JSON-LD.
- **Scannable facts.** Specific numbers, prices, timeframes, and mechanisms beat adjectives. "Results in 6–8 weeks" is quotable; "fast results" is not.
- **One idea per paragraph, 1–3 sentences each.** Answer engines extract paragraphs, not essays.

## EEAT (what makes the copy trusted)

- Attribute pages and posts to the real person from the profile: name, role, credential, in a byline and in schema.
- Use the EEAT proof from `client/profile.md` exactly as recorded — years, numbers, awards, testimonials, sources. If the profile doesn't contain a fact, the copy doesn't claim it. Never invent statistics, reviews, credentials, or "studies show".
- First-hand experience beats generic advice: write from what this business has actually done ("across 214 smile makeovers we've done since 2016...") wherever the profile supports it.
- Every blog post cites at least one credible external source or documented first-hand result.

## Before returning any copy

Run the final self-check at the end of `writing-rules.md` on everything you wrote, then check `aeo-checklist.md`. Rewrite whatever fails. Only then show the copy.
