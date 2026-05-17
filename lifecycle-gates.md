# Lifecycle Gates

Each gate defines what must be true before the next phase begins. Agents are the gate keepers — each gate produces an artifact that the next phase consumes.

---

## Gate 1 — Discovery sign-off

**Trigger:** Before sprint 1 planning begins  
**Owner agents:** Software Architect, InfoSec Risk Officer, Vendor Risk Assessor  
**Required artifacts:**
- Scope definition
- High-level architecture direction
- Initial risk statement
- Third-party dependency risk notes when vendors or hosted services are in scope
- Key unknowns log

**Exit criterion:** Team can answer: *What are we building, what are the boundaries, and what are the known risks?*

---

## Gate 2 — Architecture review

**Trigger:** Before sprint 1 code merges  
**Owner agents:** Software Architect, Security Engineer, Threat Modeler, Docker Security Hardener, DevOps Automator  
**Required artifacts:**
- ADR log (at least the top 3 decisions)
- Threat model
- Environment and CI/CD plan
- Container and runtime hardening plan where Dockerized workloads are in scope

**Exit criterion:** Team can answer: *How is the system structured, how does data flow, and are the critical security controls designed?*

---

## Gate 3 — Design handoff

**Trigger:** Before engineering implements any screen  
**Owner agents:** UI Designer, UX Researcher, Accessibility Auditor  
**Required artifacts:**
- Component specs for all primary flows
- Usability validation findings
- Accessibility acceptance criteria

**Exit criterion:** Engineering can implement any primary flow without design clarification.

---

## Gate 4 — Pre-release QA

**Trigger:** Before any production deployment  
**Owner agents:** Evidence Collector, Reality Checker, Accessibility Auditor, InfoSec Risk Officer, Incident Response Commander  
**Required artifacts:**
- Defect log with evidence packets
- Go/no-go memo
- Accessibility audit results
- Security sign-off
- Incident response readiness check for critical releases

**Exit criterion:** All Sev-1 defects resolved or formally accepted. Go decision is evidence-backed.

---

## Gate 5 — Post-release monitoring

**Trigger:** 48 hours after production deployment  
**Owner agents:** Model Risk Governance Lead (if AI features deployed), InfoSec Risk Officer, Incident Response Commander  
**Required artifacts:**
- Risk register update
- Model behavior monitoring report (if applicable)
- Incident or anomaly log
- Post-incident corrective-action log when relevant

**Exit criterion:** No unaddressed critical incidents. Risk register reflects production state.
