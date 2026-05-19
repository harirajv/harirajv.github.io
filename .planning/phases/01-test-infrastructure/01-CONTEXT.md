# Phase 1: Test Infrastructure - Context

**Gathered:** 2026-05-19
**Status:** Ready for planning

<domain>
## Phase Boundary

Stand up a working **Vitest** runner on top of the existing Vite project, wire `setupTests.js` so `@testing-library/jest-dom` matchers register globally, and clear the stale Create-React-App test scaffolding so `npm test` exits clean.

**In scope:** Vitest install, `vite.config.mjs` `test` block, npm scripts (`test`, `test:watch`), `setupTests.js` reuse, stale `App.test.js` removal/replacement with a minimal passing smoke test.

**Out of scope for Phase 1:**
- Full per-page smoke tests, routing tests, Layout tests → Phase 2
- Contact form / EmailJS interaction tests → Phase 3
- Coverage reporting (`@vitest/coverage-v8`) → v2 / QUAL-01
- CI workflow → v2 / QUAL-02

</domain>

<decisions>
## Implementation Decisions

### Test runner
- **D-01:** Use **Vitest** (not Jest). Already locked in PROJECT.md Key Decisions — native Vite integration, near-zero config beyond `vite.config.mjs`.
- **D-02:** Install `vitest` and `jsdom` as devDependencies. `@testing-library/react`, `@testing-library/jest-dom`, and `@testing-library/user-event` are already installed and stay. Do not install `@vitest/coverage-v8` yet — coverage is out of scope (deferred to v2 / QUAL-01).
- **D-03:** Pin the new devDeps with `^` ranges (matches existing `package.json` style).

### Vitest config (in `vite.config.mjs`)
- **D-04:** Single config file — add a `test` block to `vite.config.mjs`. Do NOT create a separate `vitest.config.*`. Reason: there's no Vitest-vs-Vite plugin divergence here and a single config is simpler.
- **D-05:** `test.environment: 'jsdom'` — React component tests need a DOM.
- **D-06:** `test.globals: true` — keep Jest-style `describe`/`it`/`expect` callable without explicit imports. Matches the convention `setupTests.js` already assumes (it uses a side-effect import of `@testing-library/jest-dom`, mirroring CRA's Jest setup).
- **D-07:** `test.setupFiles: ['./src/setupTests.js']` — reuse the existing file as-is.
- **D-08:** `test.css: false` (default). Don't process CSS in tests — components render fine without it for assertions on text/landmarks.

### Existing setupTests.js
- **D-09:** Keep `src/setupTests.js` exactly as it is. `@testing-library/jest-dom` v5+ exports a side-effect module that auto-extends matchers — Vitest's `expect` is API-compatible with Jest's for the matchers we use. No change needed.

### npm scripts (in `package.json`)
- **D-10:** Add `"test": "vitest run"` (single-pass, CI-friendly, exits 0/non-zero). There is currently NO `test` script — adding one is greenfield.
- **D-11:** Add `"test:watch": "vitest"` (default Vitest behavior = watch mode for local dev).
- **D-12:** Do NOT modify `start`/`build`/`preview`/`predeploy`/`deploy` scripts.

### Stale CRA boilerplate test
- **D-13:** **Rewrite** `src/App.test.js` rather than deleting it. Replace with a minimal smoke test:
  - Renders `App` wrapped in `MemoryRouter` (App uses `HashRouter` internally — see Integration Points below; for a minimal smoke we can simply assert it doesn't throw).
  - Concrete reasonable assertion: `App` renders without crashing AND a stable Layout chrome element exists in the DOM.
- **D-14:** Rename file from `App.test.js` to `App.test.jsx` for consistency with the recent `ea8fa48` "Renamed js components to jsx" commit. Keep colocated next to `App.jsx`.
- **D-15:** Keep the smoke test minimal — Phase 2 expands routing/per-page coverage. The Phase 1 acceptance gate is "suite is green," not "everything is covered."

### File naming & layout
- **D-16:** Tests live colocated with the source file: `Foo.jsx` → `Foo.test.jsx` (matches existing `App.test.js` location). Do not move to a `tests/` directory.
- **D-17:** Use `.test.jsx` for tests that render JSX, `.test.js` for pure-JS unit tests if any appear later. Vitest globs both by default.

### `eslintConfig` in package.json
- **D-18:** Leave `"react-app/jest"` in `eslintConfig.extends` for now. It's broadly Jest-compatible matchers/globals and Vitest's globals overlap. Removing it is out of scope and not required for Phase 1 success criteria.

### Claude's Discretion
- Exact assertion text in the rewritten `App.test.jsx` smoke test (any stable landmark/text from `Layout.jsx` is fine — pick one that won't churn).
- Whether to also delete `reportWebVitals.js` import wiring — leaving it alone is fine; it's unrelated to the testing setup.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project planning docs
- `.planning/PROJECT.md` — Project framing, Core Value, Key Decisions (Vitest, EmailJS mocking, HashRouter+MemoryRouter)
- `.planning/REQUIREMENTS.md` §"Test Infrastructure" — INFRA-01..05 are the Phase 1 requirements
- `.planning/ROADMAP.md` §"Phase 1: Test Infrastructure" — Phase goal and 5 success criteria

### Files to modify
- `vite.config.mjs` — add `test` block (jsdom, globals, setupFiles)
- `package.json` — add `vitest`, `jsdom` to devDependencies + `test`/`test:watch` scripts
- `src/setupTests.js` — already exists, no changes needed (verify it loads)
- `src/App.test.js` → rename to `src/App.test.jsx`, rewrite content

### Files to leave alone (Phase 1 scope guard)
- `src/main.jsx`, `src/App.jsx`, `src/App.css`, `src/index.css`, `src/reportWebVitals.js`
- `src/pages/*.jsx` (Phase 2 territory)

### External docs (read for current syntax/options)
- Vitest docs: https://vitest.dev/config/#environment, https://vitest.dev/config/#globals, https://vitest.dev/config/#setupfiles — for the exact `test` block options.
- `@testing-library/jest-dom` v5 — already in `package.json`. Side-effect import in `setupTests.js` works with Vitest 1.x+ (`expect` extension API is compatible).

No project-local ADRs exist (greenfield GSD init).

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- **`src/setupTests.js`** — already imports `@testing-library/jest-dom`. Vitest will load this once `setupFiles` is configured. Reuse as-is.
- **`@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event`** — already installed in `package.json`. No reinstall.
- **`vite.config.mjs`** — already uses ESM `defineConfig` from `vite`. We extend it with a `test` block; the existing `plugins`, `server`, `build` keys stay untouched.

### Established Patterns
- **ESM throughout** — `package.json` has `"type": "module"`. New `vite.config.mjs` `test` block continues ESM syntax.
- **`.jsx` for components** — recent commit `ea8fa48` renamed components to `.jsx`. New tests follow the same convention (`*.test.jsx` when rendering JSX).
- **Colocated test file** — `App.test.js` sits next to `App.jsx`. Maintain that pattern.

### Integration Points
- **Routing:** `src/App.jsx` mounts `<HashRouter>` directly. For a Phase 1 smoke test, render `<App />` in jsdom — `HashRouter` will read `window.location.hash` (defaults to "/"). No `MemoryRouter` wrapper is required at the Phase 1 smoke level. (Phase 2 will introduce `MemoryRouter`-based routing tests.)
- **Bootstrap CSS / Swiper CSS:** imported in `src/main.jsx`. `main.jsx` is NOT loaded by tests; only the component under test is. So CSS-import side effects don't pollute the test run unless a tested component does its own CSS import — currently none do.
- **EmailJS:** `src/pages/Contact.jsx` imports `@emailjs/browser` at module top. Phase 1 does not import or render `Contact`, so no mock is needed yet (Phase 3 problem).

### Codebase facts worth flagging for later phases
- `src/pages/Contact.jsx` actually uses **`emailjs.sendForm`** (not `emailjs.send`) — see `Contact.jsx:14`. REQUIREMENTS.md FORM-02 mentions `emailjs.send`; treat that as a typo. Phase 3 will mock `sendForm`. **Note for Phase 3 planning — not actionable in Phase 1.**
- `Contact.jsx` is a class component using `React.createRef()` for the form; success/error state is rendered as static DOM (always-present `sent-message`, `error-message`, `loading` divs) rather than React state. Phase 3 will need to reason about how to assert "success was shown" — likely visibility/class toggling logic that doesn't exist yet, or assertion on the `emailjs.sendForm` call being invoked.

</code_context>

<specifics>
## Specific Ideas

- The Phase 1 success bar is "suite green," not "good coverage." Resist the urge to over-test in this phase — leave per-page and form tests to their phases.
- Prefer a single `vite.config.mjs` over a separate `vitest.config.*` — fewer config files to keep in sync.
- Keep `test.globals: true` so the existing CRA-style `test(...)` and `expect(...)` calls keep working without rewriting them as `import { test, expect } from 'vitest'`.

</specifics>

<deferred>
## Deferred Ideas

- **Coverage reporting** (`@vitest/coverage-v8`, threshold gates) — deferred to QUAL-01 / v2.
- **CI workflow** (GitHub Action running `npm test` on PRs to `v2`) — deferred to QUAL-02 / v2.
- **Pre-commit hook running tests** — deferred to QUAL-03 / v2.
- **a11y assertions** (`jest-axe` or equivalent) — deferred to A11Y-01 / v2.
- **Bumping `@testing-library/user-event` from v13 to v14** — Phase 3 may want the async v14 API for form interaction tests. Decide there, not here.
- **Removing `react-app/jest` from `eslintConfig.extends`** and clean-up of CRA leftovers (e.g., `reportWebVitals.js`) — orthogonal cleanup, not part of the testing milestone.

</deferred>

---

*Phase: 1-Test Infrastructure*
*Context gathered: 2026-05-19*
