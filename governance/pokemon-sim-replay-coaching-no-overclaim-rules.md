# Pokémon Sim Replay Coaching Slice — No-Overclaim Rules

## Hard Rules

The slice must not:

- claim to know the true reason for a loss if evidence is partial
- imply replay and strategy context match unless the current replay context supports it
- produce more than one issue category
- produce more than one next action
- speak with stronger confidence than the evidence label allows

## Required Rules

The slice must:

- support `not enough evidence` as a first-class result
- label the evidence basis explicitly
- reuse existing surfaces
- remain local to the replay review context

## Allowed Evidence Labels

Recommended bounded evidence labels:

- `replay only`
- `replay + turn log`
- `replay + strategy context`
- `not enough evidence`

The coding mission may simplify this set further, but it must not expand into a larger confidence taxonomy unless needed.

## Proceed / Simplify / Pause Recommendation

Proceed with a bounded coding mission.

Reason:

- exact files and hosts are now identified
- a smallest patch shape is visible
- the no-overclaim boundary is explicit

Simplify if:

- replay + turn-log evidence is available but strategy-context joining is weak
- the safest slice is a replay-only summary with `not enough evidence` fallback

Pause if:

- deeper code inspection shows the replay card path cannot access enough context without broader architecture changes
- the patch would require new persistence, schema work, or a larger confidence system
