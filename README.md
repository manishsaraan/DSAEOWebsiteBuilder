# WebsiteAgent

WebsiteAgent is a reusable starter project for building and deploying static, AEO-focused business websites with Claude/Codex-style project skills. It guides a client through onboarding, collects the business facts that matter for search and trust, builds the website in `site/`, reviews it for quality, and deploys it to Hostinger over SSH.

The goal is simple: download this folder, add your hosting credentials, start the prompt, answer the onboarding questions, and let the project workflow build the site.

## Get Discounted Hosting

If you need Hostinger hosting, you can get discounted hosting here:

https://rishi.store/hostinger

Use coupon code `SORAVJAIN` for an extra 10% off.

## Quick Start

1. Download or clone this repository.
2. Open the folder in your AI coding environment.
3. Copy `.env.example` to `.env`.
4. Add your Hostinger SSH details to `.env`.
5. Start the project with this prompt:

> "Let's get started. I want to build a website and also make sure to add a .env file where I will be giving you the access key for my Hostinger SSH credentials."

That prompt tells the project to begin onboarding and prepare for a Hostinger-backed website deployment.

## Hostinger SSH Setup

Create a `.env` file in the project root using `.env.example` as the template:

```bash
SSH_HOST=your.server.ip
SSH_PORT=65002
SSH_USER=u000000000
SSH_PASSWORD='your-password-here'

DOMAIN=yourdomain.com
REMOTE_PATH=domains/yourdomain.com/public_html
```

You can find these details in Hostinger hPanel under **Advanced -> SSH Access**.

Important: never commit `.env`. This repository's `.gitignore` already excludes it.

## How The Project Works

The project is organized around four skills and one review agent.

### 1. Onboarding Skill

Location: `.claude/skills/onboarding/`

The onboarding skill interviews the client before anything is built. It collects:

- Business name, offer, location, and ideal customer
- Primary "money keyword" and optional supporting keywords
- Real EEAT proof, such as founder details, credentials, awards, results, and testimonials
- Reference screenshots or example websites to model

It saves the answers into `client/profile.md`. The rest of the workflow depends on that profile, so this step comes first.

### 2. Build Website Skill

Location: `.claude/skills/build-website/`

The build skill turns `client/profile.md` and the reference screenshots into a complete static website inside `site/`.

It follows the build specification in `build-spec.md`, uses static HTML/CSS/JavaScript, and creates the core pages, blog content, schema markup, contact form structure, and performance-conscious assets.

It does not deploy automatically. After building, the site should be reviewed first.

### 3. AEO Content Writer Skill

Location: `.claude/skills/aeo-content-writer/`

The AEO content writer skill controls every word of website copy. It is designed to write content that can rank in Google and be understood by AI answer engines.

It enforces:

- Answer-first section structure
- Question-shaped headings
- Clear entity signals for the business, service, and location
- EEAT-backed claims only from `client/profile.md`
- FAQ content and schema-ready answers
- Human, specific copy without generic AI filler

This skill must be used before editing headlines, paragraphs, meta tags, FAQs, schema text, or blog posts.

### 4. Site Reviewer Agent

Location: `.claude/agents/site-reviewer.md`

The site reviewer checks built pages before deployment. It reviews every HTML file in `site/` for:

- Invented EEAT claims
- Generic or AI-sounding phrasing
- Missing AEO structure
- Incorrect or missing schema
- Performance issues
- Meta title and description problems

It reports findings with file locations and suggested fixes. The website should be fixed before going live.

### 5. Deploy Hostinger Skill

Location: `.claude/skills/deploy-hostinger/`

The deploy skill publishes only the contents of `site/` to the Hostinger document root defined in `.env`.

It runs:

```bash
bash scripts/deploy.sh
```

The script uses `rsync` over SSH, reads credentials from `.env`, and verifies the live domain after deployment.

Use this only after the site has been built, reviewed, and approved.

## Project Structure

```text
.
├── .claude/
│   ├── agents/
│   ├── commands/
│   ├── rules/
│   └── skills/
├── client/
│   └── references/
├── scripts/
│   └── deploy.sh
├── site/
│   └── index.html
├── .env.example
├── .gitignore
└── CLAUDE.md
```

## Useful Commands

The workflow can also be triggered with these project commands:

- `/onboard` - collect the client profile
- `/build` - build the static website
- `/write` - write or rewrite AEO content
- `/deploy` - deploy `site/` to Hostinger

## Deployment Notes

- Only the `site/` folder is deployed.
- `.env` stays local and should never be committed.
- `REMOTE_PATH` should point to the public document root for the domain.
- Use `DEPLOY_DELETE=1 bash scripts/deploy.sh` only when you intentionally want to delete remote files that no longer exist locally.

