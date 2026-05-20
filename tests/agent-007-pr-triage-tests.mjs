#!/usr/bin/env node

import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

import { buildPacket, riskFlags } from '../scripts/agent-007-pr-triage.mjs';

const handoffPath = path.join(process.cwd(), 'handoffs/latest-codex-handoff.md');
const originalHandoff = fs.readFileSync(handoffPath, 'utf8');

function makePr(overrides = {}) {
  return {
    number: 99,
    title: 'Test PR',
    url: 'https://example.com/pr/99',
    author: { login: 'tester' },
    baseRefName: 'main',
    headRefName: 'test-branch',
    headRefOid: 'abc123',
    state: 'OPEN',
    isDraft: false,
    mergeable: 'MERGEABLE',
    mergeStateStatus: 'CLEAN',
    reviewDecision: '',
    mergedAt: null,
    mergeCommit: null,
    body: `## Summary

Safe summary

## Files changed

- some/file.md

## Tests / verification

- node test.js

## Risks / limitations

- some risk

## Governance status

Proceed

## Approval required?

Kevin approval

## What ChatGPT should review

- check scope

## What Kevin must decide

- merge gate

## Next recommended action

Review and wait.

## Hard limits confirmed

- no merge unless approved
- no deploy
- no spend
- no secrets
- no Supabase/schema change
- no production change
`,
    files: [],
    statusCheckRollup: [{ name: 'check', status: 'COMPLETED', conclusion: 'SUCCESS' }],
    changedFiles: 0,
    additions: 0,
    deletions: 0,
    closingIssuesReferences: [],
    ...overrides
  };
}

function testRiskFlags() {
  const flags = riskFlags(makePr({
    files: [
      { path: 'supabase/config.toml' },
      { path: 'db/migrations/001_init.sql' },
      { path: '.env.example' },
      { path: '.github/workflows/ci.yml' },
      { path: 'docs/production-notes.md' },
      { path: 'governance/rules.md' },
      { path: 'integrations/chatgpt/prompt.md' },
      { path: 'poke-sim/data.js' }
    ]
  }));

  assert(flags.includes('touches Supabase/schema-sensitive paths'));
  assert(flags.includes('touches potential secrets or credential-related paths'));
  assert(flags.includes('touches deploy/workflow/production-sensitive paths'));
  assert(flags.includes('touches protected governance/control-plane paths'));
  assert(flags.includes('potential bundle freshness risk: source files changed without pokemon-champion-2026.html and sw.js'));
  assert(flags.includes('merge to main remains a protected action and needs Kevin approval'));
}

function testBundleFlagClearsWhenBundleFilesPresent() {
  const flags = riskFlags(makePr({
    files: [
      { path: 'poke-sim/data.js' },
      { path: 'poke-sim/pokemon-champion-2026.html' },
      { path: 'poke-sim/sw.js' }
    ]
  }));

  assert(!flags.includes('potential bundle freshness risk: source files changed without pokemon-champion-2026.html and sw.js'));
}

function testNoProtectedMergeFlagWhenMerged() {
  const flags = riskFlags(makePr({
    state: 'MERGED',
    mergedAt: '2026-05-20T00:00:00Z',
    mergeCommit: { oid: 'deadbeef' }
  }));

  assert(!flags.includes('merge to main remains a protected action and needs Kevin approval'));
}

function testPacketIncludesFlags() {
  const packet = buildPacket('TheYfactora12/agent-007', makePr({
    files: [{ path: 'START_HERE.md' }]
  }));

  assert(packet.includes('## Triage flags'));
  assert(packet.includes('touches protected governance/control-plane paths'));
  assert(packet.includes('merge to main remains a protected action and needs Kevin approval'));
}

function withHandoff(text, fn) {
  fs.writeFileSync(handoffPath, text, 'utf8');
  try {
    fn();
  } finally {
    fs.writeFileSync(handoffPath, originalHandoff, 'utf8');
  }
}

function testPendingCreateDriftFlag() {
  withHandoff(`# Latest Codex Handoff

## Related GitHub Artifacts

- Repo: \`TheYfactora12/agent-007\`
- PR: \`pending create\`
- Issue: \`none\`
- Branch/ref: \`test-branch\`
- Head SHA: \`deadbeef\`

## Files changed

- \`some/file.md\`

## Tests / verification

- \`node test.js\`

## Approval required?

No

## What Kevin must decide

merge gate

## Next recommended action

Open the PR.
`, () => {
    const flags = riskFlags(makePr({
      files: [{ path: 'some/file.md' }],
      body: makePr().body
    }));
    assert(flags.includes('latest handoff still says PR is pending create'));
    assert(flags.includes('latest handoff head SHA lags behind the live PR head'));
    assert(flags.includes('latest handoff approval field does not reflect Kevin approval for merge to main'));
  });
}

function testFileAndTestDriftFlags() {
  withHandoff(`# Latest Codex Handoff

## Related GitHub Artifacts

- Repo: \`TheYfactora12/agent-007\`
- PR: \`#99\`
- Issue: \`none\`
- Branch/ref: \`test-branch\`
- Head SHA: \`deadbeef\`

## Files changed

- \`docs/old-file.md\`

## Tests / verification

- \`node old-test.js\`

## Approval required?

Kevin approval

## What Kevin must decide

merge gate

## Next recommended action

Review.
`, () => {
    const flags = riskFlags(makePr({
      files: [{ path: 'docs/new-file.md' }],
      body: makePr({
        body: `## Summary

Safe summary

## Files changed

- docs/new-file.md

## Tests / verification

- node new-test.js

## Risks / limitations

- some risk

## Governance status

Proceed

## Approval required?

Kevin approval

## What ChatGPT should review

- check scope

## What Kevin must decide

- merge gate

## Next recommended action

Review and wait.

## Hard limits confirmed

- no merge unless approved
- no deploy
- no spend
- no secrets
- no Supabase/schema change
- no production change
`
      }).body
    }));
    assert(flags.includes('files changed drift between live PR data and latest handoff'));
    assert(flags.includes('tests / verification drift between live PR data and latest handoff'));
  });
}

function testMergedCloseoutFlags() {
  withHandoff(`# Latest Codex Handoff

## Related GitHub Artifacts

- Repo: \`TheYfactora12/agent-007\`
- PR: \`#99\`
- Issue: \`none\`
- Branch/ref: \`test-branch\`
- Head SHA: \`deadbeef\`

## Files changed

- \`some/file.md\`

## Tests / verification

- \`node test.js\`

## Approval required?

Kevin approval

## What Kevin must decide

Whether to merge.

## Next recommended action

Open the PR, confirm the check runs, and leave it unmerged.
`, () => {
    const flags = riskFlags(makePr({
      state: 'MERGED',
      mergedAt: '2026-05-20T00:00:00Z',
      mergeCommit: { oid: 'deadbeef' }
    }));
    assert(flags.includes('latest handoff does not record that the PR is merged'));
    assert(flags.includes('latest handoff next action is stale for a merged PR'));
    assert(flags.includes('latest handoff still shows a Kevin decision pending after PR merge'));
  });
}

function testReviewedHeadCanLagWhenOnlyHandoffRefreshChanged() {
  const reviewedCommit = execFileSync('git', ['rev-parse', 'HEAD~1'], {
    encoding: 'utf8'
  }).trim();
  const liveCommit = execFileSync('git', ['rev-parse', 'HEAD'], {
    encoding: 'utf8'
  }).trim();

  withHandoff(`# Latest Codex Handoff

## Related GitHub Artifacts

- Repo: \`TheYfactora12/agent-007\`
- PR: \`#99\`
- Issue: \`none\`
- Branch/ref: \`test-branch\`
- Reviewed PR head: \`${reviewedCommit}\`
- Handoff update commit: \`${liveCommit}\`

## Files changed

- \`some/file.md\`

## Tests / verification

- \`node test.js\`

## Approval required?

Kevin approval

## What Kevin must decide

No decision pending.

## Next recommended action

Review.
`, () => {
    const flags = riskFlags(makePr({
      headRefOid: liveCommit
    }));

    assert(!flags.includes('latest handoff head SHA lags behind the live PR head'));
  });
}

try {
  testRiskFlags();
  testBundleFlagClearsWhenBundleFilesPresent();
  testNoProtectedMergeFlagWhenMerged();
  testPacketIncludesFlags();
  testPendingCreateDriftFlag();
  testFileAndTestDriftFlags();
  testMergedCloseoutFlags();
  testReviewedHeadCanLagWhenOnlyHandoffRefreshChanged();
} finally {
  fs.writeFileSync(handoffPath, originalHandoff, 'utf8');
}

console.log('agent-007 PR triage tests passed');
