# Agent-007 Local PR Triage

## Bottom line

Level 4 for Agent-007 is a local, read-only PR triage script.

It pulls GitHub PR metadata and turns it into a structured review packet.

It does not make a decision for Kevin.

It does not write to GitHub.

## Command

Run:

```bash
node scripts/agent-007-pr-triage.mjs --repo owner/repo --pr 123
```

Example:

```bash
node scripts/agent-007-pr-triage.mjs --repo TheYfactora12/agent-007 --pr 12
```

## What it does

The script reads PR data through `gh pr view` and outputs:

- PR identity
- branch and SHA
- mergeability and review state
- changed files
- status checks
- linked issues
- PR body evidence fields
- hard limits field
- a small list of triage flags

## What it does not do

The script does not:

- approve work
- return `Proceed` / `Simplify` / `Pause` / `Reject` / `Needs Kevin approval`
- comment on GitHub
- label PRs
- fix files
- merge PRs
- close issues
- call an AI model

## Why this is safe

- local only
- read-only GitHub access
- no new dependencies
- no GitHub write actions
- no approval-gate changes

## Kevin workflow

1. Run the local triage script for the PR.
2. Read the triage packet with the PR body and latest handoff.
3. Ask ChatGPT to review the latest Codex handoff.
4. Keep Kevin approval for protected actions.

## Output quality rule

The triage packet should reduce scanning work.

If it creates another wall of text without making the next review step easier,
simplify it.
