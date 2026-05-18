# Mission 005 Implementation Risk Notes

## Main Risks

### 1. Overclaim Risk

The feature may sound smarter than the evidence actually supports.

Control:

- require explicit evidence labeling
- require `not enough evidence` as a valid outcome

### 2. Scope-Creep Risk

Replay summary work may turn into a broad coaching architecture redesign.

Control:

- keep the slice tied to existing surfaces only
- block persistence or schema expansion

### 3. Data-Flow Ambiguity Risk

Without deeper code-path inspection, the exact replay / strategy / pilot data path may still be unclear.

Control:

- require a coding mission to confirm actual data touch points before implementation

### 4. UX Clutter Risk

Adding another coaching output may crowd the existing user flow.

Control:

- keep the output to one bounded summary and one next action

### 5. False Confidence Risk

The simulator may imply causality where only partial evidence exists.

Control:

- explicit no-overclaim rules
- insufficient-evidence branch must be first-class

## Recommendation

Proceed only as a bounded coding-readiness slice.

If the first implementation plan requires persistence, schema, or broad UI restructuring, simplify before coding.
