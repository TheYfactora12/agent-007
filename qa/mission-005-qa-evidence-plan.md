# Mission 005 QA Evidence Plan

## Goal

Define the minimum evidence required before saying the replay-to-coaching summary slice is ready to code or review.

## Required Evidence

- one implementation plan tied to real repo surfaces
- one happy-path example where evidence is sufficient
- one blocked-path example where the result is `not enough evidence`
- one UI placement decision showing where the summary appears
- one regression checklist covering touched Replay Log / Strategy / Pilot Guide surfaces

## Test Expectations For The Future Coding Mission

- verify evidence-source labeling appears in the output
- verify only one next action is shown
- verify weak evidence does not produce a strong coaching claim
- verify the summary does not require new persistence behavior
- verify existing surfaces remain readable

## Out Of Scope For This Planning Mission

- runtime tests
- bundle rebuild
- browser validation
- Supabase validation

## Review Standard

The coding mission should not be approved if the test plan cannot demonstrate:

- bounded scope
- no-overclaim behavior
- safe surface reuse
