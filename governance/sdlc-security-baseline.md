# SDLC and Security Baseline

These rules apply to every task, every environment, and every risk tier.

Not optional.

## SDLC Rules

1. Requirements before code. No implementation without a documented mission or requirement.
2. Test before propose. All code changes must be tested in dev/test before proposing to main.
3. One concern per PR. Do not mix features, bug fixes, and refactors.
4. Document the why. Explain why the change exists and what problem it solves.
5. Rollback plan required. Every non-trivial change must explain how to undo it.
6. No dead code. Remove unused code. No commented-out code without a documented reason.
7. No hardcoded values. Use environment variables, config files, or constants.

## Security-First Rules

1. Secrets never in code. No API keys, passwords, tokens, or credentials in any file.
2. Least privilege always. Request only permissions actually needed.
3. Input validation on everything. Validate and sanitize all input boundaries.
4. No RLS bypass. Row-level security policies must be enforced and tested.
5. Dependency review. Review new dependencies for known CVEs before use.
6. Auth before data. Authentication and authorization implemented before data access.
7. Secure defaults. Default to locked down and explicitly open only what is required.
8. Logging without secrets. Audit logs required. Secrets must never appear in logs.
9. Error handling without leaking. Error messages must not expose internals.
10. OWASP Top 10 check. Any web-facing feature reviewed against OWASP Top 10 before proposing to main.

## Enforcement Rule

If SDLC or security-first rules are violated without documented exception and approval, the mission must pause.
