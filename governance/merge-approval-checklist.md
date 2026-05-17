# Merge Approval Checklist

## Bottom Line

Every mission that ends in a merge recommendation needs one final pre-merge check.

This checklist exists to prevent avoidable merges caused by stale PR language, missing approval evidence, or incomplete review framing.

## Required Checks

- [ ] Kevin written approval present
- [ ] PR body current
- [ ] `START_HERE.md` impact checked
- [ ] governance route checked
- [ ] rollback/backtrack noted
- [ ] no secrets/data/spend/production impact
- [ ] final merge recommendation documented

## When To Use It

Use this checklist before:

- merging to `main`
- changing PR status from draft to ready
- making a final go/no-go recommendation

## Minimum Evidence

For each merge-ready mission, capture:

- approval source
- branch or PR identifier
- current governance route
- rollback or backtrack path
- impact summary
- merge recommendation

## Mission 002 Findings That Justified This Checklist

### What Worked

- fallback artifact path worked
- `START_HERE.md` exists
- mission artifacts committed
- simplicity audit exists

### What Failed

- GitHub connector write path failed
- PR body was stale
- PR merged before the draft/review language was cleaned up

## Lesson

Every mission needs a final pre-merge checklist.

## Recommended Merge Note Format

```md
## Merge Recommendation

Approval:

PR/branch state:

Governance route:

START_HERE impact:

Rollback/backtrack:

Impact check:

Recommendation:
```
