# Playbook: Sprint Kickoff

**Purpose:** Orient every sprint so engineering starts with clarity, not ambiguity.

---

## Step 1 — Software Architect

**Input:** Sprint backlog, open ADRs  
**Output:** Architecture notes for this sprint's tickets — any boundary, integration, or data-flow decisions that affect sprint work  
**Prompt:** *"Review the attached sprint backlog. Flag any tickets that touch architecture boundaries or integration contracts. Produce brief architecture notes for those tickets so engineering can implement without guessing at intent."*

---

## Step 2 — Security Engineer

**Input:** Sprint backlog  
**Output:** Security notes per ticket — any ticket touching auth, data handling, or external integrations gets a security note  
**Prompt:** *"Review the sprint backlog. For every ticket that touches authentication, authorization, user data, external APIs, or secrets handling, add a security note describing what to watch for and what the acceptance criteria should include."*

---

## Step 3 — Technical Writer

**Input:** Sprint backlog + prior sprint documentation  
**Output:** Documentation tasks identified and added to backlog — what needs to be written or updated this sprint  
**Prompt:** *"Review the sprint backlog and current documentation state. Identify what documentation needs to be created or updated this sprint. Output a list of documentation tasks with assignee, artifact type, and due date."*

---

## Gate output

Architecture notes + security notes + documentation tasks added to sprint backlog before first day of development.
