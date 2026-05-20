#!/usr/bin/env node

import assert from 'node:assert/strict';
import fs from 'node:fs';

const workflow = fs.readFileSync('.github/workflows/agent-007-review-command.yml', 'utf8');

function mustInclude(text) {
  assert(
    workflow.includes(text),
    `Expected workflow to include: ${text}`
  );
}

function mustNotInclude(pattern, label) {
  assert(
    !pattern.test(workflow),
    `Workflow should not include ${label}`
  );
}

mustInclude('on:');
mustInclude('issue_comment:');
mustInclude("types: [created]");
mustInclude("github.event.comment.body == '/agent007 review'");
mustInclude('github.event.issue.pull_request');
mustInclude('contents: read');
mustInclude('pull-requests: write');
mustInclude('issues: write');
mustInclude('ref: ${{ github.event.repository.default_branch }}');
mustInclude('uses: actions/github-script@v7');
mustInclude("const body = fs.readFileSync('review-packet.md', 'utf8');");
mustInclude('github.rest.issues.createComment');

mustNotInclude(/pull_request_target:/, 'pull_request_target');
mustNotInclude(/contents:\s*write/i, 'contents: write');
mustNotInclude(/id-token:\s*write/i, 'id-token: write');
mustNotInclude(/gh pr merge/i, 'gh pr merge');
mustNotInclude(/gh pr comment/i, 'gh pr comment');
mustNotInclude(/auto-merge/i, 'auto-merge');
mustNotInclude(/gh issue close/i, 'gh issue close');
mustNotInclude(/gh label/i, 'gh label');
mustNotInclude(/deploy/i, 'deploy');
mustNotInclude(/supabase/i, 'supabase');
mustNotInclude(/openai|api\.openai/i, 'openai/api.openai');

console.log('agent-007 review workflow safety tests passed');
