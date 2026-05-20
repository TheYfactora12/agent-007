#!/usr/bin/env node

import { execFileSync } from 'node:child_process';

function usage() {
  console.error('Usage: node scripts/agent-007-pr-triage.mjs --repo owner/repo --pr 123');
  process.exit(1);
}

function parseArgs(argv) {
  const args = { repo: '', pr: '' };
  for (let i = 0; i < argv.length; i += 1) {
    const value = argv[i];
    if (value === '--repo') {
      args.repo = argv[i + 1] || '';
      i += 1;
    } else if (value === '--pr') {
      args.pr = argv[i + 1] || '';
      i += 1;
    } else if (value === '--help' || value === '-h') {
      usage();
    }
  }
  if (!args.repo || !args.pr) usage();
  return args;
}

function ghJson(args) {
  const raw = execFileSync('gh', args, {
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe']
  });
  return JSON.parse(raw);
}

function normalizeText(value) {
  return (value || '').replace(/\r/g, '').trim();
}

function section(text, heading) {
  const marker = `## ${heading}`;
  const start = text.indexOf(marker);
  if (start === -1) return '';
  const after = text.slice(start + marker.length);
  const next = after.match(/\n##\s|\n#\s/);
  const body = next ? after.slice(0, next.index) : after;
  return normalizeText(body);
}

function bulletLines(text) {
  const body = normalizeText(text);
  if (!body) return ['- not provided'];
  const lines = body
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
  return lines.map((line) => (line.startsWith('- ') ? line : `- ${line}`));
}

function oneLine(text, fallback = 'not provided') {
  const body = normalizeText(text);
  if (!body) return fallback;
  return body.replace(/\n+/g, ' ');
}

function summarizeChecks(checks) {
  if (!Array.isArray(checks) || checks.length === 0) {
    return ['- no status checks reported'];
  }

  return checks.map((check) => {
    const name = check.name || check.workflowName || 'unnamed check';
    const status = check.status || 'unknown status';
    const conclusion = check.conclusion || 'no conclusion';
    return `- ${name}: ${status} / ${conclusion}`;
  });
}

function summarizeFiles(files) {
  if (!Array.isArray(files) || files.length === 0) {
    return ['- no files reported'];
  }

  return files.map((file) => {
    const type = file.changeType || 'UNKNOWN';
    const additions = Number(file.additions || 0);
    const deletions = Number(file.deletions || 0);
    return `- ${file.path} (${type}, +${additions} / -${deletions})`;
  });
}

function riskFlags(pr) {
  const flags = [];
  const body = pr.body || '';
  const requiredSections = [
    'Summary',
    'Files changed',
    'Tests / verification',
    'Risks / limitations',
    'Governance status',
    'Approval required?'
  ];

  for (const name of requiredSections) {
    if (!section(body, name)) flags.push(`missing PR body section: ${name}`);
  }

  if (!pr.statusCheckRollup || pr.statusCheckRollup.length === 0) {
    flags.push('no status checks reported');
  }

  if (String(pr.mergeable || '').toUpperCase() === 'CONFLICTING') {
    flags.push('PR is conflicting');
  }

  if (pr.isDraft) {
    flags.push('PR is draft');
  }

  return flags.length ? flags : ['none obvious from read-only triage'];
}

const { repo, pr } = parseArgs(process.argv.slice(2));

const fields = [
  'number',
  'title',
  'url',
  'state',
  'isDraft',
  'mergeable',
  'mergeStateStatus',
  'reviewDecision',
  'author',
  'baseRefName',
  'headRefName',
  'headRefOid',
  'body',
  'files',
  'statusCheckRollup',
  'changedFiles',
  'additions',
  'deletions',
  'mergedAt',
  'mergeCommit',
  'closingIssuesReferences'
].join(',');

let prData;

try {
  prData = ghJson(['pr', 'view', pr, '--repo', repo, '--json', fields]);
} catch (error) {
  const detail = error.stderr ? error.stderr.toString().trim() : error.message;
  console.error(`Failed to read PR data with gh: ${detail}`);
  process.exit(1);
}

const body = prData.body || '';
const summary = oneLine(section(body, 'Summary'), 'not provided');
const why = oneLine(section(body, 'Why it matters'), 'not provided');
const governance = oneLine(section(body, 'Governance status'), 'not provided');
const approval = oneLine(section(body, 'Approval required?'), 'not provided');
const kevinDecision = bulletLines(section(body, 'What Kevin must decide'));
const chatgptReview = bulletLines(section(body, 'What ChatGPT should review'));
const nextAction = oneLine(section(body, 'Next recommended action'), 'not provided');
const hardLimits = bulletLines(section(body, 'Hard limits confirmed'));
const linkedIssues = (prData.closingIssuesReferences || []).map((item) => {
  const repoOwner = item.repository?.owner?.login || '';
  const repoName = item.repository?.name || '';
  const repoLabel = repoOwner && repoName ? `${repoOwner}/${repoName}` : 'issue repo';
  return `- #${item.number} ${item.title} (${repoLabel})`;
});

const packet = [
  '# Agent-007 PR Triage Packet',
  '',
  '## Bottom line',
  '',
  `This is a read-only triage packet for PR #${prData.number}. It summarizes GitHub PR data and evidence fields, but it does not make a governance decision.`,
  '',
  '## PR identity',
  '',
  `- Repo: ${repo}`,
  `- PR: #${prData.number}`,
  `- Title: ${prData.title}`,
  `- URL: ${prData.url}`,
  `- Author: ${prData.author?.login || 'unknown'}`,
  `- Base: ${prData.baseRefName}`,
  `- Head branch: ${prData.headRefName}`,
  `- Head SHA: ${prData.headRefOid}`,
  '',
  '## GitHub state snapshot',
  '',
  `- State: ${prData.state}`,
  `- Draft: ${prData.isDraft ? 'yes' : 'no'}`,
  `- Mergeable: ${prData.mergeable || 'unknown'}`,
  `- Merge state status: ${prData.mergeStateStatus || 'unknown'}`,
  `- Review decision: ${prData.reviewDecision || 'none reported'}`,
  `- Merged at: ${prData.mergedAt || 'not merged'}`,
  `- Merge commit: ${prData.mergeCommit?.oid || 'not merged'}`,
  '',
  '## PR summary',
  '',
  `- Summary: ${summary}`,
  `- Why it matters: ${why}`,
  `- Governance status field: ${governance}`,
  `- Approval required field: ${approval}`,
  '',
  '## Changed files',
  '',
  `- File count: ${prData.changedFiles}`,
  `- Diff size: +${prData.additions} / -${prData.deletions}`,
  ...summarizeFiles(prData.files),
  '',
  '## Status checks',
  '',
  ...summarizeChecks(prData.statusCheckRollup),
  '',
  '## Linked issues',
  '',
  ...(linkedIssues.length ? linkedIssues : ['- none reported']),
  '',
  '## What ChatGPT should review',
  '',
  ...chatgptReview,
  '',
  '## What Kevin must decide',
  '',
  ...kevinDecision,
  '',
  '## Next recommended action field',
  '',
  `- ${nextAction}`,
  '',
  '## Hard limits confirmed field',
  '',
  ...hardLimits,
  '',
  '## Triage flags',
  '',
  ...riskFlags(prData).map((flag) => `- ${flag}`),
  '',
  '## Protected action reminder',
  '',
  '- This script does not approve merge, deploy, spend, schema changes, production changes, secrets, or public claims.',
  '- Kevin approval remains required for protected actions.',
  ''
];

process.stdout.write(`${packet.join('\n')}\n`);
