# START HERE — Agent-007

## Bottom Line

Start with `START_HERE.md`.

Agent-007 is Kevin's personal AI operating system for cutting through noise, routing missions, preserving learning, and turning ideas into useful work.

Use this file first.

Before new work, check relevant training cards.

If you only read one thing, read this.

## What Agent-007 Does

Agent-007 helps Kevin move from:

```text
idea → mission packet → risk route → execution artifact → evidence → lesson
```

Training sharpens that loop:

```text
mission → output → review → correction → lesson → reusable rule/example
```

It is not meant to create more documents for their own sake.

It is meant to make the next right action clearer.

## What Agent-007 Now Has

Agent-007 now has:

- mission packet template
- governance routing standard
- risk threshold standard
- budget/spend rules
- rollback/backtrack rules
- evidence expectations
- sample mission packet

## When To Use Agent-007

Use Agent-007 when Kevin has:

- a product idea
- a project decision
- a coding mission
- a risk question
- a governance concern
- a teaching/framework idea
- an experiment that needs boundaries
- a PR or issue that needs review

## The Default Workflow

1. Define the mission.
2. Name the target user.
3. Classify the risk tier.
4. Decide the governance route.
5. Create or update the mission packet.
6. Produce the smallest useful artifact.
7. Capture QA/evidence.
8. Capture what was learned.
9. Simplify anything that creates noise.

If a mission exposes a repeatable mistake, add or update one training card.

## Training Cards

Before starting work similar to a previous mission, check `/training-cards`.

Training cards are short lessons from real missions.

Use them to avoid repeated mistakes, not to add process.

Start with:

- `training-cards/mission-005-overclaim-risk-strategy-context.md`

## Relay Workflow

Before copying long Codex outputs into ChatGPT, ask Codex to update:

`handoffs/latest-codex-handoff.md`

Then ask ChatGPT:

`Review the latest Codex handoff.`

Use the relay to reduce copy/paste, not to bypass governance.

GitHub remains the source of truth.

Kevin still approves protected actions like merges, deploys, schema changes, spend, and public claims.

## Check Runner

Agent-007 handoff checks can be run with:

```bash
node scripts/check-agent-007-handoff.mjs
```

The check runner validates relay handoff structure only.

It does not approve work.

## The Core Rule

If Agent-007 does not make the next right action clearer, safer, simpler, or more teachable, it is creating noise.

## Operating Priority

Finish the operating loop before expanding the operating system.

Less building the system.

More using the system.

In practice, that means:

- prove the mission flow end to end
- produce a usable artifact
- capture evidence
- capture the lesson
- close the mission cleanly

Only then should new doctrine, agent roles, or operating layers be added.

## Risk Routing

- Low risk: proceed and document.
- Medium risk: proceed with Kevin visibility.
- High risk: pause and draft committee packet.
- Critical risk: hard stop and draft full board packet.

Never merge to main, deploy, spend over cap, handle secrets, or take irreversible action without Kevin's written approval.

## First Files To Open

1. `charter/what-we-are-building.md`
2. `missions/mission-intake-template.md`
3. `workflows/run-full-delivery-loop.md`
4. `qa/qa-evidence-standard.md`
5. `governance/merge-approval-checklist.md`
6. `training-cards/README.md`
7. `training-cards/`

Read `MASTER_AGENT.md` only when you are running an actual software or delivery mission.

Optional deeper references live in `/doctrine`, `/principles`, `/governance`, and `/docs`.

## Clean Entry Path

Use one path, in this order:

```text
START_HERE.md
→ charter/what-we-are-building.md
→ missions/mission-intake-template.md
→ workflows/run-full-delivery-loop.md
→ qa/qa-evidence-standard.md
→ governance/merge-approval-checklist.md
```

Do not start by hopping between README, doctrine files, board language, and agent prompts.

The system should feel like one route, not ten.

## Simplicity Failure Condition

Agent-007 fails when it breaks the Steve Jobs rule about simplicity.

If the system becomes harder to use than the problem it solves, stop expanding and simplify.

## Fast Mission Intake

For any new mission, answer:

```md
## Mission

## Target user

## Why it matters

## Risk tier

## Done means

## Stop conditions

## Evidence required

## Next action
```

## What Not To Do Yet

Do not start with:

- runtime automation
- Supabase memory DB
- autonomous code execution
- deployment automation
- production integrations
- new agent roles
- more philosophy layers

Prove the workflow first.

Do not expand the operating system faster than the loop is being proven.

## Mission 002 Test

Mission 002 validates whether Agent-007 can create a useful mission packet and supporting evidence without becoming governance theater.

The test question:

Can someone understand and use Agent-007 without Kevin explaining everything live?

## Current Mission Status

- Mission 001: closed
- Mission 002: closed with process corrections
- Mission 003: completed as the first real product mission

## Milestone Path

### Milestone 1: Operating loop closed

- Mission 001 closed
- Mission 002 closed
- README updated

### Milestone 2: First product mission

- Mission 003 creates 4 Walls Module 1
- Agent-007 proves idea-to-teaching-asset workflow

### Milestone 3: First repeatability test

- run same process on Merlin or Pokemon Sim
- compare whether the workflow still works
