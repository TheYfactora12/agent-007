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

Agent-007 Level 5 human-triggered review bot

## Related GitHub Artifacts

- Repo: `TheYfactora12/agent-007`
- PR: `#17`
- Issue: `none`
- Branch/ref: `agent-007-level-5-review-bot`
- Head SHA: `bc28c76d7a555df5b3ed6bf5f0e8d22ca103fe89`

## Bottom line

This builds Level 5 as a human-triggered review packet bot that listens for
the exact `/agent007 review` command and posts one triage packet comment using
trusted default-branch logic.

## Why it matters

Kevin should not have to manually copy a local triage packet into GitHub every
time he wants one on a PR. This keeps the review packet in the PR thread while
preserving Kevin approval gates and avoiding any Level 6 authority.

## What changed

- Added `scripts/agent-007-review-command.mjs` to validate the exact trigger
  and build a comment-ready review packet from the existing triage logic.
- Added `.github/workflows/agent-007-review-command.yml` to listen for
  `issue_comment` events and post one PR comment only when the trigger is exact.
- Added local tests for the review-command parser and formatter.
- Updated Level 4/5 docs to explain the trusted default-branch architecture and
  the Level 5 trust boundary.

## Files changed

- `scripts/agent-007-pr-triage.mjs`
- `scripts/agent-007-review-command.mjs`
- `tests/agent-007-pr-triage-tests.mjs`
- `tests/agent-007-review-command-tests.mjs`
- `.github/workflows/agent-007-review-command.yml`
- `docs/agent-007-local-pr-triage.md`
- `docs/agent-007-automation-roadmap.md`
- `docs/agent-007-safe-pr-automation.md`
- `START_HERE.md`
- `handoffs/latest-codex-handoff.md`

## Tests / verification

Verification used:

- `node scripts/check-agent-007-handoff.mjs`
- `git diff --check`
- `node tests/agent-007-pr-triage-tests.mjs`
- `node tests/agent-007-review-command-tests.mjs`
- Result: `Agent-007 handoff checks passed`
- Result: `agent-007 PR triage tests passed`
- Result: `agent-007 review command tests passed`

## Risks / limitations

- The script depends on `gh` authentication and network availability.
- Level 5 adds one GitHub write path: posting a PR comment on explicit human
  trigger.
- The packet still does not approve anything and can still be noisy if used too
  casually.

## Governance status

Proceed

## Approval required?

Kevin approval

## What ChatGPT should review

- whether the trigger is exact and human-only
- whether the workflow stays on trusted default-branch logic
- whether the posted comment remains a review packet only, not approval
- whether Levels 5 and 6 stay clearly separated

## What Kevin must decide

Whether the Level 5 review command is safe enough and useful enough to keep as
part of the standard Agent-007 PR review loop.

## Next recommended action

Review PR `#17`, verify the trigger and trust boundary, and keep Level 6
unimplemented.

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
