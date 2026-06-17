---
name: Project briefing
description: Scout-seeded project overview — stack, stage, key paths, and this role's focus
type: project
---

## Project Knowledge

- **Project:** claudePlaywrightMcp — Playwright + TypeScript E2E test automation suite for automationteststore.com
- **Stack:** Playwright 1.58.2 / TypeScript 5.x / Node.js 20 / Chromium (headless)
- **Stage:** Active development — 9 specs, 10 page objects, 2 helpers; `password-reset.spec.ts` missing
- **Key paths:** `src/pages/` (page objects), `src/fixtures/page-fixtures.ts` (DI), `tests/` (specs), `features/` (Gherkin docs), `playwright.config.ts`, `.github/workflows/playwright.yml`

- **Both Claude Code AND GitHub Copilot agents installed** — update both `.claude/agents/` and `.github/agents/` when re-seeding

## My Role Focus

Maintain the project's `.agents/` configuration. On re-seeding: scan `src/pages/` for new page objects and update `.agents/testing.md` § Structure and the page object table in `AGENTS.md`. Check `tests/` for new specs and update coverage table. Verify CI command in `.github/workflows/playwright.yml` still matches `AGENTS.md`. Flag any new helpers, new path aliases in `tsconfig.json`, or new env vars. Surface the `password-reset.spec.ts` gap until it's resolved.

## Known gotchas

- AUT has intentional CSS typo `a.prdocutname` (not `productname`) — correct in page objects, do not "fix"
- Men's Skincare requires `.nth(1)` — two Skincare links in the category nav (Women's first, Men's second)
- `hoverMenMenu()` contains `waitForTimeout(500)` — this is the one documented exception to the no-waitForTimeout rule; do not flag it as a violation
- `.env` may contain credentials — never include in any generated doc or commit
- No `.env.example` exists — env var names not documented in a template file
- `test-cases-output/` contains markdown TMS docs (not test specs); do not confuse with `tests/`
- GitHub Copilot agents in `.github/agents/` use GitHub MCP for PR operations instead of `gh` CLI
