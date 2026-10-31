import type { Faq as FaqItem } from "@/lib/types";

export function Faq({ faqs, heading = "Frequently asked questions", wrap = true }: { faqs: FaqItem[]; heading?: string; wrap?: boolean }) {
  if (!faqs.length) return null;
  const inner = (
    <>
      <h2 id="faq-h">{heading}</h2>
      {faqs.map((f) => (
        <details key={f.q}>
          <summary>{f.q}</summary>
          <p>{f.a}</p>
        </details>
      ))}
    </>
  );
  return (
    <section className="faq" id="faq" aria-labelledby="faq-h">
      {wrap ? <div className="wrap">{inner}</div> : inner}
    </section>
  );
}
