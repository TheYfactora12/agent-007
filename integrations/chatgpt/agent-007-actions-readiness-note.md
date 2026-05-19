# Agent-007 Actions Readiness Note

Actions can connect a Custom GPT to external APIs only after API details,
authentication, and an OpenAPI schema are defined.

For now:

- no Actions enabled
- no GitHub write actions
- no auto-merge
- no auto-comment
- no secrets
- no production access

Future safe first action:

- read-only handoff fetch
- read-only PR/issue fetch

Do not build the OpenAPI schema yet unless Kevin explicitly approves.
