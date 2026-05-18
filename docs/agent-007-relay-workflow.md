# Agent-007 Relay Workflow

## Bottom line

The relay workflow reduces copy/paste between Codex, ChatGPT, and Kevin.

Codex writes structured handoffs.

ChatGPT reviews those handoffs.

Kevin approves protected decisions.

This is not autonomous merge, autonomous deployment, or memory database.

## Why it matters

Agent-007 should reduce Kevin's coordination burden.

The relay keeps work aligned without asking Kevin to manually shuttle long outputs between tools.

## Current workflow

1. Codex completes a task or review.
2. Codex updates handoffs/latest-codex-handoff.md.
3. Kevin tells ChatGPT: "Review the latest Codex handoff."
4. ChatGPT reviews:
   - latest handoff
   - PR/issue state
   - governance rules
   - training cards
   - evidence artifacts
5. ChatGPT returns:
   - Proceed
   - Simplify
   - Pause
   - Reject
   - Needs Kevin approval
6. Kevin makes final approval decisions.

PR or issue comments are optional when they help reviewers find the handoff faster.

## What this replaces

Instead of:

Codex output → Kevin copies to ChatGPT → ChatGPT reviews → Kevin copies back to Codex

Use:

Codex writes handoff → ChatGPT reviews handoff → Kevin approves gates

## Source of truth

GitHub remains the source of truth.

Use:

- issues for mission tracking
- PRs for code/change review
- handoffs for current coordination
- training-cards for reusable lessons
- learning/ for durable mission learning

The default relay artifact is:

- `handoffs/latest-codex-handoff.md`

PR or issue comments are optional context, not a second required handoff.

## What this does not do

This does not:

- auto-merge
- auto-deploy
- approve spend
- approve schema changes
- store secrets
- create Supabase memory
- replace Kevin approval
- create autonomous agents

## Protected actions

Kevin approval is still required for:

- merge to main
- production deployment
- Supabase/schema changes
- auth/security/privacy changes
- spend
- public claims
- protected governance-rule changes

## When to use

Use this after:

- Codex finishes a coding task
- Codex completes a review
- Codex creates a mission packet
- Codex finds a blocker
- Codex needs ChatGPT review
- a PR is ready for governance review

## Handoff quality rule

A good handoff should make the next decision obvious.

If the handoff creates more reading without a decision, simplify it.

## Training card rule

If the mission exposes a repeatable lesson, create or update one training card.

One card equals one lesson.

Do not turn training cards into doctrine.
