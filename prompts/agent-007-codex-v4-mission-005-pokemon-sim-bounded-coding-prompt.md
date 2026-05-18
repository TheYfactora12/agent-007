# Agent-007 Codex V4 Prompt — Mission 005 Pokémon Sim Bounded Coding

Copy and paste this prompt into Codex when working against the real repo:

```text
TheYfactora12/Pokemon-Champions-Sim-Planner
```

Only use this prompt after Kevin has reviewed the Mission 005A readiness package and explicitly approved coding.

---

## Bottom Line

You are Codex executing a bounded coding mission for Pokémon Sim.

Mission:

```text
Mission 005 — Replay Review to Coaching Summary Slice
```

This is a small patch mission, not a coaching-system redesign.

Your patch target is:

```text
Replay Log replay-card summary block
```

Primary likely file:

```text
poke-sim/ui.js
```

Possible supporting files only if inspection proves they are required:

- `poke-sim/index.html`
- `poke-sim/strategy-injectable.js`
- directly relevant tests under `poke-sim/tests/`

If Kevin approval to code is not present in the thread, stop before editing files and report that approval is missing.

---

## Hard Limits

Do not:

- change Supabase schema
- expand persistence
- deploy
- merge to `main`
- redesign broad coaching architecture
- invent a new top-level tab or subsystem
- claim more than the available evidence supports
- fake confidence
- inspect or expose secrets, `.env` values, credentials, or production-only settings

---

## Feature Boundary

The slice must stay inside this shape:

- one coaching summary
- one issue category
- one evidence label
- one next action
- `not enough evidence` as a first-class result

Keep it smaller than the full coaching vision.

If strategy-context joining is too brittle, simplify to replay + turn-log evidence only.

If the slice cannot be implemented without broader architecture changes, stop and say so.

---

## Required Response Style

Every final response must use:

1. Bottom line
2. Why it matters
3. What changed
4. Tests / verification
5. Tradeoffs
6. Upgrade path

Be direct.

Do not overbuild.

---

## Step 1 — Verify Approval And Working Context

Inside the Pokémon Sim repo, first run:

```bash
git status
git branch --show-current
git log --oneline -5
```

Then inspect only the relevant safe files:

```bash
rg -n "tab-replays|replay-list|history-list|tab-strategy|strategy-content|tab-pilot|pilot-guide-content" poke-sim/index.html
rg -n "renderReplays|csRenderTurnLogRows|csBuildDecisionAudit|downloadReplayTurnLog|renderStrategyTab|csBuildStrategyReportV2|buildStrategyReport|showInlinePilotCard" poke-sim/ui.js poke-sim/strategy-injectable.js
rg -n "turnLog|turning_point|position_path|coaching_summary|coaching_rules|pilot_plan|matchup_warnings|coaching_notes|confidence_tier|provenance" poke-sim/ui.js poke-sim/engine.js poke-sim/tests
```

If the repo state differs materially from the Mission 005A file map, say so before editing.

---

## Step 2 — Confirm The Smallest Patch

Before coding, confirm:

1. Replay Log is still the safest placement.
2. `poke-sim/ui.js` is still the primary patch site.
3. Existing replay, turn-log, and strategy context are enough for one bounded summary.
4. `not enough evidence` can be supported without new storage or architecture.

If any of those fail, stop and return `Simplify` or `Pause`.

---

## Step 3 — Implement Only The Bounded Slice

Implement the smallest possible patch that:

- adds one replay-card summary block in Replay Log
- derives one issue category from existing replay / turn-log / strategy context
- shows one evidence label
- shows one next action
- returns `not enough evidence` when evidence is weak or mismatched

Preferred issue categories are bounded and conservative. Do not expand into a taxonomy unless the smallest patch truly requires it.

Use existing surfaces and data only.

Do not add persistence.

Do not add a new architecture layer.

---

## Step 4 — Tests And QA

Run only the smallest relevant checks tied to the slice.

Start with the most relevant existing test anchors:

- `poke-sim/tests/t93_replay_log_cap_tests.js`
- `poke-sim/tests/phase5_turn_log_tests.js`
- `poke-sim/tests/phase6_coaching_voice.js`

Add or update tests only if needed to cover:

- one issue category
- one evidence label
- one next action
- `not enough evidence`
- no Replay Log regression

If you cannot run tests, say exactly why.

---

## Step 5 — No-Overclaim Rules

The patch must not:

- claim the true reason for a loss when evidence is partial
- imply replay and strategy context match unless the current replay context supports it
- show more than one issue category
- show more than one next action
- use stronger confidence wording than the evidence label supports

The patch must:

- support `not enough evidence`
- label the evidence basis explicitly
- stay local to replay review

Allowed evidence labels should stay bounded, such as:

- `replay only`
- `replay + turn log`
- `replay + strategy context`
- `not enough evidence`

---

## Step 6 — Stop Conditions

Stop and report `Pause` if implementation requires:

- new persistence
- schema work
- a new subsystem
- broader Strategy or Pilot Guide redesign
- stronger claims than the current replay evidence supports

Report `Simplify` if the safe version is smaller than originally planned.

---

## Step 7 — Final Output

Your final answer must include:

- exact files changed
- what summary logic was added
- what evidence labels are supported
- what tests were run
- whether the result is `Proceed`, `Simplify`, or `Pause`

Keep the scope honest.
If the smallest patch is not safe, do not force it.
```
