---
name: deploy-vercel
description: Publish the Next.js site to Vercel using the Vercel CLI or the connected Git branch, then verify the live URL. Use when the user says "deploy", "publish", "push live", "go live".
---

# Deploy to Vercel

## Preconditions

1. `npm run check` passes with no errors and `npm run build` passes locally. If not, fix first.
2. `content/posts/example-post.md` has been deleted and `npm run check` reports no leftover placeholders.
3. Production environment variables exist in the Vercel project: `NEXT_PUBLIC_SITE_URL` (the live https domain, no trailing slash), and for the contact form `RESEND_API_KEY` and `CONTACT_TO_EMAIL`. Set them with `npx vercel env add NAME production` (the CLI prompts for the value; never paste it into chat or a command line).

## Option A: Vercel CLI (first deploy from this folder)

1. `npx vercel login` (the user completes this in the browser; you cannot do it for them).
2. `npx vercel link` to create or link the Vercel project. Accept the detected Next.js settings.
3. `npx vercel --prod` to build and deploy. Read the production URL from the output.

## Option B: Git integration (recommended for ongoing work)

1. Push this folder's repository to GitHub.
2. The user imports the repository at https://vercel.com/new, keeps the Next.js defaults, and adds the environment variables above.
3. Every push to the production branch deploys. Preview deployments are created for other branches.

## Custom domain

The user adds the domain under the Vercel project's Domains tab and points DNS as Vercel instructs (an A record to Vercel's IP or a CNAME to `cname.vercel-dns.com`). After it resolves, set `NEXT_PUBLIC_SITE_URL` to that domain and redeploy so canonicals, sitemap and JSON-LD use it.

## Verify

1. `curl -s -o /dev/null -w "%{http_code}" https://<domain>/` must return 200.
2. `curl -s https://<domain>/ | grep -o "<title>[^<]*</title>"` must show the new title, not a default page.
3. Check `https://<domain>/sitemap.xml` and `https://<domain>/robots.txt` return 200.
4. Report the live URL and what changed.

## Rules

- Never print, echo, or log `VERCEL_TOKEN`, `RESEND_API_KEY`, or any `.env.local` value.
- Do not run `vercel --prod` on a build that failed locally.
- If deployment fails, read the build log with `npx vercel inspect <deployment-url> --logs` and fix the cause locally before retrying. Do not retry blindly more than twice.
