# Mission 005 Packet — Replay Review to Coaching Summary Slice

## Mission Name

Replay Review to Coaching Summary Slice

## Mission Owner

Kevin Paul Medeiros Jr.

## Target Repo / System

- Repo: `TheYfactora12/Pokemon-Champions-Sim-Planner`
- Source context: real repo inspected at a safe high level
- Target project surfaces: Replay Log, Strategy tab, Pilot Guide

## Objective

Define the smallest coding-ready feature slice that turns replay review into one bounded coaching summary with one next action.

## Target User

Primary user:

- competitive players who want to know whether a loss came from team choice, plan mismatch, or execution

Secondary user:

- Kevin as product owner scoping a safe next coding mission

## Why This Matters

Mission 004A proved Agent-007 can use real repo context to sharpen the next mission.

Mission 005 should convert that into a coding-ready slice without drifting into a full coaching system redesign.

## Risk Tier

Medium.

## Governance Route

Proceed with Kevin visibility.

## Scope

In scope:

- one bounded replay review to coaching summary slice
- reuse existing Replay Log / Strategy / Pilot Guide surfaces
- define acceptance criteria
- define implementation-risk notes
- define QA evidence plan
- define security / data handling notes
- define explicit no-overclaim rules
- make one recommendation on whether coding may proceed

Out of scope:

- Supabase schema changes
- persistence changes
- production deployment
- broad coaching architecture redesign
- merge to `main`
- runtime automation

## Feature Slice Definition

The feature slice is:

```text
Given an existing replay review context, generate one bounded coaching summary that:
- states what evidence was used
- names the most likely issue category
- says when evidence is insufficient
- recommends one next action
```

## Success Criteria

Mission 005 is successful when:

- the slice is small enough to implement without redesigning coaching architecture
- the feature surfaces are explicit
- no-overclaim behavior is explicit
- risk notes are clear enough to decide whether coding should proceed

## Stop Conditions

Pause if:

- the slice requires new persistence or schema work
- the slice depends on hidden production data
- the slice grows into a full replay intelligence system
- the reuse path across existing surfaces is unclear

## Evidence Required

- mission packet
- acceptance criteria
- implementation-risk notes
- QA evidence plan
- security / data handling notes
- no-overclaim rules
- proceed / simplify / pause recommendation

## Rollback / Backtrack Plan

This mission is documentation-only.

Rollback path:

- tighten or rewrite the slice definition
- reduce scope further before any coding mission
- defer coding until the slice can be implemented without architecture sprawl

## Initial Recommendation

Proceed with coding only if the bounded slice stays tied to existing surfaces and explicit no-overclaim rules.
