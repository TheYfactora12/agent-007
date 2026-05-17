# Agent 007 — Project AI Workforce

> A project-specific AI agent operating system built on the [`msitarzewski/agency-agents`](https://github.com/msitarzewski/agency-agents) pattern, stress-tested and mapped to the actual lifecycle of **Blackhat**, **RiskStack Labs / Merlin**, and the **Pokémon Champions Sim**.

---

## Start Here

Open [START_HERE.md](/Users/kevinmedeiros/Downloads/agent-007/START_HERE.md) first.

That file is the default entry point for this repo and the shortest path to understanding:

- what Agent-007 is for
- when to use it
- how missions should flow
- what should not be automated or escalated yet

Read the rest of the repo after `START_HERE.md`, not before it.

Then follow this order:

1. [START_HERE.md](/Users/kevinmedeiros/Downloads/agent-007/START_HERE.md)
2. [charter/what-we-are-building.md](/Users/kevinmedeiros/Downloads/agent-007/charter/what-we-are-building.md)
3. [missions/mission-intake-template.md](/Users/kevinmedeiros/Downloads/agent-007/missions/mission-intake-template.md)
4. [workflows/run-full-delivery-loop.md](/Users/kevinmedeiros/Downloads/agent-007/workflows/run-full-delivery-loop.md)
5. [MASTER_AGENT.md](/Users/kevinmedeiros/Downloads/agent-007/MASTER_AGENT.md) only when running a software or delivery mission

---

## What this is

This repo is the living operating manual for how AI agents are assigned, activated, and held accountable on every project in this org. Every agent has:

- A clear **identity and mission**
- A defined **lifecycle gate** where it activates
- Explicit **deliverables** and **success metrics**
- A **system prompt** ready to paste into Claude, Cursor, Copilot, or any CLAUDE.md

## Current State

The repo now has four practical anchors:

- Mission 001 established the base governance route and operating templates.
- Mission 002 validated mission artifacts and exposed the need for merge-discipline.
- Mission 003 proved one real product mission by producing a reusable 4 Walls module outline.
- `START_HERE.md` is the required entry path that keeps the system from turning into governance theater.

## Milestones

### Milestone 1: Operating loop closed

- Mission 001 closed
- Mission 002 closed
- README updated

### Milestone 2: First product mission

- Mission 003 creates 4 Walls Module 1
- Agent-007 proves idea-to-teaching-asset workflow

### Milestone 3: First repeatability test

- Run same process on Merlin or Pokemon Sim
- Compare whether the workflow still works

## Operating Priority

Finish the operating loop before expanding the operating system.

Less building the system.

More using the system.

That is the current standard for this repo.

If a proposed addition does not help complete the loop:

```text
idea → mission packet → target user → risk route → artifact → evidence → lesson → closeout
```

it should usually be deferred.

---

## Repo structure

```
agent-007/
├── README.md                  ← repo overview
├── START_HERE.md              ← default entry point
├── MASTER_AGENT.md            ← operating summary
├── agents/
├── charter/                   ← what this system is building
├── missions/                  ← mission packets and intake templates
├── qa/                        ← evidence reports and review standards
├── learning/                  ← lessons and reuse patterns
├── governance/                ← thresholds, merge checks, and routing
├── principles/                ← core operating principles
├── doctrine/                  ← deeper reference doctrine
├── docs/                      ← onboarding and support docs
├── workflows/                 ← end-to-end operating loops
├── playbooks/                 ← agent handoff sequences
├── standards/                 ← durable standards and guardrails
└── lifecycle-gates.md         ← phase gates
```

---

## Lifecycle map

| Phase | Active agents | Gate output |
|---|---|---|
| Discovery | Software Architect, InfoSec Risk Officer, Vendor Risk Assessor, Offline AI Architect | Scope + risk statement |
| Architecture | Software Architect, Security Engineer, Threat Modeler, Docker Security Hardener, DevOps Automator | ADR log + threat model |
| Engineering build | Code Reviewer, Technical Writer, Security Engineer | Reviewed PRs + runbook draft |
| Design | UI Designer, UX Researcher, Accessibility Auditor | Component spec + usability findings |
| QA + Release | Evidence Collector, Reality Checker, Accessibility Auditor, Incident Response Commander, InfoSec Risk Officer | Go/no-go memo + defect log |
| Post-release | Model Risk Governance, InfoSec Risk Officer, Incident Response Commander | Risk register update + monitoring plan |

---

## How to use an agent

**Option A — Claude Code / Cursor / Copilot:**
Copy the system prompt from the agent's `.md` file into your `CLAUDE.md`, `.cursorrules`, or chat system message.

**Option B — Standalone chat:**
Paste the system prompt as the first message in a new conversation, then describe your task.

**Option C — Multi-agent chain:**
Run agents in sequence using a playbook from `/playbooks/`. Each playbook defines which agent runs first, what it produces, and what the next agent consumes.

---

## Projects this covers

| Project | Key phases active now | Priority agents |
|---|---|---|
| **Blackhat** (cybersecurity mobile game) | Engineering build, QA | Code Reviewer, Evidence Collector, Reality Checker, DevOps Automator |
| **Merlin / RiskStack Labs** (local AI platform) | Architecture, Design | Software Architect, Offline AI Architect, Threat Modeler, UI Designer, InfoSec Risk Officer |
| **Pokémon Champions Sim** | Engineering, QA | Code Reviewer, Technical Writer, Evidence Collector, Reality Checker |

---

## Credits

Built on the agent pattern from [`msitarzewski/agency-agents`](https://github.com/msitarzewski/agency-agents) — adapted, stress-tested, and extended for regulated financial institution context and local AI deployment.
