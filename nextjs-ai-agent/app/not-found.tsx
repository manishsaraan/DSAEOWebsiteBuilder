import Link from "next/link";
import { site } from "@/content/site";

export const metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <section className="hero">
      <div className="wrap">
        <h1>That page does not exist</h1>
        <p className="lede">The link may be old, or the address may have a typo. The pages below cover most of what people come here for.</p>
        <ul>
          {site.nav.map((n) => <li key={n.href}><Link href={n.href}>{n.label}</Link></li>)}
          <li><Link href={site.cta.href}>{site.cta.label}</Link></li>
        </ul>
      </div>
    </section>
  );
}
