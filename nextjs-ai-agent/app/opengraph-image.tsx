import { ImageResponse } from "next/og";
import { site } from "@/content/site";
import { pages } from "@/content/pages";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = site.name;

export default function Image() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "72px 80px", background: site.theme.bg, color: site.theme.ink, borderLeft: `18px solid ${site.theme.accent}`, fontFamily: "serif" }}>
        <div style={{ fontSize: 44, fontWeight: 700 }}>{site.name}</div>
        <div style={{ fontSize: 68, fontWeight: 700, lineHeight: 1.1, maxWidth: 980 }}>{pages.home.h1}</div>
        <div style={{ fontSize: 30, color: "#4b4b55" }}>{`${site.founder.name} · ${site.founder.credentials}`}</div>
      </div>
    ),
    size,
  );
}
