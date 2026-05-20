#!/usr/bin/env node

import fs from 'node:fs';

import { buildPacket, fetchPrData } from './agent-007-pr-triage.mjs';

const REVIEW_TRIGGER = '/agent007 review';

function usage() {
  console.error('Usage: node scripts/agent-007-review-command.mjs --event path/to/event.json');
  process.exit(1);
}

export function parseArgs(argv) {
  const args = { eventPath: '' };
  for (let i = 0; i < argv.length; i += 1) {
    const value = argv[i];
    if (value === '--event') {
      args.eventPath = argv[i + 1] || '';
      i += 1;
    } else if (value === '--help' || value === '-h') {
      usage();
    }
  }
  if (!args.eventPath) usage();
  return args;
}

export function isExactReviewTrigger(text) {
  return String(text || '').trim() === REVIEW_TRIGGER;
}

export function parseReviewEvent(event) {
  const repo = event?.repository?.full_name || '';
  const issueNumber = event?.issue?.number;
  const commentBody = event?.comment?.body || '';
  const commenter = event?.comment?.user?.login || 'unknown';
  const isPullRequest = Boolean(event?.issue?.pull_request);

  return {
    repo,
    prNumber: issueNumber,
    commenter,
    commentBody,
    isPullRequest,
    valid: Boolean(repo && issueNumber && isPullRequest && isExactReviewTrigger(commentBody))
  };
}

export function buildReviewComment(meta, packet) {
  return [
    `Agent-007 review packet triggered by @${meta.commenter} with \`${REVIEW_TRIGGER}\`.`,
    '',
    'This is a review packet only.',
    'It is not approval.',
    '',
    packet
  ].join('\n');
}

export function main(argv = process.argv.slice(2)) {
  const { eventPath } = parseArgs(argv);
  const raw = fs.readFileSync(eventPath, 'utf8');
  const event = JSON.parse(raw);
  const meta = parseReviewEvent(event);

  if (!meta.valid) {
    console.error('Event does not match a supported /agent007 review pull request trigger.');
    process.exit(1);
  }

  let prData;
  try {
    prData = fetchPrData(meta.repo, meta.prNumber);
  } catch (error) {
    const detail = error.stderr ? error.stderr.toString().trim() : error.message;
    console.error(`Failed to read PR data with gh: ${detail}`);
    process.exit(1);
  }

  const packet = buildPacket(meta.repo, prData);
  process.stdout.write(`${buildReviewComment(meta, packet)}\n`);
}

if (process.argv[1] && fs.existsSync(process.argv[1]) && process.argv[1].endsWith('agent-007-review-command.mjs')) {
  main();
}
