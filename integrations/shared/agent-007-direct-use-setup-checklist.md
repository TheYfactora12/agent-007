# Agent-007 Direct Use Setup Checklist

## 1. ChatGPT Project setup

- Create a ChatGPT Project named `Agent-007 Control Plane`.
- Paste the project instructions from
  `integrations/chatgpt/agent-007-project-instructions.md`.

## 2. Custom GPT setup

- Create a private Custom GPT named `Agent-007 Control Plane`.
- Paste the GPT instructions from
  `integrations/chatgpt/agent-007-custom-gpt-instructions.md`.

## 3. Knowledge files to upload

- Use `integrations/chatgpt/agent-007-knowledge-file-list.md`.
- Upload only the recommended governance and workflow files.
- Do not upload secrets, API keys, regulated data, or private logs.

## 4. Conversation starters

- Use `integrations/chatgpt/agent-007-conversation-starters.md`.

## 5. Perplexity scout prompt

- Use `integrations/perplexity/agent-007-research-scout-prompt.md`.
- Keep Perplexity in a research-only role.

## 6. What Codex can do

- create and update setup files
- prepare handoffs
- run the handoff checker
- keep GitHub artifacts current

## 7. What Kevin must do manually

- create the ChatGPT Project in the ChatGPT UI
- create the private Custom GPT in the ChatGPT UI
- upload knowledge files manually
- paste conversation starters manually
- decide whether any future Actions should ever be enabled

## 8. What must not be automated yet

- GitHub Actions for this setup
- Custom GPT Actions
- API key handling
- external integrations
- merge approval
- deploy approval
- spend approval

Codex can create the setup files.

Kevin must manually create/configure the ChatGPT Project or Custom GPT in the
ChatGPT UI.

Kevin must manually decide whether to enable any future Actions.

Perplexity setup is prompt-based for now.
