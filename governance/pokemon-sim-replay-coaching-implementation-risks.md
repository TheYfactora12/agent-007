# Pokémon Sim Replay Coaching Slice — Implementation Risks

## Main Risks

### 1. Overclaim Risk

Replay data may not support a confident “why you lost” explanation.

Control:

- allow only one issue category
- require `not enough evidence`
- require one evidence label

### 2. Data-Flow Ambiguity Risk

The replay object, turn-log audit, and strategy report are related but may not line up cleanly per replay card.

Control:

- coding mission must confirm exact in-scope data path before implementation

### 3. Scope-Creep Risk

The slice could expand into a generalized coaching engine or strategy redesign.

Control:

- patch only replay-card rendering path first
- no new subsystem

### 4. UX Clutter Risk

Replay cards already have chips, logs, turn rows, and history.

Control:

- keep the summary to three lines maximum
- place it before detailed turn-log content

### 5. Hidden Persistence Risk

It may be tempting to save summary results or history.

Control:

- block persistence expansion for this slice

## Recommendation

Proceed only if the implementation can stay local to existing replay rendering and summary derivation from current data.
