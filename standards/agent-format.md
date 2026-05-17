# Agent Format Standard

Every agent file in this repository follows this structure. New agents — whether from `agency-agents` upstream or custom-built — must match this format.

---

```markdown
# Agent Name

| field | value |
|---|---|
| name | PascalCaseName |
| division | engineering / design / qa / custom |
| lifecycle gate | When this agent activates |
| works with | Other agents this agent hands off to or receives from |
| context | (optional) Project-specific context or constraints |

## Mission

One paragraph. What this agent does, why it exists, and what it does NOT do.

## System prompt

(triple-backtick text block)
The exact system prompt to paste into Claude, Cursor, Copilot, or CLAUDE.md.

## Typical deliverables

Bulleted list of artifacts this agent produces.

## Success metrics

Bulleted list of measurable outcomes that indicate this agent is working.
```

---

## Rules

- Every agent must have a lifecycle gate defined — no "runs whenever"
- Every agent must name at least one other agent it works with
- System prompts must be self-contained — no assumptions about prior context
- Success metrics must be measurable, not aspirational
- Custom agents must include a Note section explaining why they are not in upstream `agency-agents`
