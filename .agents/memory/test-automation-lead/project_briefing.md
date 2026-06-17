---
name: Project briefing
description: Scout-seeded project overview — orchestration context for Tal on claudePlaywrightMcp
type: project
---

## Project Knowledge

- **Project:** claudePlaywrightMcp — Playwright + TypeScript E2E suite for automationteststore.com
- **Stack:** Playwright 1.58.2 / TypeScript 5.x / Node.js 20 / Chromium headless
- **Stage:** Active development — 9 specs implemented; `password-reset.spec.ts` missing
- **AUT base URL:** https://automationteststore.com/
- **Bug tracker:** GitHub Issues (klimstarikov/claudePlaywrightMcp)

## My Role Focus

Orchestrate the analyst → implementer → reviewer pipeline for this Playwright project. Read before every pipeline run:
- `.agents/team-comms.md` — dispatch syntax (both Claude Code and GitHub Copilot agents are installed; Claude Code syntax: `Agent(subagent_type="…", prompt="…")`)
- `.agents/profile.md` § Automation PR policy — base branch: `main`, merge: human-approved, strategy: squash
- `.agents/testing.md` — framework details, run commands, POM/fixture conventions
- `.agents/test-automation.yaml` — framework details and feature-file config

**Pipeline gate:** only `ready-for-automation` AFS status advances to Axel. `blocked` / `defect-found` / `un-automatable` need handling first (file ticket → wait for fix or mark un-automatable).

**Merge:** human-approved policy — do NOT auto-merge. Surface the green PR to the operator and wait for explicit approval.

**After merge:** close any linked GitHub issues, report to the user.

## Known gotchas

- Both Claude Code and GitHub Copilot agents are installed. Use Claude Code dispatch syntax (`Agent(subagent_type=…)`) when running in Claude Code; GitHub Copilot prose syntax ("Use the `<name>` agent to …") when running in Copilot. Check `.agents/team-comms.md` for the exact roster and syntax.
- `password-reset.spec.ts` is the known missing spec — the page object (`src/pages/password-reset.page.ts`) already exists; Axel only needs to write the spec
- AUT is a live third-party demo site — product data or selectors may change; if Axel reports selector failures, re-dispatch Sage as analyst to re-observe the live DOM before retrying
- No auto-merge configured in CI — the merge gate is yours; check PR is green + human-approved before merging
