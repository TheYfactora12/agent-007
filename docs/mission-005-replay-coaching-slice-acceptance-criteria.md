# Mission 005 Acceptance Criteria — Replay Review to Coaching Summary Slice

## Slice Goal

Use existing Replay Log, Strategy, and Pilot Guide context to produce one coaching summary for a player after a replay review.

## Acceptance Criteria

1. The feature uses existing product surfaces instead of creating a new parallel subsystem.
2. The output names the evidence sources it relied on.
3. The output chooses from a bounded set of issue categories:
   - team choice
   - plan mismatch
   - execution
   - not enough evidence
4. The output provides exactly one recommended next action.
5. The output can refuse to classify confidently when evidence is weak or mismatched.
6. The feature does not require Supabase schema changes or new persistence.
7. The feature does not depend on secrets, private production config, or hidden account data.
8. A player can understand the summary in under 30 seconds.
9. The slice can be tested with one positive example and one insufficient-evidence example.

## Explicit Non-Goals

- long-form coaching essays
- account memory or long-term trend tracking
- automatic replay ingestion pipelines
- broad Battle IQ redesign
- premium-state expansion

## Coding Proceed Gate

Coding may proceed only if the implementation plan can stay within this slice boundary.
