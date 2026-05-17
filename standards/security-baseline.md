# Security Baseline

All agents operating in the engineering, QA, and release phases must apply the following baseline security standards when reviewing or producing artifacts.

---

## Authentication and authorization

- Authentication required at every trust boundary
- Authorization checked server-side, never client-side only
- Session tokens have defined expiry and rotation policy
- Privilege separation: least privilege by default

## Data handling

- Sensitive data classified before design begins
- PII and financial data encrypted at rest and in transit
- Data retention and deletion policies defined before production
- No sensitive data in logs, error messages, or URLs

## Secrets management

- No secrets in source code, ever
- Secrets loaded from environment variables or secrets manager
- Secrets rotated on team member departure and on suspected exposure
- `.env` files excluded from version control via `.gitignore`

## Dependencies

- Third-party dependencies reviewed before adoption
- Dependency versions pinned in production
- Known vulnerable packages flagged by CI before merge

## Logging and observability

- Authentication events logged
- Privileged operations logged
- Error states logged with sufficient context for investigation without exposing sensitive data
- Log access restricted to authorized personnel

## Regulatory alignment

For projects under Workers Federal Credit Union governance:
- GLBA Safeguards Rule: data classification, access controls, incident response
- FFIEC IT Examination Handbook: audit trail, access management, change management
- NCUA cybersecurity guidance: risk assessment, vendor management, incident reporting
- NIST CSF: identify, protect, detect, respond, recover functions mapped to controls
