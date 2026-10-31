import Link from "next/link";

export function Breadcrumbs({ items }: { items: { name: string; path?: string }[] }) {
  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      <ol>
        {items.map((it, i) => (
          <li key={i}>{it.path && i < items.length - 1 ? <Link href={it.path}>{it.name}</Link> : it.name}</li>
        ))}
      </ol>
    </nav>
  );
}
