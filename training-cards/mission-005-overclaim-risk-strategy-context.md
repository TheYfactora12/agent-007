# Training Card — Mission 005 Overclaim Risk From Strategy Context

## Situation

Mission 005 added a replay-card Coaching Summary slice to Pokémon Champions Sim.

The first implementation attempted to support `plan mismatch` using Strategy context.

## Bad Pattern

The Strategy context came from current/global app state, not replay-linked state.

That meant a replay card could surface coaching guidance from stale or mismatched Strategy context.

This created overclaim risk.

## Correction

The strategy-context fallback was removed before merge.

Final v1 supports only:

- `execution`
- `not enough evidence`

Final v1 evidence labels are only:

- `replay + turn log`
- `not enough evidence`

## New Rule

Do not use context from global/current app state to make replay-specific coaching claims unless the context is explicitly linked to that replay.

If linkage is not provable, simplify to replay-linked evidence only.

## Reusable Example

When building coaching, advisory, or decision-support features:

```text
If evidence is not tied to the specific user object being reviewed, do not use it for a confident conclusion.
```
