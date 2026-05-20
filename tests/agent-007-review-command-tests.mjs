#!/usr/bin/env node

import assert from 'node:assert/strict';

import {
  buildReviewComment,
  isExactReviewTrigger,
  parseArgs,
  parseReviewEvent
} from '../scripts/agent-007-review-command.mjs';

function testParseArgs() {
  const args = parseArgs(['--event', 'tmp/event.json']);
  assert.equal(args.eventPath, 'tmp/event.json');
}

function testExactTrigger() {
  assert.equal(isExactReviewTrigger('/agent007 review'), true);
  assert.equal(isExactReviewTrigger(' /agent007 review '), true);
  assert.equal(isExactReviewTrigger('/agent007 review now'), false);
  assert.equal(isExactReviewTrigger('/agent007review'), false);
}

function testParseReviewEventValid() {
  const meta = parseReviewEvent({
    repository: { full_name: 'TheYfactora12/agent-007' },
    issue: { number: 16, pull_request: { url: 'https://example.com/pr/16' } },
    comment: { body: '/agent007 review', user: { login: 'kevin' } }
  });

  assert.equal(meta.valid, true);
  assert.equal(meta.repo, 'TheYfactora12/agent-007');
  assert.equal(meta.prNumber, 16);
  assert.equal(meta.commenter, 'kevin');
}

function testParseReviewEventInvalid() {
  const meta = parseReviewEvent({
    repository: { full_name: 'TheYfactora12/agent-007' },
    issue: { number: 16 },
    comment: { body: '/agent007 review please', user: { login: 'kevin' } }
  });

  assert.equal(meta.valid, false);
}

function testBuildReviewComment() {
  const comment = buildReviewComment(
    { commenter: 'kevin' },
    '# Agent-007 PR Triage Packet\n\nPacket body'
  );

  assert(comment.includes('triggered by @kevin'));
  assert(comment.includes('This is a review packet only.'));
  assert(comment.includes('It is not approval.'));
  assert(comment.includes('# Agent-007 PR Triage Packet'));
}

testParseArgs();
testExactTrigger();
testParseReviewEventValid();
testParseReviewEventInvalid();
testBuildReviewComment();

console.log('agent-007 review command tests passed');
