#!/usr/bin/env node

import assert from 'node:assert/strict';

import { buildPacket, riskFlags } from '../scripts/agent-007-pr-triage.mjs';

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

testRiskFlags();
testBundleFlagClearsWhenBundleFilesPresent();
testNoProtectedMergeFlagWhenMerged();
testPacketIncludesFlags();

console.log('agent-007 PR triage tests passed');
