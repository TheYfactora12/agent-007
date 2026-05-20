# Latest Codex Handoff

## Purpose

This file is the current Codex-to-ChatGPT handoff.

It can be overwritten or updated with the latest mission handoff.

Permanent lessons belong in:

- training-cards/
- learning/
- mission records

This file is not permanent history.

## Mission / PR / Issue

Agent-007 Level 4 local PR triage script

## Related GitHub Artifacts

- Repo: `TheYfactora12/agent-007`
- PR: `#15`
- Issue: `none`
- Branch/ref: `agent-007-level-4-pr-triage`
- Head SHA: `c91b64a3b19e2bd3a9212d7f263af49c5006e78a`

## Bottom line

This adds Level 4 in the safest local-only form: a read-only PR triage script
that generates a structured review packet from GitHub PR data without making
governance decisions or writing to GitHub.

## Why it matters

Kevin still spends time scanning PR state, changed files, and evidence fields
before asking ChatGPT for review. This script removes that repetitive
collection work without automating judgment or authority.

## What changed

- Added `scripts/agent-007-pr-triage.mjs` as a local read-only PR triage tool.
- Added `docs/agent-007-local-pr-triage.md` with usage and limits.
- Updated `docs/agent-007-safe-pr-automation.md`,
  `docs/agent-007-automation-roadmap.md`, and `START_HERE.md` to reference the
  Level 4 local triage path.
- Kept Levels 5 and 6 unimplemented.

## Files changed

- `scripts/agent-007-pr-triage.mjs`
- `tests/agent-007-pr-triage-tests.mjs`
- `docs/agent-007-local-pr-triage.md`
- `docs/agent-007-safe-pr-automation.md`
- `docs/agent-007-automation-roadmap.md`
- `START_HERE.md`
- `handoffs/latest-codex-handoff.md`

## Tests / verification

Verification used:

- `node scripts/agent-007-pr-triage.mjs --repo TheYfactora12/agent-007 --pr 12`
- `node scripts/check-agent-007-handoff.mjs`
- `git diff --check`
- `node tests/agent-007-pr-triage-tests.mjs`
- confirmed the triage script only reads GitHub PR data and emits stdout
- result: `agent-007 PR triage tests passed`

## Risks / limitations

- The script depends on `gh` authentication and network availability.
- It summarizes evidence fields but does not validate whether the PR body is
  truthful.
- Older PRs that predate the current template will show missing sections, which
  is useful but can be noisy.

## Governance status

Proceed

## Approval required?

Kevin approval

## What ChatGPT should review

- whether the triage script stays strictly read-only
- whether the output packet reduces review scanning work without acting like a
  second handoff
- whether the docs keep Levels 5 and 6 clearly unimplemented

## What Kevin must decide

Whether this local Level 4 triage script is useful enough to keep as part of
the standard PR review loop and whether to merge PR `#15` to `main`.

## Next recommended action

Review the Level 4 local triage script PR, confirm the output is useful on a
real PR, and keep all higher-level write automation deferred.

## Hard limits confirmed

- no merge
- no deploy
- no spend
- no secrets
- no Supabase/schema change
- no production change

## Training card needed?

No

## Learning artifact needed?

No
