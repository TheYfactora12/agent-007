#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const failures = [];

function fail(message) {
  failures.push(message);
}

function filePath(rel) {
  return path.join(root, rel);
}

function exists(rel) {
  return fs.existsSync(filePath(rel));
}

function read(rel) {
  return fs.readFileSync(filePath(rel), 'utf8');
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function normalizeInline(value) {
  return value
    .toLowerCase()
    .replace(/[`*_]/g, '')
    .replace(/[.:!?]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function section(text, heading) {
  const start = text.indexOf(heading);
  if (start === -1) return '';
  const afterHeading = text.slice(start + heading.length);
  const nextHeadingMatch = afterHeading.match(/\n##\s|\n#\s/);
  const body = nextHeadingMatch ? afterHeading.slice(0, nextHeadingMatch.index) : afterHeading;
  return body.trim();
}

const requiredFiles = [
  'handoffs/latest-codex-handoff.md',
  'handoffs/codex-handoff-template.md',
  'docs/agent-007-relay-workflow.md',
  'START_HERE.md'
];

for (const rel of requiredFiles) {
  if (!exists(rel)) fail(`Missing required file: ${rel}`);
}

if (failures.length === 0) {
  const latest = read('handoffs/latest-codex-handoff.md');

  const requiredHeadings = [
    '## Mission / PR / Issue',
    '## Related GitHub Artifacts',
    '## Bottom line',
    '## What changed',
    '## Files changed',
    '## Tests / verification',
    '## Risks / limitations',
    '## Governance status',
    '## Approval required?',
    '## What ChatGPT should review',
    '## What Kevin must decide',
    '## Next recommended action',
    '## Hard limits confirmed'
  ];

  for (const h of requiredHeadings) {
    if (!latest.includes(h)) fail(`Latest handoff missing heading: ${h}`);
  }

  const gov = section(latest, '## Governance status');
  const normalizedGov = normalizeInline(gov);
  const allowedGov = ['proceed', 'simplify', 'pause', 'reject', 'needs kevin approval'];
  if (!allowedGov.some((v) => normalizedGov.includes(v))) {
    fail(`Governance status must include one of: ${allowedGov.join(', ')}`);
  }

  const approval = section(latest, '## Approval required?');
  const normalizedApproval = normalizeInline(approval);
  const allowedApproval = ['no', 'kevin approval', 'committee / board review'];
  const approvalAliases = [
    'no immediate approval required',
    'committee board review'
  ];
  if (!allowedApproval.some((v) => normalizedApproval.includes(normalizeInline(v))) &&
      !approvalAliases.some((v) => normalizedApproval.includes(normalizeInline(v)))) {
    fail(`Approval required must include one of: ${allowedApproval.join(', ')}`);
  }

  const hardLimits = normalizeInline(section(latest, '## Hard limits confirmed'));
  const hardLimitChecks = [
    ['no merge', ['no merge', 'no merge pending', 'no merge unless approved']],
    ['no deploy', ['no deploy']],
    ['no spend', ['no spend']],
    ['no secrets', ['no secrets']],
    ['no supabase', ['no supabase', 'no supabase schema change', 'no supabase/schema change']],
    ['no production change', ['no production change', 'no production changes']]
  ];
  for (const [label, variants] of hardLimitChecks) {
    if (!variants.some((phrase) => hardLimits.includes(normalizeInline(phrase)))) {
      fail(`Hard limits missing phrase: ${label}`);
    }
  }

  const coreDocs = [
    'README.md',
    'START_HERE.md',
    'docs/agent-007-relay-workflow.md',
    'handoffs/latest-codex-handoff.md',
    'handoffs/codex-handoff-template.md'
  ].filter(exists);

  for (const rel of coreDocs) {
    const text = read(rel);
    if (text.includes('/Users/')) fail(`Local absolute path found in core doc: ${rel}`);
  }

  const mission006Files = ['README.md', 'START_HERE.md', 'handoffs/latest-codex-handoff.md', 'docs/agent-007-relay-workflow.md'].filter(exists);
  const mission006Allowed = /(not started|do not start|no mission 006)/i;
  for (const rel of mission006Files) {
    const text = read(rel);
    const lower = text.toLowerCase();
    let idx = lower.indexOf('mission 006');
    while (idx !== -1) {
      const windowText = text.slice(Math.max(0, idx - 120), idx + 160);
      if (!mission006Allowed.test(windowText)) fail(`Mission 006 mention lacks stop/negative context in: ${rel}`);
      idx = lower.indexOf('mission 006', idx + 1);
    }
  }

  const startHere = read('START_HERE.md');
  if (!startHere.includes('node scripts/check-agent-007-handoff.mjs')) {
    fail('START_HERE.md does not reference the check runner command');
  }
}

if (failures.length) {
  console.error('Agent-007 handoff checks failed:\n');
  for (const f of failures) console.error(`- ${f}`);
  process.exit(1);
}

console.log('Agent-007 handoff checks passed');
