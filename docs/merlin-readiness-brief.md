# Merlin Readiness Brief

## Bottom line

The smallest useful next Merlin readiness artifact is a **release-state
reconciliation brief** inside the Merlin repo.

## Why

The current repo has a strong product north star and a detailed evidence pack,
but its readiness claims are not fully aligned:

- `README.md` says Merlin is preparing for controlled local testing and is not
  public beta or public release yet.
- `docs/operations/TRUSTED_LOCAL_BETA_EVIDENCE.md` says Local Trusted Beta is
  not signed off until the named manual evidence run is complete.
- `docs/CANONICAL_PROJECT_STATE.md` allows only the claim “preparing for
  controlled local testing.”
- `docs/README.md` presents a release table that says `v1.0 — Stable Installer
  Release` is complete.

That mismatch creates readiness confusion before any new implementation work is
started.

## What this means

Merlin does not primarily need another feature artifact right now. It needs one
truth artifact that answers:

- what Merlin is ready to claim now
- what Merlin is not ready to claim now
- what evidence gates remain open
- which document is authoritative when release-state language conflicts

## Smallest useful next artifact

Create one Merlin-repo document such as:

`docs/operations/MERLIN_RELEASE_STATE_RECONCILIATION.md`

The artifact should:

- restate the currently allowed release claim
- reconcile `README.md`, `docs/README.md`, `CANONICAL_PROJECT_STATE.md`, and
  the Trusted Local Beta evidence pack
- list the remaining evidence gates to move from controlled local testing to
  Local Trusted Beta / Public Beta / Public Release
- identify which existing statement should be softened, removed, or clarified

## Why this is the right next artifact

- It is documentation-only.
- It reduces decision noise for Kevin immediately.
- It prevents overclaim before more implementation work.
- It sets a cleaner baseline for future installer, onboarding, and recovery
  missions.
- It fits Merlin’s current v1.0 rule: do not widen scope beyond the five core
  jobs.

## Recommendation

Simplify.

Do not start another Merlin build slice yet. First create one release-state
reconciliation artifact so the repo has one clear readiness truth.
