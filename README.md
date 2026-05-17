# Agent 007 — Project AI Workforce

> A project-specific AI agent operating system built on the [`msitarzewski/agency-agents`](https://github.com/msitarzewski/agency-agents) pattern, stress-tested and mapped to the actual lifecycle of **Blackhat**, **RiskStack Labs / Merlin**, and the **Pokémon Champions Sim**.

---

## What this is

This repo is the living operating manual for how AI agents are assigned, activated, and held accountable on every project in this org. Every agent has:

- A clear **identity and mission**
- A defined **lifecycle gate** where it activates
- Explicit **deliverables** and **success metrics**
- A **system prompt** ready to paste into Claude, Cursor, Copilot, or any CLAUDE.md

---

## Repo structure

```
agent-007/
├── README.md                  ← this file
├── agents/
│   ├── engineering/
│   │   ├── software-architect.md
│   │   ├── security-engineer.md
│   │   ├── threat-modeler.md
│   │   ├── docker-security-hardener.md
│   │   ├── devops-automator.md
│   │   ├── code-reviewer.md
│   │   └── technical-writer.md
│   ├── design/
│   │   ├── ui-designer.md
│   │   └── ux-researcher.md
│   ├── qa/
│   │   ├── evidence-collector.md
│   │   ├── reality-checker.md
│   │   └── accessibility-auditor.md
│   └── custom/
│       ├── infosec-risk-officer.md
│       ├── vendor-risk-assessor.md
│       ├── incident-response-commander.md
│       ├── offline-ai-architect.md
│       └── model-risk-governance.md
├── playbooks/
│   ├── architecture-review.md
│   ├── pre-release-gate.md
│   └── sprint-kickoff.md
├── lifecycle-gates.md
└── standards/
    ├── agent-format.md
    └── security-baseline.md
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
