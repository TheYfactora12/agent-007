# Mission 005A Packet — Pokémon Sim Implementation Readiness

## Mission Name

Replay Review to Coaching Summary Slice — implementation readiness

## Mission Owner

Kevin Paul Medeiros Jr.

## Target Repo / System

- Repo: `TheYfactora12/Pokemon-Champions-Sim-Planner`
- Local inspection path used in this session: `/Users/kevinmedeiros/Downloads/Pokemon-Champions-Sim-Planner`
- Branch observed during inspection: `main`

## Objective

Use real Pokémon Sim repo context to define the smallest safe implementation patch for the Mission 005 slice before any coding begins.

## Target User

Primary user:

- competitive players who want a quick answer after replay review: team choice, plan mismatch, execution, or not enough evidence

Secondary user:

- Kevin as product owner deciding whether the slice is ready for a bounded coding mission

## Governance Route

Proceed with Kevin visibility.

## Hard Limits

- no code changes in this mission
- no merge to `main`
- no deploy
- no spend
- no Supabase schema changes
- no persistence expansion
- no broad coaching redesign

## Exact Files Involved

High-confidence file set:

- `poke-sim/index.html`
- `poke-sim/ui.js`
- `poke-sim/strategy-injectable.js`
- `poke-sim/tests/t93_replay_log_cap_tests.js`
- `poke-sim/tests/phase5_turn_log_tests.js`
- `poke-sim/tests/phase6_coaching_voice.js`

Possible but not primary:

- `poke-sim/engine.js`
- `poke-sim/logger.js`

## Existing Surfaces Mapped

### Replay Log surface

- host: `#tab-replays` in `poke-sim/index.html`
- primary containers: `#replay-list`, `#history-list`
- render path in `poke-sim/ui.js`: `renderReplays()`, `csRenderTurnLogRows()`, `loadAnalysisHistory()`

### Strategy surface

- host: `#tab-strategy` and `#strategy-content` in `poke-sim/index.html`
- render path in `poke-sim/ui.js`: `renderStrategyTab()`, `csBuildStrategyReportV2()`
- supporting knowledge layer: `poke-sim/strategy-injectable.js`

### Pilot Guide surface

- host: `#tab-pilot` and `#pilot-guide-content` in `poke-sim/index.html`
- inline coaching surface in `poke-sim/ui.js`: `showInlinePilotCard()`

## Current Replay / Context Data Available

From replay objects in `renderReplays()` and related helpers:

- `result`
- `turns`
- `trTurns`
- `winCondition`
- `oppKey`
- `log`
- `turnLog`
- `turning_point`
- `position_path`
- `seed`

From structured turn-log rendering:

- per-turn `actions`
- per-turn `position_score`
- per-turn `delta.position_score`
- per-turn `hp_pct`
- decision-gap audit output via `csBuildDecisionAudit()`
- turn-level coaching text via `coachIn()`

From strategy reporting:

- `coaching_summary`
- `coaching_rules`
- `pilot_plan`
- `matchup_warnings`
- `coaching_notes`
- confidence / provenance-style report metadata

## Proposed Smallest Patch

Do not create a new subsystem.

Patch only the replay review presentation path so one replay card can show one bounded coaching summary block using data already present.

Smallest plausible patch:

1. Read one replay object already rendered in `renderReplays()`
2. Derive one issue category from existing replay / turn / strategy context
3. Attach one evidence label
4. Render one next action
5. Fall back to `not enough evidence` when context is weak or mismatched

## Proposed Placement

Best placement:

```text
Replay Log expanded card, above or alongside the turn-log details
```

Why:

- it is already where replay-specific context is rendered
- it avoids inventing a new top-level tab or architecture
- it can reuse replay object data and turn-log audit output
- it keeps the summary tied to the replay the player is inspecting

## Stop Conditions

Pause if:

- implementation requires new persistence
- implementation requires schema work
- replay data is insufficient to support even a bounded summary
- the patch would require broad Strategy or Pilot Guide redesign

## Rollback / Backtrack Plan

If the coding mission proves too broad:

- remove the summary block entirely
- revert to existing replay rendering
- keep any new helper pure and local to replay rendering

## Initial Recommendation

Proceed to coding only if the patch can stay inside the replay-card rendering path and reuse current replay + strategy context without persistence or architecture expansion.

Decision state for Kevin review:

- `Proceed` if the coding patch is limited to one replay-card summary block in `poke-sim/ui.js`
- `Simplify` if strategy-context joining proves brittle and the slice must fall back to replay + turn-log evidence only
- `Pause` if the patch requires new architecture, persistence, schema work, or claims stronger than the current replay evidence supports
