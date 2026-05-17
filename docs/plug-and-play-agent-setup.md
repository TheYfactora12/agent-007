# Plug-and-Play Agent Setup

## Purpose

This guide explains how to use the 007 agents with:

- ChatGPT
- Codex
- Cursor
- Claude
- GitHub Copilot
- Perplexity
- future local AI systems

The repo acts as the source of truth for agent behavior.

---

# Core idea

The repo is not the AI.

The repo contains:

- agent identities
- operating rules
- workflows
- prompts
- lifecycle gates
- standards
- memory patterns

The actual AI engine can be:

- ChatGPT
- Claude
- Gemini
- local models
- Codex
- Cursor
- Perplexity

The model is the brain.

007 is the operating system.

---

# Easiest mental model

Think of it like this:

```text
ChatGPT / Claude / Perplexity = employee brain

agent-007 repo = company handbook + SOPs + workflows + operating model
```

Without the repo:

The AI improvises.

With the repo:

The AI follows structure.

---

# ChatGPT setup

## Best usage

Use ChatGPT for:

- architecture thinking
- strategy
- workflow planning
- repo analysis
- writing
- debugging help
- PR review
- systems thinking

## How to use

Open a new chat and start with:

```text
Use the operating model from:
- MASTER_AGENT.md
- [specific agent file]
- [specific workflow file]

Mission:
[describe the task]

Target repo:
[repo name]

Constraints:
[list constraints]
```

## Example

```text
Use:
- MASTER_AGENT.md
- agents/engineering/security-engineer.md
- workflows/run-full-delivery-loop.md

Mission:
Review Supabase auth architecture for replay upload handling.

Constraints:
- no raw replay logs
- maintain RLS separation
- prevent privilege escalation
```

---

# Codex setup

## Best usage

Use Codex for:

- real repo modifications
- file editing
- implementation
- branch workflows
- testing
- PR creation

## Recommended structure

Create a root file:

```text
CLAUDE.md
```

or:

```text
AGENTS.md
```

Then reference the 007 operating system.

## Recommended root instruction

```text
This repository uses the 007 Mastermind operating system.

Follow:
- MASTER_AGENT.md
- relevant workflow files
- relevant agent files

Never claim tests passed unless run.
Never push directly to main.
Always inspect files before changing architecture.
Always summarize risks and follow-up actions.
```

## Why this matters

Without operating instructions:

Codex behaves like a smart autocomplete.

With operating instructions:

Codex behaves more like an engineering team member.

---

# Cursor setup

## Recommended usage

Place rules into:

```text
.cursorrules
```

or workspace AI rules.

Reference:

- MASTER_AGENT.md
- workflow files
- security rules

## Good usage pattern

Use Cursor for:

- implementation
- multi-file edits
- refactors
- repo-wide understanding
- debugging
- UI work

Cursor becomes much stronger when paired with structured workflows.

---

# Claude setup

## Best usage

Claude is excellent for:

- long reasoning
- architecture
- repo analysis
- planning
- documentation
- workflow refinement
- agent design

## Recommended setup

Use a root:

```text
CLAUDE.md
```

Then inject:

- MASTER_AGENT.md
- workflow file
- target mission

Claude performs better when the workflow and role are explicit.

---

# GitHub Copilot setup

## Best usage

Use Copilot for:

- inline coding
- scaffolding
- boilerplate
- repetitive code

Copilot is weaker at orchestration.

That means:

Copilot should operate inside the 007 system rather than replacing it.

---

# Perplexity setup

## Important distinction

Perplexity is strongest as:

- research agent
- architecture comparison engine
- technology scout
- standards/research summarizer

Perplexity is weaker for:

- full repo execution
- multi-step repo modification
- safe orchestration

## Best pattern

Use Perplexity as a supporting intelligence layer.

Example:

```text
Use the 007 architecture model.
Research the best patterns for:
- local vector memory
- multi-agent orchestration
- AI repo indexing
- secure coding agents

Return:
- architecture options
- tradeoffs
- risks
- recommended implementation approach
```

Then feed results into ChatGPT/Codex/Cursor.

---

# Long-term architecture vision

Eventually the flow becomes:

```text
Perplexity
    ↓
research + discovery
    ↓
ChatGPT / Claude
    ↓
architecture + orchestration
    ↓
Codex / Cursor
    ↓
implementation
    ↓
007 workflows
    ↓
QA + Security + PR review
```

That is the beginning of a real AI software delivery system.

---

# Future state

Later, 007 could evolve into:

- local memory system
- vectorized repo context
- automated issue routing
- branch orchestration
- CI-aware execution
- multi-model routing
- autonomous QA loops
- local/private AI coding brain
- Merlin AI integration

But the foundation is:

- roles
- workflows
- evidence
- constraints
- memory
- orchestration

Without those, "agents" are mostly hype.
