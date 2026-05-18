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

Agent-007 v1.4 Direct Use Setup Pack / PR #9 / Issue #10

## Related GitHub Artifacts

- Repo: `TheYfactora12/agent-007`
- PR: `#9`
- Issue: `#10`
- Branch: `agent-007-direct-use-setup`
- Commit: `cd5f92a`

## Bottom line

The direct use setup pack is ready for review as a docs/setup-only package that
helps Kevin use Agent-007 more directly in ChatGPT Projects, a private Custom
GPT, and Perplexity with less copy/paste.

## Why it matters

This reduces manual setup friction without adding runtime automation, Actions,
external integrations, API keys, or approval bypasses.

## What changed

- Added ChatGPT Project instructions.
- Added Custom GPT instructions.
- Added a knowledge-file list.
- Added conversation starters.
- Added a future Actions readiness note.
- Added a Perplexity research scout prompt.
- Added a shared direct-use setup checklist.
- Added one short `START_HERE.md` direct-use reference.

## Files changed

- `START_HERE.md`
- `integrations/chatgpt/agent-007-project-instructions.md`
- `integrations/chatgpt/agent-007-custom-gpt-instructions.md`
- `integrations/chatgpt/agent-007-knowledge-file-list.md`
- `integrations/chatgpt/agent-007-conversation-starters.md`
- `integrations/chatgpt/agent-007-actions-readiness-note.md`
- `integrations/perplexity/agent-007-research-scout-prompt.md`
- `integrations/shared/agent-007-direct-use-setup-checklist.md`

## Tests / verification

Verification used:

- `find integrations -maxdepth 3 -type f -print | sort`
- `grep -n "Direct Use Setup" START_HERE.md`
- `node scripts/check-agent-007-handoff.mjs`

## Risks / limitations

- This does not create or configure ChatGPT Projects, Custom GPTs, Perplexity,
  Actions, or API keys automatically.
- Kevin must still do setup manually in the ChatGPT and Perplexity UIs.
- This is setup packaging only, not implementation or automation.

## Governance status

Proceed

## Approval required?

No

## What ChatGPT should review

- whether the setup pack is complete enough for direct manual use
- whether the docs preserve GitHub as source of truth
- whether the package avoids pretending Codex can configure third-party tools
  automatically

## What Kevin must decide

Whether PR `#9` is ready to merge as the recorded setup pack for direct
ChatGPT/Perplexity use.

## Next recommended action

Review PR `#9`. Do not add runtime automation, Actions, external integrations,
or new Agent-007 framework as part of this setup pack.

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
