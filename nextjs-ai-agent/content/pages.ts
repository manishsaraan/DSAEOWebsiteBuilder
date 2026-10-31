import type { PagesContent } from "@/lib/types";

/**
 * PLACEHOLDER CONTENT. The build-website skill rewrites every page below through the
 * aeo-content-writer skill, using only facts from client/profile.md.
 *
 * Rules per page: title under 60 chars, description under 155 chars, h1 contains the keyword,
 * answer is 40 to 60 words, 3 to 5 FAQs with 2 to 4 sentence answers.
 */
const faqs = [
  { q: "PLACEHOLDER: a real question buyers ask?", a: "PLACEHOLDER: a self-contained answer of two to four sentences that could be quoted on its own." },
  { q: "PLACEHOLDER: a second question?", a: "PLACEHOLDER: a second self-contained answer." },
  { q: "PLACEHOLDER: a third question?", a: "PLACEHOLDER: a third self-contained answer." },
];

const cta = { heading: "PLACEHOLDER: closing call to action", body: "PLACEHOLDER: one or two sentences on what happens after they get in touch.", label: "Contact", href: "/contact" };

export const pages: PagesContent = {
  home: {
    title: "PLACEHOLDER Keyword | Your Business",
    description: "PLACEHOLDER: meta description with the money keyword and a concrete value proposition, under 155 characters.",
    keyword: "PLACEHOLDER money keyword",
    eyebrow: "Your Business",
    h1: "PLACEHOLDER: H1 containing the money keyword",
    answer: "PLACEHOLDER: a 40 to 60 word direct answer naming the business, what it does, where it operates and for whom, written so an AI answer engine could quote it verbatim. Replace this text entirely with profile-backed copy before publishing anything at all.",
    lede: "PLACEHOLDER: one supporting sentence with a profile-backed proof point.",
    buttons: [{ label: "Contact", href: "/contact" }, { label: "Read the guides", href: "/blog", ghost: true }],
    sections: [
      { type: "cards", id: "what", heading: "PLACEHOLDER: question-shaped heading?", intro: "PLACEHOLDER intro.", cards: [{ title: "PLACEHOLDER card", body: "PLACEHOLDER body." }, { title: "PLACEHOLDER card 2", body: "PLACEHOLDER body." }, { title: "PLACEHOLDER card 3", body: "PLACEHOLDER body." }] },
      { type: "steps", id: "process", heading: "PLACEHOLDER: how does it work?", alt: true, steps: [{ title: "Step one", body: "PLACEHOLDER." }, { title: "Step two", body: "PLACEHOLDER." }, { title: "Step three", body: "PLACEHOLDER." }] },
      { type: "posts", id: "posts", heading: "Latest guides", intro: "PLACEHOLDER intro. [All articles](/blog)." },
    ],
    faqs,
    cta,
  },
  about: {
    title: "About Your Business",
    description: "PLACEHOLDER: who is behind the business, with the profile's years, numbers and credentials.",
    keyword: "about Your Business",
    eyebrow: "About",
    h1: "About Your Business",
    answer: "PLACEHOLDER: a 40 to 60 word answer stating who runs the business, their role, years of experience and the one or two proof points that matter most, all taken from the client profile exactly as recorded there and nothing more than that at all.",
    sections: [
      { type: "prose", id: "story", heading: "PLACEHOLDER: why this business exists?", markdown: "PLACEHOLDER paragraphs in markdown. Links like [services](/services) are fine." },
    ],
    faqs,
    cta,
  },
  services: {
    title: "Services | Your Business",
    description: "PLACEHOLDER: what you offer, timelines and starting prices if the profile records them.",
    keyword: "PLACEHOLDER services keyword",
    eyebrow: "Services",
    h1: "PLACEHOLDER: services H1 with the keyword",
    answer: "PLACEHOLDER: a 40 to 60 word summary of the services, who they are for, where they are delivered, and how pricing works, using only what the profile records and leaving out anything that is not written there in plain words for this purpose.",
    services: [
      { id: "one", name: "PLACEHOLDER service one", description: "PLACEHOLDER description for Service schema." },
    ],
    sections: [
      { type: "cards", id: "one", heading: "PLACEHOLDER service one", eyebrow: "Service 1", intro: "PLACEHOLDER.", cards: [{ title: "What is included", bullets: ["PLACEHOLDER", "PLACEHOLDER"], body: "" }] },
      { type: "pricing", id: "pricing", heading: "How much does it cost?", intro: "PLACEHOLDER.", cards: [{ meta: "One-time", title: "PLACEHOLDER plan", price: "From $0", bullets: ["PLACEHOLDER"], cta: { label: "Contact", href: "/contact" }, offer: { price: "0", currency: "USD", description: "PLACEHOLDER" } }] },
    ],
    faqs,
    cta,
  },
  blog: {
    title: "Blog | Your Business",
    description: "PLACEHOLDER: what the guides cover and who writes them.",
    keyword: "PLACEHOLDER blog keyword",
    eyebrow: "Blog",
    h1: "PLACEHOLDER: blog H1 with the keyword",
    answer: "PLACEHOLDER: a 40 to 60 word description of the blog, its topics, and the author with their credentials, written in plain words for a machine to parse and a reader to trust, and containing only facts that the client profile actually records.",
    sections: [],
    faqs,
    cta,
  },
  contact: {
    title: "Contact Your Business",
    description: "PLACEHOLDER: how to get in touch and what happens next.",
    keyword: "contact Your Business",
    eyebrow: "Contact",
    h1: "Contact Your Business",
    answer: "PLACEHOLDER: a 40 to 60 word answer saying how to contact the business, who reads the message, how they reply, where the business operates, and what the first step of working together looks like, using only what the profile records.",
    sections: [],
    faqs,
  },
};
