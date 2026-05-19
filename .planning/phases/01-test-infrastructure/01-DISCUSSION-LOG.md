# Phase 1: Test Infrastructure - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-05-19
**Phase:** 01-test-infrastructure
**Areas discussed:** Test runner selection, Vitest config style, Globals vs explicit imports, Setup file integration, npm scripts, Stale CRA boilerplate disposition, Test file naming

**Discussion mode note:** User invoked `/gsd:discuss-phase 1` with a standing "no clarifying questions — make the reasonable call" directive. No interactive `AskUserQuestion` calls were issued. The reasonable defaults below were captured directly into CONTEXT.md; alternatives are preserved here for audit.

---

## Test runner selection

| Option | Description | Selected |
|--------|-------------|----------|
| Vitest | Native Vite integration, fast, same Testing Library API | ✓ |
| Jest | Industry-standard but needs babel-jest + jest config + workarounds with Vite/ESM | |
| Node's built-in test runner | Lightweight but lacks DOM + Testing Library ergonomics | |

**Selected:** Vitest
**Rationale:** Locked in PROJECT.md Key Decisions during `/gsd:new-project`. Near-zero config, matches Vite build pipeline, ESM-native.

---

## Vitest config style

| Option | Description | Selected |
|--------|-------------|----------|
| Add `test` block to existing `vite.config.mjs` | One config file, simpler | ✓ |
| Separate `vitest.config.mjs` | Cleaner separation, but two configs to keep in sync | |
| Separate `vitest.config.ts` | Adds TypeScript — out of stack | |

**Selected:** Add to existing `vite.config.mjs`
**Rationale:** No Vite-vs-Vitest divergence in this project; single config is simpler to maintain.

---

## Globals vs explicit imports

| Option | Description | Selected |
|--------|-------------|----------|
| `globals: true` | Jest-style `describe`/`it`/`expect` callable without imports | ✓ |
| `globals: false` + explicit `import { test, expect } from 'vitest'` | More explicit, but requires editing every test file | |

**Selected:** `globals: true`
**Rationale:** Existing `App.test.js` uses bare `test(...)` / `expect(...)` style. `setupTests.js` mirrors CRA conventions. Keep the convention.

---

## Setup file integration

| Option | Description | Selected |
|--------|-------------|----------|
| Reuse existing `src/setupTests.js` as-is via `test.setupFiles` | Zero churn; `@testing-library/jest-dom` matchers register | ✓ |
| Move setup into a top-level `vitest.setup.js` | Slight convention change, no upside | |
| Inline matchers in each test file | Repetitive | |

**Selected:** Reuse `src/setupTests.js` via `test.setupFiles: ['./src/setupTests.js']`
**Rationale:** File already exists, already imports `@testing-library/jest-dom`. Vitest's `expect` extension API is compatible.

---

## npm scripts

| Option | Description | Selected |
|--------|-------------|----------|
| `test: vitest run` + `test:watch: vitest` | Single-pass on CI, watch on dev | ✓ |
| `test: vitest` + `test:ci: vitest run` | Local dev is `npm test` (watch); CI uses `test:ci` | |
| Only `test: vitest run`, no watch script | Simpler but no convenient watch-mode alias | |

**Selected:** `test` = `vitest run` (single-pass), `test:watch` = `vitest` (watch)
**Rationale:** Industry norm — `npm test` is what CI and contributors run; watch mode is opt-in.

---

## Stale CRA boilerplate disposition

| Option | Description | Selected |
|--------|-------------|----------|
| Delete `src/App.test.js` entirely | Cleanest, but leaves zero tests after Phase 1 | |
| Rewrite as a minimal smoke test (App renders) | Suite stays non-empty; Phase 2 expands | ✓ |
| Keep as-is and `.skip` the test | Worst of both worlds | |

**Selected:** Rewrite as a minimal smoke test, rename to `App.test.jsx`
**Rationale:** Phase 1 acceptance is "suite green" — leaving at least one passing test makes the suite meaningful from day one.

---

## Test file naming

| Option | Description | Selected |
|--------|-------------|----------|
| Colocated `Foo.jsx` → `Foo.test.jsx` | Matches existing `App.test.js` location and recent `.jsx` rename | ✓ |
| Top-level `tests/` directory | Common in some projects, but contradicts current layout | |
| `__tests__` folder per component | Jest convention, more nesting | |

**Selected:** Colocated, `.test.jsx` for JSX-rendering tests
**Rationale:** Matches existing layout. The recent `ea8fa48` commit standardized on `.jsx`.

---

## Claude's Discretion

- Exact assertion text in the rewritten `App.test.jsx` smoke test (any stable Layout chrome element/text is fine).
- Whether to also clean up `reportWebVitals.js` import wiring — left alone (unrelated to testing).

## Deferred Ideas

- Coverage reporting (`@vitest/coverage-v8`, threshold gates) → QUAL-01 / v2
- CI workflow (GitHub Action) → QUAL-02 / v2
- Pre-commit hook running tests → QUAL-03 / v2
- a11y assertions (`jest-axe`) → A11Y-01 / v2
- Bumping `@testing-library/user-event` to v14 → decide in Phase 3 when form interactions are written
- Removing `react-app/jest` from `eslintConfig.extends` and CRA leftovers (`reportWebVitals.js`) — orthogonal cleanup, not part of testing milestone
