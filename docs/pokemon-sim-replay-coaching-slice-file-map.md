# Pokémon Sim Replay Coaching Slice — File Map

## Exact Files Involved

### Primary implementation files

- `poke-sim/index.html`
  - owns the tab hosts and Replay Log / Strategy / Pilot Guide containers

- `poke-sim/ui.js`
  - owns Replay Log rendering
  - owns turn-log rendering
  - owns inline pilot card rendering
  - owns Strategy Report rendering path

### Existing coaching / strategy support

- `poke-sim/strategy-injectable.js`
  - contains coaching helpers like `coachPre`, `coachIn`, `coachPost`
  - contains strategy guide and coaching lint logic

### Existing test anchors

- `poke-sim/tests/t93_replay_log_cap_tests.js`
- `poke-sim/tests/phase5_turn_log_tests.js`
- `poke-sim/tests/phase6_coaching_voice.js`

### Context-only secondary files

- `poke-sim/engine.js`
  - confirms replay / turn-log related structures exist

- `poke-sim/logger.js`
  - structured logger exists if bounded warnings or lint failures need logging later

## Surface Map

### Replay Log

- HTML host:
  - `#tab-replays`
  - `#replay-list`
  - `#history-list`

- JS path:
  - `renderReplays()`
  - `csRenderTurnLogRows()`
  - `csBuildDecisionAudit()`
  - `downloadReplayTurnLog()`

### Strategy

- HTML host:
  - `#tab-strategy`
  - `#strategy-content`

- JS path:
  - `renderStrategyTab()`
  - `csBuildStrategyReportV2()`
  - `buildStrategyReport()`

### Pilot Guide

- HTML host:
  - `#tab-pilot`
  - `#pilot-guide-content`

- JS path:
  - `showInlinePilotCard()`

## Proposed Summary Placement

Recommended placement:

```text
inside each Replay Log expanded card, before the turn-log details
```

Reason:

- replay object is already in scope there
- turn-log evidence is already in scope there
- no new navigation or storage model is required

## Current Replay / Context Data Available

Replay card context already exposes:

- result
- turns
- Trick Room turns
- win condition
- opponent key
- battle log
- turn log
- turning point
- position path
- replay seed

Turn-log helpers already expose:

- score deltas
- swing turns
- decision-gap audit flags
- per-turn coaching text

Strategy report path already exposes:

- coaching summary
- coaching rules
- pilot plan
- matchup warnings
- coaching notes

## Smallest Patch Shape

One pure helper plus one rendering hook is likely enough.

Bounded patch idea:

- helper computes summary payload from existing replay + optional strategy context
- `renderReplays()` injects one summary block

Do not spread the feature across multiple architectural layers unless inspection during coding proves it is required.
