# Pokémon Sim Replay Coaching Slice — QA Plan

## Goal

Define the minimum evidence required before approving code for the replay-to-coaching summary slice.

## Required QA Evidence

- one file-level implementation plan naming the exact touched files
- one positive replay example with sufficient evidence
- one replay example that returns `not enough evidence`
- one screenshot or render proof of summary placement in Replay Log
- one regression checklist for Replay Log / Strategy / Pilot Guide surfaces touched

## Future Coding Checks

- verify exactly one issue category is shown
- verify exactly one evidence label is shown
- verify exactly one next action is shown
- verify `not enough evidence` renders when context is weak
- verify no persistence or schema behavior is added
- verify replay cards remain readable and expandable

## Existing Test Surfaces To Reuse

- replay log tests
- turn-log tests
- coaching voice tests

## Rollback Check

If the future coding patch fails review or grows past the slice:

- remove the summary block from Replay Log
- remove any new local helper used only for the summary
- confirm Replay Log, Strategy, and Pilot Guide render exactly as they do today
- confirm no persisted data format or saved history behavior changed

## Out Of Scope For This Readiness Mission

- runtime implementation
- browser testing
- bundle rebuild
- Supabase validation

## Approval Standard

Do not approve the coding mission if the QA plan cannot demonstrate bounded scope and no-overclaim behavior.
