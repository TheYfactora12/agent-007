# Agent-007 Codex V3 Prompt — Mission 005 Pokémon Sim Implementation Readiness

Copy and paste this entire prompt into Codex while working inside the `TheYfactora12/agent-007` repository.

---

## Bottom Line

You are Codex operating as the execution engineer for Agent-007.

Your job is to prepare the bounded implementation plan for:

```text
Mission 005 — Replay Review to Coaching Summary Slice
```

Target repo:

```text
TheYfactora12/Pokemon-Champions-Sim-Planner
```

This is not a build-everything coaching mission.

This is a bounded implementation-readiness mission for one feature slice only.

The feature slice is:

```text
replay review → coaching summary
```

using existing:

- Replay Log
- Strategy surface
- Pilot Guide surface

Do not implement until Kevin explicitly approves the coding plan.

Core bias:

```text
less building the system
more using the system
```

---

# 1. Mission Context

Mission 004A is already accepted as a repo-aware repeatability pass.

That means the next useful step is not more Agent-007 framework.

The next useful step is a real implementation-readiness pass for Pokémon Sim using actual repo context.

Your question is:

```text
Can we define a safe, bounded coding mission for one replay-to-coaching summary slice without drifting into architecture sprawl?
```

---

# 2. Hard Limits

Do not merge to main.

Do not deploy.

Do not spend money.

Do not change Supabase schema.

Do not expand persistence.

Do not redesign broad coaching architecture.

Do not touch production configuration.

Do not inspect or expose secrets, `.env` values, credentials, API keys, tokens, or regulated data.

Do not fake confidence.

Do not claim implementation proof before code-level review supports it.

Do not implement unless Kevin explicitly approves after reviewing the coding-readiness output.

---

# 3. Required Response Style

Every final Codex response must use:

1. Bottom line
2. Why it matters
3. What changed
4. Tests / verification
5. Tradeoffs
6. Upgrade path

Be direct.

Challenge process bloat.

If the slice is too big, shrink it.

If the evidence is weak, say so plainly.

---

# 4. Primary Mission

Use the real Pokémon Sim repo context to identify:

- exact files involved
- existing Replay Log surface
- existing Strategy surface
- existing Pilot Guide surface
- current replay/context data available
- where the coaching summary can be placed without new architecture

Then prepare a coding-readiness package only.

Do not implement yet.

---

# 5. Safe Repo Inspection Rules

You may inspect:

- top-level README and runbook files
- source files related to replay, strategy, pilot, logger, UI, and engine flow
- test files and specs related to replay or coaching
- non-secret example/config files

You may not inspect for values:

- `.env`
- credential-bearing config
- secret keys
- production-only settings

If a file appears likely to contain sensitive values, stop and skip it.

You may mention that such a file exists, but do not print or rely on secret contents.

---

# 6. Step 1 — Verify Working Context

Inside `agent-007`, verify:

```bash
git status
git branch --show-current
git log --oneline -5
```

Then inspect Mission 005 context files:

```bash
sed -n '1,220p' missions/mission-005-replay-review-to-coaching-summary-slice.md
sed -n '1,220p' docs/mission-005-replay-coaching-slice-acceptance-criteria.md
sed -n '1,220p' governance/mission-005-implementation-risk-notes.md
sed -n '1,220p' governance/mission-005-security-and-no-overclaim-rules.md
sed -n '1,220p' qa/mission-005-qa-evidence-plan.md
```

Inside the Pokémon Sim repo, inspect only safe high-level context first:

```bash
git status
git branch --show-current
find . -maxdepth 2 -type f | sort
sed -n '1,220p' README.md
sed -n '1,220p' DEVELOPMENT_RUNBOOK.md
```

---

# 7. Step 2 — Identify Exact Files Involved

Inspect the Pokémon Sim repo to identify the smallest real file set relevant to the slice.

At minimum, determine whether these are involved and why:

- `poke-sim/ui.js`
- `poke-sim/engine.js`
- `poke-sim/strategy-injectable.js`
- `poke-sim/logger.js`
- `poke-sim/index.html`
- relevant tests under `poke-sim/tests/`

You must answer:

1. Where is Replay Log behavior currently surfaced?
2. Where is Strategy currently surfaced?
3. Where is Pilot Guide currently surfaced?
4. What replay/context data already appears available at a high level?
5. Where can one coaching summary be inserted without creating a new subsystem?

Do not guess if the answer is not visible from safe file inspection.

State `Unknown` if needed.

---

# 8. Step 3 — Define The Bounded Slice

The implementation may proceed only if it stays inside this boundary:

- one coaching summary
- one issue category
- one evidence label
- one next action
- `not enough evidence` supported as a first-class result

Possible issue categories may include:

- team choice
- plan mismatch
- execution
- not enough evidence

But do not assume the final category set until repo context supports it.

If even one category is too much, reduce further.

---

# 9. Step 4 — Produce Coding-Readiness Deliverables

Create these files inside `agent-007`:

```text
missions/mission-005a-pokemon-sim-implementation-readiness.md
docs/pokemon-sim-replay-coaching-slice-file-map.md
docs/pokemon-sim-replay-coaching-slice-acceptance-criteria.md
governance/pokemon-sim-replay-coaching-implementation-risks.md
qa/pokemon-sim-replay-coaching-qa-plan.md
governance/pokemon-sim-replay-coaching-no-overclaim-rules.md
```

If better names are clearly warranted, keep them short and explicit.

Required content:

## Mission packet

- target repo
- exact files involved
- bounded slice definition
- target user
- risk route
- stop conditions
- rollback/backtrack path

## File map / placement brief

- exact files likely involved
- where the coaching summary should appear
- why that location reuses existing architecture

## Acceptance criteria

- what must be true before coding starts
- what the finished slice must do
- what it must refuse to do

## Implementation-risk notes

- scope creep risk
- overclaim risk
- data-flow ambiguity risk
- UI clutter risk
- evidence-quality risk

## QA plan

- what future coding must verify
- one positive example
- one insufficient-evidence example
- regression surfaces affected

## Security / no-overclaim rules

- no secret/config dependence
- no persistence expansion
- no claims beyond available evidence
- `not enough evidence` required

---

# 10. Step 5 — Recommendation

Your final recommendation must choose one:

- proceed to coding mission
- simplify scope before coding
- pause for risk review

You must justify the recommendation using repo evidence.

If the slice cannot stay bounded to existing surfaces, do not recommend coding.

---

# 11. Final Gate

Do not implement anything in the Pokémon Sim repo during this mission unless Kevin explicitly follows up and approves coding after reviewing the readiness package.

If the repo inspection reveals that implementation would require:

- Supabase schema changes
- persistence expansion
- broad coaching redesign
- new architecture

then stop and recommend simplification instead.

---

# 12. Final Delivery Requirements

Your final response must include:

1. Bottom line
2. Why it matters
3. What changed
4. Tests / verification
5. Tradeoffs
6. Upgrade path

Also include:

- branch name used
- exact Pokémon Sim files identified
- whether coding may proceed yet
- the single strongest reason to keep the slice small
