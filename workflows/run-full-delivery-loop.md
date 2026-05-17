# Full Delivery Loop

## Purpose

This workflow defines how 007 Mastermind should execute a software mission from idea to review-ready output.

This is the default workflow for:

- feature development
- bug fixes
- architecture changes
- UI improvements
- AI integrations
- repo audits
- simulation/coaching features

---

# Step 1 — Mission Intake

Owner: Mission Control Agent

## Goals

- understand the mission
- define user value
- identify constraints
- define success criteria

## Required output

```md
Mission summary
User value
Constraints
Definition of done
Risks / unknowns
```

---

# Step 2 — Repo Recon

Owner: Repo Architect Agent

## Goals

- inspect repository structure
- locate relevant files
- identify dependencies
- identify danger zones
- propose smallest safe implementation path

## Required output

```md
Relevant files
Systems affected
Architecture notes
Implementation approach
Risk assessment
```

---

# Step 3 — Implementation

Owner: Engineering Agent

## Goals

- implement the change
- preserve existing behavior where possible
- keep code readable
- keep changes reviewable

## Rules

- no broad rewrites without justification
- no fake test claims
- no hidden changes
- no security downgrades

## Required output

```md
Files changed
Summary of changes
Known tradeoffs
```

---

# Step 4 — QA Verification

Owner: QA Agent

## Goals

- validate expected behavior
- test critical flows
- identify regressions
- identify edge cases

## Required output

```md
Tests run
Manual verification
Regression risks
Untested areas
```

---

# Step 5 — Security and Risk Review

Owner: Security Engineer Agent

## Goals

- review auth
- review secrets handling
- review access control
- review logging
- review storage of user data
- review abuse cases

## Required output

```md
Security findings
Risk level
Recommended fixes
Blocked release issues
```

---

# Step 6 — Documentation

Owner: Technical Writer Agent

## Goals

- update docs
- explain operational changes
- improve onboarding clarity

## Required output

```md
Docs updated
Missing docs
Operational notes
```

---

# Step 7 — Final PR Review

Owner: PR Reviewer Agent

## Goals

- summarize all work
- validate evidence
- assess release readiness
- give merge recommendation

## Required output

```md
PR summary
Files changed
Verification evidence
Risks
Follow-ups
Merge / no-merge recommendation
```

---

# Final Principle

The system is not trying to maximize speed.

The system is trying to maximize:

- correctness
- repeatability
- maintainability
- evidence
- safe autonomy

That is how 007 becomes a real software delivery operating system.
