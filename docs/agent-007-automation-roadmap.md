# Agent-007 Automation Roadmap

## Bottom line

Agent-007 automation should expand in levels.

Automate evidence collection, structure checks, and routing first.

Do not automate authority until every lower level is proven.

## Current rule

Agent-007 may review, classify, summarize, challenge, and recommend.

Agent-007 must not independently approve:

- merge
- deploy
- spend
- Supabase/schema changes
- production changes
- secrets/API keys
- public claims
- protected governance changes

Those still require Kevin's explicit written approval.

## Level 1 — Manual control plane

Status: complete

What it is:

- Codex updates GitHub handoffs
- ChatGPT reviews handoffs
- Kevin decides protected gates

What it proves:

- the relay loop works
- GitHub is the source of truth
- judgment stays human-controlled

## Level 2 — Read-only PR handoff check

Status: implemented in this repo

What it is:

- read-only GitHub Actions workflow
- runs `node scripts/check-agent-007-handoff.mjs` on pull requests
- fails fast when minimum handoff structure is missing

What it does not do:

- no AI calls
- no comments
- no fixes
- no labels
- no merge actions

Exit criteria before moving higher:

- used on real PRs
- reduces obvious structure mistakes
- does not create review noise

## Level 3 — PR template / evidence enforcement

Status: implemented in lightweight form

What it is:

- PR template requiring summary, mission reference, verification, governance status, approval requirement, and hard limits

Why it is safe:

- no runtime behavior
- no write automation
- no judgment automation

Exit criteria before moving higher:

- Kevin finds the template useful instead of repetitive
- reviewers can understand PR state faster

## Level 4 — Local PR triage script

Status: plan only

What it would do:

- read local PR-related context
- summarize changed files, verification, and governance fields
- assemble a review packet for Kevin and ChatGPT

Constraints:

- should stay local-first
- should avoid new dependencies if possible
- should not require tokens beyond what existing CLI use already needs

Do not implement until:

- Level 2 and 3 are proven useful
- there is a repeated manual triage burden worth removing

## Level 5 — Human-triggered review comment bot

Status: plan only

What it would do:

- respond to an explicit command such as `/agent007 review`
- publish a bounded review summary only when intentionally triggered

Why it is higher risk:

- writes to GitHub
- can create noise if prompts or routing are weak

Do not implement until:

- lower levels are stable
- Kevin explicitly approves write-side review automation
- the review format is already proven manually

## Level 6 — Controlled write automation

Status: policy only

What it could eventually include:

- narrow write actions on explicit Kevin command
- controlled PR state updates
- tightly-scoped administrative actions

What it must not become by default:

- auto-merge
- auto-deploy
- auto-approve
- autonomous governance

Do not implement until:

- Kevin explicitly approves a bounded mission for it
- command syntax and allowed actions are documented
- rollback and audit expectations are clear

## Safety rule

Each level must prove:

- less copy/paste
- less structural drift
- no hidden authority
- no weakened approval gates

If a higher level adds noise or confusion, stop and simplify.
