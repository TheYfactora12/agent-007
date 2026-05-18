# Pokémon Sim Replay Coaching Slice — Acceptance Criteria

## Feature Goal

For one replay being viewed in Replay Log, show one coaching summary that stays bounded, explainable, and safe.

## Acceptance Criteria

1. The summary appears inside the existing Replay Log flow.
2. The summary produces exactly one issue category.
3. The summary shows exactly one evidence label.
4. The summary shows exactly one next action.
5. The summary can return `not enough evidence` as a first-class result.
6. The summary does not require new persistence or schema work.
7. The summary does not create a new top-level tab or parallel coaching system.
8. The summary names only what the available evidence supports.
9. The summary remains understandable in under 30 seconds.

## Allowed Output Shape

```text
Issue:
Evidence:
Next action:
```

Where:

- `Issue` is one bounded category
- `Evidence` is one label
- `Next action` is one recommendation

## Non-Goals

- multi-section coaching report
- trend analysis redesign
- premium memory or history features
- cross-replay aggregate analysis
- Battle IQ system expansion

## Coding Gate

Coding may proceed only if the planned patch can satisfy all criteria above without broadening scope.
