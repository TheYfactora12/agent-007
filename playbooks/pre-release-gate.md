# Playbook: Pre-Release Gate

**Purpose:** Run the final quality gate before any production deployment.

---

## Step 1 — Evidence Collector

**Input:** Test plan, feature list, QA environment  
**Output:** Defect log with evidence packets, test coverage summary  
**Prompt:** *"Run through the attached test plan for this release. Document every Sev-1 and Sev-2 defect with a complete evidence packet. Produce a test coverage summary showing what was tested, what was skipped, and why."*

---

## Step 2 — Accessibility Auditor

**Input:** Deployed staging build  
**Output:** Accessibility defect log, release gate memo  
**Prompt:** *"Audit the attached flows for WCAG 2.1 AA compliance. Check keyboard navigation, screen reader behavior, contrast ratios, form labels, and focus management. Produce a defect log and a release gate memo with your go/no-go recommendation."*

---

## Step 3 — Security Engineer

**Input:** Release branch diff, current threat model  
**Output:** Security sign-off or findings requiring remediation  
**Prompt:** *"Review the release branch changes against the current threat model. Flag any new attack surface, changed auth flows, or unresolved security findings. Produce a security sign-off or a list of pre-release remediation requirements."*

---

## Step 4 — Reality Checker

**Input:** Defect log + Accessibility memo + Security sign-off + Requirements  
**Output:** Go/no-go release memo  
**Prompt:** *"Review all QA evidence, accessibility findings, and security sign-off against the release requirements. Produce a go/no-go memo. State the decision first, then the evidence. List every accepted risk explicitly with a named risk owner."*

---

## Gate output

Reality Checker's go/no-go memo is the Gate 4 release artifact. No deployment proceeds without it.
