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

function section(text, heading) {
  const escaped = heading.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const re = new RegExp(`^${escaped}\\s*$([\\s\\S]*?)(?=^##\\s|^#\\s|\\z)`, 'm');
  const match = text.match(re);
  return match ? match[1].trim() : '';
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
  const allowedGov = ['Proceed', 'Simplify', 'Pause', 'Reject', 'Needs Kevin approval'];
  if (!allowedGov.some((v) => gov.includes(v))) {
    fail(`Governance status must include one of: ${allowedGov.join(', ')}`);
  }

  const approval = section(latest, '## Approval required?');
  const allowedApproval = ['No', 'Kevin approval', 'Committee / board review'];
  if (!allowedApproval.some((v) => approval.includes(v))) {
    fail(`Approval required must include one of: ${allowedApproval.join(', ')}`);
  }

  const hardLimits = section(latest, '## Hard limits confirmed').toLowerCase();
  for (const phrase of ['no merge', 'no deploy', 'no spend', 'no secrets', 'no supabase', 'no production change']) {
    if (!hardLimits.includes(phrase)) fail(`Hard limits missing phrase: ${phrase}`);
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
    const idx = text.toLowerCase().indexOf('mission 006');
    if (idx !== -1) {
      const windowText = text.slice(Math.max(0, idx - 120), idx + 160);
      if (!mission006Allowed.test(windowText)) fail(`Mission 006 mention lacks stop/negative context in: ${rel}`);
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
