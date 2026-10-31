# Deployment rules

- Deploy only after `npm run check` and `npm run build` pass locally.
- Deploy with the Vercel CLI (`npx vercel --prod`) or by pushing to the Git branch connected to the Vercel project. Never hand-roll API calls with tokens inline.
- Never print, echo, or paste `VERCEL_TOKEN`, `RESEND_API_KEY`, or any `.env.local` value anywhere: not in commands, logs, commit messages, or chat.
- Environment variables for production are set in the Vercel project (`npx vercel env add NAME production`), never committed.
- After every deploy, curl the live domain and report the HTTP status and whether the new content is being served.
