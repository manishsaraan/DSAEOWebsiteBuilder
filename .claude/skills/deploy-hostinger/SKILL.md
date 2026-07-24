---
name: deploy-hostinger
description: Publish site/ to the Hostinger server over SSH using the credentials in .env. Use when the user says "deploy", "publish", "push live", "go live".
---

# Deploy to Hostinger

## How

1. Confirm `site/index.html` exists. If not, build first.
2. Run: `bash scripts/deploy.sh`
   - It reads `.env`, then rsyncs `site/` to `$SSH_USER@$SSH_HOST:$REMOTE_PATH` using an expect wrapper for the password prompt.
   - By default it only adds/updates files. To also delete remote files that no longer exist locally, run `DEPLOY_DELETE=1 bash scripts/deploy.sh` — only after confirming with the user, and only when `REMOTE_PATH` points at this site's own docroot.
3. Verify: `curl -s -o /dev/null -w "%{http_code}" https://$DOMAIN/` (read `$DOMAIN` from `.env`). Expect 200. Then fetch the page and confirm it's the newly deployed content, not a cached default page.
4. Report the live URL and what changed.

## Rules

- Never print, echo, or log `SSH_PASSWORD`. The script reads it from `.env`; you never handle it directly.
- Deploy only `site/`. Never touch other folders on the server (`REMOTE_PATH` is the boundary).
- If the script fails on rsync, fall back to `scp -r` of the changed files using the same expect pattern, and say so in the report.
- If authentication fails, tell the user to re-check hPanel → Advanced → SSH Access and update `.env`. Do not retry more than twice (Hostinger rate-limits failed logins).
