import { pages } from "@/content/pages";
import { contactForm } from "@/content/site";
import { Page } from "@/components/Page";
import { ContactForm } from "@/components/ContactForm";
import { pageMetadata } from "@/lib/seo";
import { breadcrumb, faqPage, graph, organization, pageSpeakable, person, webPage, website } from "@/lib/schema";
import { absolute } from "@/lib/site";
import { site } from "@/content/site";
import { inlineMd } from "@/components/Sections";

export const metadata = pageMetadata(pages.contact, "/contact");

const crumbs = [{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }];

export default function Contact() {
  const page = pages.contact;
  const schema = graph([
    webPage("ContactPage", "/contact", page.title, { speakable: pageSpeakable() }),
    breadcrumb(crumbs),
    faqPage(page.faqs),
    organization({
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        url: absolute("/contact"),
        areaServed: site.areaServed,
        ...(site.org.email ? { email: site.org.email } : {}),
        ...(site.org.phone ? { telephone: site.org.phone } : {}),
      },
    }),
    website(),
    person(),
  ]);
  return (
    <Page page={page} schema={schema} crumbs={crumbs}>
      <section aria-labelledby="form-h">
        <div className="wrap">
          <div className="contact-grid">
            <div>
              <h2 id="form-h" className="mt-0">{contactForm.heading}</h2>
              <ContactForm projectOptions={contactForm.projectOptions} successText={contactForm.successText} />
            </div>
            <div>
              {contactForm.asides.map((a) => (
                <div className="card" key={a.title}>
                  <h3>{a.title}</h3>
                  {a.items && (
                    <ul>
                      {a.items.map((it) => (
                        <li key={it.label}>{it.href ? <a href={it.href} rel="me noopener">{it.label}</a> : it.label}</li>
                      ))}
                    </ul>
                  )}
                  {a.steps && <ol>{a.steps.map((s) => <li key={s}>{s}</li>)}</ol>}
                  {a.note && <p className="small muted" dangerouslySetInnerHTML={{ __html: inlineMd(a.note) }} />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Page>
  );
}
