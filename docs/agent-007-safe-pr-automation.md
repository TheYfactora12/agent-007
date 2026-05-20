# Agent-007 Safe PR Automation v1

## Bottom line

Agent-007 now has the safest useful PR automation at Levels 2 and 3:

- a read-only GitHub Actions check that runs the existing handoff checker
- a PR template that forces minimum evidence and governance fields

This is validation automation only.

It is not AI automation.

See also:

- `docs/agent-007-automation-roadmap.md`

## What the check means

If the PR check passes:

- the minimum handoff structure is present
- the PR has enough framing for human review to start

If the PR check fails:

- the PR is missing required structure
- Codex should fix the handoff or PR template fields before Kevin asks ChatGPT to review it

## What the check does not mean

A passing check does not mean:

- the work is correct
- the code is safe
- the PR should merge
- Kevin approval is no longer required

The check validates structure only.

## Kevin workflow

1. Open the PR.
2. Confirm the `Agent-007 Handoff Check` passes.
3. Read the PR body and `handoffs/latest-codex-handoff.md`.
4. Ask ChatGPT to review the latest Codex handoff.
5. Use the ChatGPT decision to route next action.
6. Keep Kevin approval for protected actions like merge, deploy, spend, schema change, and public claims.

## Why this is safe

- no LLM calls
- no GitHub write actions
- no auto-comments
- no auto-fixes
- no auto-labeling
- no auto-merge
- no secrets

## Next safe upgrade

Only after this proves useful:

- keep the same read-only check in GitHub Actions
- do not add write-side automation unless Kevin explicitly approves it
- move up the roadmap one level at a time, not all at once
