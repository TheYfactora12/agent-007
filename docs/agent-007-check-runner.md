# Agent-007 Check Runner

## Bottom line

The Agent-007 check runner validates relay handoff structure.

It does not replace ChatGPT review.

It does not replace Kevin approval.

It does not auto-merge, auto-comment, auto-fix, or call an AI model.

## Why it matters

The relay workflow reduces copy/paste by having Codex update `handoffs/latest-codex-handoff.md`.

The check runner makes sure that handoff has the minimum structure needed before Kevin asks ChatGPT to review it.

## Local command

Run:

```bash
node scripts/check-agent-007-handoff.mjs
```

## What it checks

The checker validates that:

- required relay files exist
- `handoffs/latest-codex-handoff.md` has required sections
- governance status uses an approved value
- approval required uses an approved value
- hard limits include merge, deploy, spend, secrets, Supabase, and production-change controls
- core docs do not contain local `/Users/` paths
- `Mission 006` references are framed as not started or do-not-start language
- `START_HERE.md` points to the check runner command

## What it does not do

The checker does not:

- approve work
- judge quality
- replace human review
- validate code behavior
- inspect secrets
- write comments
- modify files
- create issues or PRs
- merge anything

## Governance

This is validation-only automation.

Kevin approval gates remain unchanged.

Protected actions still require Kevin approval.

## Upgrade path

Use this manually first.

If it proves useful, the next safe step is a read-only GitHub Actions workflow that runs the same command on pull requests.
