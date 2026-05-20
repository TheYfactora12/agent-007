#!/usr/bin/env node

import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

function usage() {
  console.error('Usage: node scripts/agent-007-pr-triage.mjs --repo owner/repo --pr 123');
  process.exit(1);
}

export function parseArgs(argv) {
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

export function normalizeText(value) {
  return (value || '').replace(/\r/g, '').trim();
}

function normalizeInline(value) {
  return normalizeText(value)
    .toLowerCase()
    .replace(/[`*_]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export function section(text, heading) {
  const marker = `## ${heading}`;
  const start = text.indexOf(marker);
  if (start === -1) return '';
  const after = text.slice(start + marker.length);
  const next = after.match(/\n##\s|\n#\s/);
  const body = next ? after.slice(0, next.index) : after;
  return normalizeText(body);
}

export function bulletLines(text) {
  const body = normalizeText(text);
  if (!body) return ['- not provided'];
  const lines = body
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
  return lines.map((line) => (line.startsWith('- ') ? line : `- ${line}`));
}

export function oneLine(text, fallback = 'not provided') {
  const body = normalizeText(text);
  if (!body) return fallback;
  return body.replace(/\n+/g, ' ');
}

export function summarizeChecks(checks) {
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

export function summarizeFiles(files) {
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

function readLocalHandoff() {
  const handoffPath = path.join(process.cwd(), 'handoffs/latest-codex-handoff.md');
  if (!fs.existsSync(handoffPath)) return '';
  return fs.readFileSync(handoffPath, 'utf8');
}

function listSectionItems(text, heading) {
  const body = section(text, heading);
  if (!body) return [];
  return body
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.startsWith('- '))
    .map((line) => line.slice(2).trim());
}

function parseArtifactValue(text, label) {
  const body = section(text, 'Related GitHub Artifacts');
  if (!body) return '';
  const match = body.match(new RegExp(`-\\s+${label}:\\s+(.+)`));
  return match ? normalizeText(match[1]) : '';
}

function parsePrNumber(text) {
  const prValue = parseArtifactValue(text, 'PR');
  const match = prValue.match(/#(\d+)/);
  return match ? Number(match[1]) : null;
}

function parseHeadSha(text) {
  const raw = parseArtifactValue(text, 'Head SHA');
  const match = raw.match(/\b[0-9a-f]{7,40}\b/i);
  return match ? match[0] : '';
}

function parseBranchRef(text) {
  return parseArtifactValue(text, 'Branch/ref');
}

function hasPendingPrLanguage(text) {
  const prValue = normalizeInline(parseArtifactValue(text, 'PR'));
  return prValue.includes('pending create') || prValue.includes('none yet');
}

function hasMergedPrLanguage(text) {
  const prValue = normalizeInline(parseArtifactValue(text, 'PR'));
  return prValue.includes('merged');
}

function normalizeListItem(value) {
  return normalizeInline(value.replace(/^\[[ x]\]\s+/i, '').replace(/^-\s+/, ''));
}

function setDifference(left, right) {
  const rightSet = new Set(right);
  return left.filter((item) => !rightSet.has(item));
}

function compareListSection(flags, label, expectedItems, actualItems) {
  const normalizedExpected = expectedItems.map(normalizeListItem);
  const normalizedActual = actualItems.map(normalizeListItem);
  const missingFromActual = setDifference(normalizedExpected, normalizedActual);
  const extraInActual = setDifference(normalizedActual, normalizedExpected);

  if (missingFromActual.length || extraInActual.length) {
    flags.push(`${label} drift between live PR data and latest handoff`);
  }
}

function staleCloseoutFlags(pr, handoff, flags) {
  if (!handoff) return;

  const nextAction = normalizeInline(section(handoff, 'Next recommended action'));
  const kevinDecision = normalizeInline(section(handoff, 'What Kevin must decide'));

  if (pr.mergedAt) {
    if (!hasMergedPrLanguage(handoff)) {
      flags.push('latest handoff does not record that the PR is merged');
    }

    if (nextAction.includes('open the pr') ||
        nextAction.includes('leave it unmerged') ||
        nextAction.includes('review the') ||
        nextAction.includes('confirm the check runs')) {
      flags.push('latest handoff next action is stale for a merged PR');
    }

    if (kevinDecision && !kevinDecision.includes('no decision pending')) {
      flags.push('latest handoff still shows a Kevin decision pending after PR merge');
    }
  } else if (pr.state === 'OPEN' && hasMergedPrLanguage(handoff)) {
    flags.push('latest handoff says the PR is merged while GitHub still shows it open');
  }
}

function handoffDriftFlags(pr, handoff) {
  const flags = [];
  if (!handoff) {
    flags.push('latest handoff file not found for local drift comparison');
    return flags;
  }

  const handoffPrNumber = parsePrNumber(handoff);
  const handoffBranch = parseBranchRef(handoff);
  const handoffSha = parseHeadSha(handoff);
  const handoffFiles = listSectionItems(handoff, 'Files changed');
  const handoffTests = listSectionItems(handoff, 'Tests / verification');
  const prFiles = (pr.files || []).map((file) => file.path || '').filter(Boolean);
  const prTests = listSectionItems(pr.body || '', 'Tests / verification');

  if (hasPendingPrLanguage(handoff)) {
    flags.push('latest handoff still says PR is pending create');
  }

  if (handoffPrNumber !== null && handoffPrNumber !== pr.number) {
    flags.push('latest handoff PR number does not match the live PR');
  }

  if (handoffBranch && normalizeInline(handoffBranch) !== normalizeInline(pr.headRefName)) {
    flags.push('latest handoff branch/ref does not match the live PR head branch');
  }

  if (handoffSha && handoffSha.toLowerCase() !== String(pr.headRefOid || '').toLowerCase()) {
    flags.push('latest handoff head SHA lags behind the live PR head');
  }

  if (prFiles.length) {
    compareListSection(flags, 'files changed', prFiles, handoffFiles);
  }

  if (prTests.length || handoffTests.length) {
    compareListSection(flags, 'tests / verification', prTests, handoffTests);
  }

  staleCloseoutFlags(pr, handoff, flags);

  const approval = normalizeInline(section(handoff, 'Approval required?'));
  if (pr.baseRefName === 'main' && pr.state === 'OPEN' && !approval.includes('kevin approval')) {
    flags.push('latest handoff approval field does not reflect Kevin approval for merge to main');
  }

  return flags;
}

function filePaths(pr) {
  return (pr.files || []).map((file) => file.path || '');
}

function containsPattern(paths, patterns) {
  return paths.some((rawPath) => {
    const full = rawPath.toLowerCase();
    const base = full.split('/').pop() || full;
    return patterns.some((pattern) => pattern.test(full) || pattern.test(base));
  });
}

function addPathRisk(flags, paths, label, patterns) {
  if (containsPattern(paths, patterns)) flags.push(label);
}

export function riskFlags(pr) {
  const flags = [];
  const body = pr.body || '';
  const paths = filePaths(pr);
  const handoff = readLocalHandoff();
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

  addPathRisk(flags, paths, 'touches Supabase/schema-sensitive paths', [
    /^supabase\//,
    /^migrations?\//,
    /(^|\/)schema([^/]*|\/)/,
    /(^|\/)database([^/]*|\/)/,
    /\.sql$/
  ]);

  addPathRisk(flags, paths, 'touches potential secrets or credential-related paths', [
    /^\.env(\.|$)/,
    /secret/,
    /token/,
    /api[-_ ]?key/,
    /apikey/,
    /credential/,
    /password/,
    /private[-_ ]?key/
  ]);

  addPathRisk(flags, paths, 'touches deploy/workflow/production-sensitive paths', [
    /^\.github\/workflows\//,
    /deploy/,
    /release/,
    /production/,
    /(^|\/)sw\.js$/,
    /(^|\/)pokemon-champion-2026\.html$/
  ]);

  addPathRisk(flags, paths, 'touches protected governance/control-plane paths', [
    /^governance\//,
    /^start_here\.md$/i,
    /^docs\/agent-007-automation-roadmap\.md$/i,
    /^integrations\/chatgpt\//,
    /^\.github\/workflows\//
  ]);

  const sourceTouched = containsPattern(paths, [
    /(^|\/)poke-sim\/data\.js$/,
    /(^|\/)poke-sim\/engine\.js$/,
    /(^|\/)poke-sim\/ui\.js$/,
    /(^|\/)poke-sim\/style\.css$/
  ]);
  const bundleTouched = containsPattern(paths, [
    /(^|\/)poke-sim\/pokemon-champion-2026\.html$/,
    /(^|\/)poke-sim\/sw\.js$/
  ]);

  if (sourceTouched && !bundleTouched) {
    flags.push('potential bundle freshness risk: source files changed without pokemon-champion-2026.html and sw.js');
  }

  if (pr.baseRefName === 'main' && pr.state === 'OPEN' && !pr.mergedAt) {
    flags.push('merge to main remains a protected action and needs Kevin approval');
  }

  flags.push(...handoffDriftFlags(pr, handoff));

  return flags.length ? flags : ['none obvious from read-only triage'];
}

export function buildPacket(repo, prData) {
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

  return [
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
  ].join('\n');
}

export function main(argv = process.argv.slice(2)) {
  const { repo, pr } = parseArgs(argv);
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

  process.stdout.write(`${buildPacket(repo, prData)}\n`);
}

const entryFile = process.argv[1] ? path.resolve(process.argv[1]) : '';
const thisFile = fileURLToPath(import.meta.url);
if (entryFile === thisFile) {
  main();
}
