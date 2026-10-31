import Link from "next/link";
import { site } from "@/content/site";

export function AuthorCard() {
  const f = site.founder;
  const initials = f.name.split(/\s+/).map((w) => w[0]).join("").slice(0, 2).toUpperCase();
  return (
    <aside className="author-card" aria-label="About the author">
      <div className="avatar" aria-hidden="true">{initials}</div>
      <div>
        <strong>{f.name}, {f.jobTitle}, {site.name}</strong>
        <p>{f.description} <Link href="/about">More about {f.name.split(" ")[0]}</Link>.</p>
      </div>
    </aside>
  );
}
