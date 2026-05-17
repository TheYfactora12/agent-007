# Risk Routing Standard

## Purpose

This standard tells 007 agents when they may proceed, when they must document upward, and when they must pause for Kevin, committee, or board-level review.

The goal is speed with control.

## Core rule

Low-risk work can move quickly.

Medium-risk work requires executive visibility.

High-risk work requires committee review.

Critical-risk work requires Kevin and full board-style review before execution.

## Decision factors

Every mission should be rated across these dimensions:

- user impact
- data sensitivity
- security impact
- regulatory impact
- reversibility
- money / tool spend
- time cost
- autonomy level
- public or reputational impact
- operational dependency

Use the highest applicable rating as the mission rating.

## Low risk

### Definition

Low-risk work is reversible, low-cost, non-sensitive, and unlikely to harm users or systems.

### Examples

- documentation updates
- wording improvements
- small template refinements
- internal notes
- low-impact issue creation
- non-production planning

### Approval route

Executive-agent level.

### Required evidence

- short summary
- changed files or issue link
- any assumptions noted

### Proceed rule

Agents may proceed with documentation.

## Medium risk

### Definition

Medium-risk work affects process, workflow, budget, or multiple projects, but remains reversible and does not involve sensitive data or critical production systems.

### Examples

- paid credits or tool usage beyond routine use
- workflow standard changes
- new templates used across projects
- non-sensitive integrations
- medium-scope repo changes
- changes that affect Alfredo or Josh workflows

### Approval route

Executive review and documented communication.

### Required evidence

- mission packet
- risk rating
- budget/time impact
- rollback or backtrack plan
- affected users / team members

### Proceed rule

Agents may proceed if the risk is documented, the action is reversible, and Kevin has visibility.

## High risk

### Definition

High-risk work may affect security, privacy, public claims, architecture, user trust, or meaningful time/money investment.

### Examples

- security-sensitive changes
- privacy or data handling changes
- agent autonomy expansion
- new integrations touching user data
- public claims about AI capability
- significant architecture changes
- high time investment
- changes that could mislead users if wrong

### Approval route

Committee-style review before execution.

Possible committees:

- Risk Committee
- Technology / Architecture Committee
- Finance / Budget Committee
- Product / User Impact Committee

### Required evidence

- complete mission packet
- committee routing packet
- risk and control analysis
- rollback / backtrack plan
- user impact analysis
- security/data review
- open questions

### Proceed rule

Do not execute until committee review is complete and Kevin has approved the direction.

## Critical risk

### Definition

Critical-risk work is irreversible, externally significant, legally/regulatorily sensitive, or capable of causing serious harm if wrong.

### Examples

- product launch
- major roadmap commitment
- significant investment of time or money
- sensitive user data storage
- public market-facing claims
- production auth/security changes
- autonomous agent action with material impact
- legal, regulatory, or reputational exposure
- no viable rollback path

### Approval route

Kevin plus full board-style review.

### Required evidence

- full mission packet
- full board session
- legal/ethical screen where relevant
- security and data protection review
- budget / opportunity cost review
- rollback or explicit no-rollback acknowledgment
- go/no-go recommendation

### Proceed rule

Pause until Kevin approves.

If the action is illegal, deceptive, or creates uncontrolled harm, reject it.

## Budget thresholds

Until Kevin sets specific thresholds, use conservative defaults:

- Low: no new spend or trivial existing-tool usage
- Medium: small tool/credit usage or subscription evaluation
- High: recurring spend, meaningful compute burn, or purchases affecting multiple projects
- Critical: large spend, major commitment, or spend that changes roadmap priorities

Time is budget.

If an effort consumes significant attention or delays higher-value work, treat it as budget impact even if cash cost is zero.

## Autonomy thresholds

- Low: agent drafts or recommends; human reviews before action
- Medium: agent edits docs, issues, or low-risk templates with audit trail
- High: agent modifies code, workflows, integrations, or persistent systems
- Critical: agent changes production, security controls, user data handling, or public-facing claims

## Data thresholds

- Low: no personal, private, sensitive, or production data
- Medium: internal non-sensitive project context
- High: private repo data, user context, credentials-adjacent information, business-sensitive content
- Critical: secrets, regulated data, personal data, financial data, authentication, authorization, or production logs

## Stop rule

Agents must pause if:

- the action may be illegal
- the mission is unclear
- critical risk exists without approval
- rollback is needed but not defined
- sensitive data is involved without a protection plan
- confidence is low and no recovery path exists
- the system is continuing because of ego, sunk cost, or momentum rather than evidence

## Communication rule

Every mission must identify who needs to know:

- Kevin only
- Executive agents
- Committee agents
- Full board
- Alfredo / Josh
- external users or stakeholders

## Challenger requirement

The Challenger Agent must ask:

- Are we over-governing simple work?
- Are we under-governing risky work?
- Is the risk rating honest?
- Is rollback real or theoretical?
- Are time and attention being treated as budget?
- Are we moving because of evidence or because the idea feels exciting?
