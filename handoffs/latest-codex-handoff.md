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

Agent-007 Fast Review Loop v1

## Related GitHub Artifacts

- Repo: `TheYfactora12/agent-007`
- PR: `none yet`
- Issue: `none`
- Branch/ref: `agent-007-fast-review-loop-v1`

## Bottom line

This improves Level 4 by adding deterministic stale-state and closeout checks
to the local read-only PR triage script so repeated PR review drift is caught
before ChatGPT has to reconcile GitHub state manually.

## Why it matters

Recent reviews repeatedly lost time to the same avoidable drift: pending-vs-open
state mistakes, stale head SHAs, PR-body/handoff mismatch, and stale post-merge
closeout language. This change makes those problems deterministic triage flags
instead of repeated human reconciliation work.

## What changed

- Tightened `scripts/agent-007-pr-triage.mjs` to detect local handoff drift
  against live PR state.
- Added stale-state checks for pending/open/merged drift, stale head SHA, and
  PR body vs handoff evidence mismatch.
- Added post-merge closeout checks so stale next-action and Kevin-decision
  fields are flagged after merge.
- Added narrow local tests covering the new drift cases.
- Updated `docs/agent-007-local-pr-triage.md` to describe the new stale-state
  and closeout behavior.

## Files changed

- `scripts/agent-007-pr-triage.mjs`
- `tests/agent-007-pr-triage-tests.mjs`
- `docs/agent-007-local-pr-triage.md`
- `handoffs/latest-codex-handoff.md`

## Tests / verification

Verification used:

- `node scripts/check-agent-007-handoff.mjs`
- `git diff --check`
- `node tests/agent-007-pr-triage-tests.mjs`
- result: `agent-007 PR triage tests passed`

## Risks / limitations

- The script depends on `gh` authentication and network availability.
- It can flag drift, but it still does not decide whether that drift matters
  enough to merge or block work.
- Older PRs that predate the current template will continue to show missing
  fields, which is useful but can be noisy.

## Governance status

Proceed

## Approval required?

Kevin approval

## What ChatGPT should review

- whether the stale-state checks catch the repeated review friction correctly
- whether the closeout flags stay deterministic and read-only
- whether the packet is still useful instead of becoming a second handoff

## What Kevin must decide

Whether Fast Review Loop v1 is useful enough to keep as part of the standard
Agent-007 review loop.

## Next recommended action

Open a bounded PR for Fast Review Loop v1, verify the new drift tests pass, and
keep Levels 5 and 6 unimplemented.

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
