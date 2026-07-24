# Deployment rules

- Deploy only via scripts/deploy.sh. Never hand-roll ssh/scp/rsync commands with the password inline.
- Never print, echo, or paste SSH_PASSWORD anywhere: not in commands, logs, commit messages, or chat.
- DEPLOY_DELETE=1 requires explicit user confirmation in the same conversation.
- After every deploy, curl the live domain and report the HTTP status and whether the new content is being served.
