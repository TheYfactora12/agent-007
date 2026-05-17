# Playbook: Architecture Review

**Purpose:** Run a complete architecture review before sprint 1 code begins.

---

## Step 1 — Software Architect

**Input:** Product requirements, scope document, team constraints  
**Output:** Draft architecture document, component boundary map, integration patterns, initial ADR log  
**Prompt:** *"Review the attached requirements and constraints. Produce a draft architecture document covering component boundaries, data flow, integration patterns, and your top 3 architecture decisions as ADRs. Flag every assumption as an explicit decision point."*

---

## Step 2 — Security Engineer

**Input:** Software Architect output  
**Output:** Threat model, secure design findings, security acceptance criteria  
**Prompt:** *"Review the architecture document. Produce a threat model covering the attack surface, trust boundaries, and top 5 threat scenarios with proposed mitigations. Flag any design decisions that introduce security risk."*

---

## Step 3 — InfoSec Risk Officer

**Input:** Architecture document + Security Engineer threat model  
**Output:** Risk assessment, control mapping, challenge questions, executive rationale  
**Prompt:** *"Review the architecture and threat model. Produce a risk assessment identifying residual risks, control gaps, and risk acceptance recommendations. Apply GLBA and NIST CSF framing where relevant. Produce 5 challenge questions the team has not yet asked themselves."*

---

## Step 4 — DevOps Automator

**Input:** Architecture document  
**Output:** Environment plan, CI/CD pipeline design, deployment runbook draft  
**Prompt:** *"Based on the architecture, design the CI/CD pipeline and environment structure. Define what differs between dev, staging, and production. Produce a deployment runbook draft with rollback procedure."*

---

## Gate output

All four agent outputs combined form the Gate 2 — Architecture Review artifact package. No sprint 1 code should merge until this package is complete.
