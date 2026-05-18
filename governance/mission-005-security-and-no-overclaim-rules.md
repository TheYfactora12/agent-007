# Mission 005 Security / Data Handling Notes and No-Overclaim Rules

## Security / Data Handling Notes

- do not inspect or rely on `.env` values
- do not use Supabase keys or production config
- do not introduce new persistence
- do not store raw private logs beyond existing approved patterns
- keep the first slice local / session-bounded where possible

## No-Overclaim Rules

The feature must not:

- claim to know why a player lost when evidence is incomplete
- imply replay and simulated context match unless the feature can support that claim
- present a strong coaching conclusion without naming the evidence it used
- turn uncertainty into fake confidence

The feature must:

- name the evidence sources used
- allow `not enough evidence` as a first-class result
- produce one bounded recommendation instead of broad coaching narrative
- distinguish between likely inference and confirmed evidence when possible

## Proceed Decision Rule

Coding may proceed only if the implementation plan preserves these rules without requiring broader architecture changes.
