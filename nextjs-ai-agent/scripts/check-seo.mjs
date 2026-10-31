#!/usr/bin/env node
/* Content checks for the Next.js edition. Run with `npm run check`. Exit 1 on errors. */
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const root = process.cwd();
const errors = [];
const warnings = [];
const err = (f, m) => errors.push(`${f}: ${m}`);
const warn = (f, m) => warnings.push(`${f}: ${m}`);

const words = (s) => String(s).replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;

// Banned phrases and vocabulary from the writing rules.
const rulesPath = path.join(root, ".claude/skills/aeo-content-writer/writing-rules.md");
let phrases = [];
let vocab = [];
if (fs.existsSync(rulesPath)) {
  const rules = fs.readFileSync(rulesPath, "utf8");
  phrases = rules
    .split("\n")
    .filter((l) => l.startsWith('- "') && l.endsWith('"'))
    .map((l) => l.slice(3, -1).replace(/\.\.\./g, "").replace(/\.$/, "").trim())
    .filter((p) => p.length > 8);
  const m = rules.match(/## 11\.[\s\S]*?\n\n([\s\S]*?)\n\n/);
  if (m) vocab = m[1].split(",").map((w) => w.trim()).filter(Boolean);
}

function scanText(file, text, label = "") {
  if (text.includes("—")) err(file, `${label}em dash found`);
  if (/PLACEHOLDER/.test(text)) err(file, `${label}leftover PLACEHOLDER text`);
  for (const p of phrases) {
    const re = new RegExp("(^|[^a-z])" + p.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "(?![a-z])", "i");
    if (re.test(text)) warn(file, `${label}banned phrase "${p}"`);
  }
  for (const w of vocab) {
    const re = new RegExp("\\b" + w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "\\b", "i");
    if (re.test(text)) warn(file, `${label}overused word "${w}"`);
  }
}

// content/site.ts and content/pages.ts: text scan plus field length checks via regex.
for (const rel of ["content/site.ts", "content/pages.ts"]) {
  const file = path.join(root, rel);
  if (!fs.existsSync(file)) { err(rel, "missing"); continue; }
  const src = fs.readFileSync(file, "utf8");
  scanText(rel, src);
  if (rel.endsWith("pages.ts")) {
    const pageNames = ["home", "about", "services", "blog", "contact"];
    for (const name of pageNames) {
      const m = src.match(new RegExp(`\\n\\s*${name}:\\s*\\{([\\s\\S]*?)\\n\\s{2}\\},?\\n`));
      if (!m) { err(rel, `page "${name}" not found`); continue; }
      const block = m[1];
      const field = (k) => { const mm = block.match(new RegExp(`\\b${k}:\\s*"((?:[^"\\\\]|\\\\.)*)"`)); return mm ? mm[1] : null; };
      const title = field("title"), desc = field("description"), h1 = field("h1"), answer = field("answer"), keyword = field("keyword");
      if (!title) err(rel, `${name}: title missing`); else if (title.length >= 60) err(rel, `${name}: title is ${title.length} chars (max 59)`);
      if (!desc) err(rel, `${name}: description missing`); else if (desc.length >= 155) err(rel, `${name}: description is ${desc.length} chars (max 154)`);
      if (!answer) err(rel, `${name}: answer missing`); else { const n = words(answer); if (n < 40 || n > 60) err(rel, `${name}: answer is ${n} words (need 40 to 60)`); }
      if (keyword && h1 && !h1.toLowerCase().includes(keyword.toLowerCase().split(" ")[0])) warn(rel, `${name}: h1 may not contain the keyword "${keyword}"`);
      const faqCount = (block.match(/\bq:\s*"/g) || []).length;
      if (block.includes("faqs,")) { /* shared faqs const; count checked below */ } else if (faqCount && (faqCount < 3 || faqCount > 5)) warn(rel, `${name}: ${faqCount} FAQs (aim for 3 to 5)`);
    }
  }
}

// Posts
const postsDir = path.join(root, "content/posts");
const posts = fs.existsSync(postsDir) ? fs.readdirSync(postsDir).filter((f) => f.endsWith(".md")) : [];
if (posts.length < 4) warn("content/posts", `${posts.length} posts found (spec asks for 4)`);
for (const f of posts) {
  const rel = `content/posts/${f}`;
  const { data, content } = matter(fs.readFileSync(path.join(postsDir, f), "utf8"));
  scanText(rel, JSON.stringify(data) + "\n" + content);
  for (const k of ["title", "description", "keyword", "section", "date", "summary"]) if (!data[k]) err(rel, `frontmatter "${k}" missing`);
  if (data.title && data.title.length >= 60) err(rel, `title is ${data.title.length} chars (max 59)`);
  if (data.description && data.description.length >= 155) err(rel, `description is ${data.description.length} chars (max 154)`);
  if (data.summary) { const n = words(data.summary); if (n < 40 || n > 60) err(rel, `summary is ${n} words (need 40 to 60)`); }
  const faqs = Array.isArray(data.faqs) ? data.faqs : [];
  if (faqs.length < 3 || faqs.length > 5) warn(rel, `${faqs.length} FAQs (aim for 3 to 5)`);
  const n = words(content);
  if (n < 2000) warn(rel, `body is ${n} words (spec asks for 2000+)`);
  if (!/\]\(\/(services|about)/.test(content)) warn(rel, "no internal link to /services or /about");
  if (!/\]\(https?:\/\//.test(content)) warn(rel, "no external source link");
  if (!/^## /m.test(content)) err(rel, "no ## headings");
}

for (const w of warnings) console.log("warn  " + w);
for (const e of errors) console.log("ERROR " + e);
console.log(`\n${errors.length} error(s), ${warnings.length} warning(s)`);
process.exit(errors.length ? 1 : 0);
