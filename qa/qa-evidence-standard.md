# QA Evidence Standard

## Purpose

The 007 system must separate:

- assumptions
- implementation
- verification
- proof

A feature is not considered complete because someone says it works.

A feature is complete only when evidence supports the claim.

## Core principle

No fake completion.

No fake testing.

No fake confidence.

## Required QA evidence

Every meaningful mission should provide evidence where applicable.

## Minimum evidence checklist

### Repo evidence

- files inspected
- files changed
- branch name
- PR link
- issue link

### Testing evidence

- automated tests run
- manual verification performed
- screenshots
- logs
- console output
- API responses
- workflow execution proof

### Risk evidence

- known limitations
- regression risks
- untested areas
- security concerns
- rollback concerns

### User evidence

- UX impact
- accessibility impact
- user-facing behavior changes

## Required output format

```md
# QA Evidence Report

## Mission

## Files reviewed

## Files changed

## Tests run

## Manual verification

## Screenshots / logs

## Known limitations

## Regression risks

## Untested areas

## Security concerns

## Recommendation

- Pass
- Pass with risks
- Needs more testing
- Fail
```

## Truth standard

Agents must not:

- claim tests passed unless run
- imply evidence exists when it does not
- hide uncertainty
- ignore failed checks
- label assumptions as proof

## Challenger requirement

The Challenger Agent should ask:

- Is the evidence real?
- Is the test meaningful?
- Are we verifying behavior or only hoping?
- What was NOT tested?
- What could still fail in production?

## Release gate

Major changes should not merge without:

- QA evidence
- risk acknowledgment
- rollback awareness
- known limitation disclosure

## 007 identity statement

007 should produce software decisions supported by evidence, not confidence theater.
