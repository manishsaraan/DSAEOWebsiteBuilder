"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/content/site";

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  // CamelCase names like "SortedLaunch" get the second part in the accent colour.
  const m = site.name.match(/^([A-Z][a-z]+)([A-Z].*)$/);
  const first = m ? m[1] : site.name;
  const rest = m ? m[2] : "";
  return (
    <header className="site-header">
      <div className="wrap">
        <Link className="brand" href="/">
          {first}
          <span>{rest}</span>
        </Link>
        <button className="nav-toggle" aria-expanded={open} aria-controls="site-nav" onClick={() => setOpen((v) => !v)}>
          Menu
        </button>
        <nav className={"site-nav" + (open ? " is-open" : "")} id="site-nav" aria-label="Main">
          <ul>
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} aria-current={pathname === item.href ? "page" : undefined} onClick={() => setOpen(false)}>
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link className="btn" href={site.cta.href} onClick={() => setOpen(false)}>
                {site.cta.label}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
