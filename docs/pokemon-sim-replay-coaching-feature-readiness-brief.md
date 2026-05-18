# Pokémon Sim Replay Coaching — Feature Readiness Brief

## Bottom Line

The most executable next mission is a bounded replay-analysis / coaching slice built around existing product surfaces:

- Replay Log
- Strategy tab
- Pilot Guide
- coaching-related specs already in the repo

## Repo-Aware Readiness Summary

The real repo context supports this mission because:

- replay concepts already exist in the product language
- coaching concepts already exist in specs and tests
- the app is already organized around post-battle guidance surfaces
- the project has enough QA culture to support a bounded feature slice later

## Recommended Feature Slice

### Working Name

Replay Review to Coaching Summary

### User Problem

```text
I lost a match. Help me understand whether the problem was team choice, plan mismatch, or execution.
```

### Product Goal

Translate existing replay and strategy context into one trainer-facing coaching summary with one next action.

### Scope Boundary

In scope for the next coding mission:

- define what replay inputs are needed
- define what existing sim/strategy outputs can be reused
- define one bounded coaching summary shape
- define when the app should refuse to overclaim

Out of scope:

- full persistence redesign
- Supabase schema change
- new production integrations
- broad engine rewrite
- live account or premium-state logic

## Acceptance Criteria

The next coding mission should only proceed if it can satisfy:

1. A player can understand the feature in under 2 minutes.
2. The feature names what evidence it used.
3. The feature can say `not enough evidence` instead of overclaiming.
4. The feature produces one recommended next action.
5. The feature does not require hidden production data or unsafe storage.
6. The feature reuses existing app surfaces instead of creating a new parallel system.

## QA / Evidence Expectations

The eventual coding mission should produce:

- one feature spec tied to actual repo surfaces
- one acceptance checklist
- one happy-path example
- one blocked / insufficient-evidence example
- one no-overclaim check
- one regression note for replay / strategy / pilot surfaces touched

## Security / Data Handling Notes

- do not inspect or rely on secret values from `.env`
- do not require Supabase credentials for the first slice
- do not store raw private logs beyond existing approved patterns
- prefer local/session-bounded analysis for the first implementation slice
- if persistence becomes necessary later, route it as a separate risk decision

## Why This Is Safer Than A Bigger Build

The repo already has broad coaching and strategy ambition.

The risk is not lack of ideas.

The risk is building a large coaching system before proving the smallest useful replay-to-guidance loop.

## Recommendation

Proceed to a coding mission only for this bounded slice:

```text
Replay Review to Coaching Summary using existing surfaces and explicit no-overclaim guardrails
```
