# harirajv.github.io — Portfolio Site

## What This Is

Personal portfolio and resume site for Hariraj Venkatesan, built with React 18 + Vite and deployed via GitHub Pages at harirajv.github.io. Five hash-routed pages (Home, About, Resume, Portfolio, Contact) wrapped in a shared `Layout`, with an EmailJS-powered contact form.

## Core Value

The portfolio reliably represents Hariraj's professional profile to visitors — every page renders, navigation works, and the contact form actually delivers messages.

## Requirements

### Validated

<!-- Shipped and confirmed valuable. Inferred from existing code (brownfield). -->

- ✓ React 18 + Vite 5 SPA scaffolding — existing (post CRA→Vite migration in `2c4bb4f`)
- ✓ HashRouter with 5 routes: `/`, `/about`, `/resume`, `/portfolio`, `/contact` — existing (`src/App.jsx`)
- ✓ Shared `Layout` wrapper for all pages — existing (`src/pages/Layout.jsx`)
- ✓ Contact form submits via `@emailjs/browser` — existing (`fd02ef6`)
- ✓ GitHub Pages deploy via `gh-pages` script — existing (`package.json`)
- ✓ Bootstrap 5 + bootstrap-icons styling — existing
- ✓ Working test runner configured for Vite (Vitest 4.1.6 + jsdom 29.x) — Validated in Phase 1
- ✓ Stale CRA boilerplate test removed/replaced — Validated in Phase 1 (`src/App.test.jsx` rewritten)
- ✓ CI-friendly `npm test` script that runs Vitest in single-pass mode — Validated in Phase 1
- ✓ Routing test — each route renders the correct page through `MemoryRouter`+`AppRoutes` — Validated in Phase 2
- ✓ Layout test — header chrome + children pass-through — Validated in Phase 2 (`src/pages/Layout.test.jsx`)
- ✓ Smoke tests for each of the 5 routes (Home, About, Resume, Portfolio, Contact) — Validated in Phase 2 (`src/pages/*.test.jsx`)
- ✓ Contact form interaction tests — field input, submit handler, EmailJS call mocked, success/failure feedback — Validated in Phase 3 (`src/pages/Contact.test.jsx`, refactored `Contact.jsx` to state-driven status enum)

### Active

<!-- Empty between milestones. Populated by /gsd:new-milestone. -->

_No active requirements. Milestone v1.0 shipped 2026-05-20. Run `/gsd:new-milestone` to define the next milestone's scope._

### Candidates for Next Milestone

<!-- Deferred during v1.0; surface during /gsd:new-milestone scoping. -->

- [ ] **QUAL-01:** Coverage reporting via `@vitest/coverage-v8` with a baseline threshold
- [ ] **QUAL-02:** CI workflow (GitHub Actions) running `npm test` on PRs
- [ ] **QUAL-03:** Pre-commit hook running `npm test` before commit
- [ ] **A11Y-01:** Automated a11y assertions via `jest-axe` (or equivalent) on each page
- [ ] **A11Y-02:** Keyboard navigation tests for the primary nav
- [ ] Cleanup of dead `.loading` / `.sent-message` / `.error-message` CSS rules (Phase 3 deferred)
- [ ] REQUIREMENTS.md typo fix: `emailjs.send` → `emailjs.sendForm` (Phase 1/2/3 flagged)
- [ ] Resume page heading copy ("About Me" vs. "Resume" — Phase 2 deferred)

### Out of Scope

<!-- Explicit boundaries. -->

- E2E browser tests (Playwright/Cypress) — overkill for a static portfolio at this stage; component + integration tests are sufficient
- Visual regression testing — no design churn, manual eyeballing is enough
- Live EmailJS integration tests — the EmailJS API is mocked; we test our code, not theirs
- Adding new portfolio pages or features — this milestone is testing only
- Migrating off Bootstrap or changing styling approach — out of scope
- Re-architecting routing (HashRouter → BrowserRouter) — out of scope

## Context

- **Stack:** React 18.3, Vite 5.4, react-router-dom 6.26 (HashRouter), Bootstrap 5.3, `@emailjs/browser` 4.4
- **Test stack (v1.0):** Vitest 4.1.6 + jsdom 29.x; `@testing-library/react` 13, `@testing-library/jest-dom` 5, `@testing-library/user-event` 14.5.2 (bumped in Phase 3); single config in `vite.config.mjs` `test` block (no separate `vitest.config.*`); `setupTests.js` registers jest-dom matchers globally; no global mocks (per-test `vi.mock` only).
- **Test surface shipped (7 files / 18 tests):** `src/App.test.jsx` (5 routes + unknown route), `src/pages/Layout.test.jsx` (banner + nav hrefs + children pass-through), `src/pages/{Home,About,Resume,Portfolio,Contact}.test.jsx` (per-page smoke), plus the Phase 3 `Contact form interactions` describe block (FORM-01/02/04/05; FORM-03 satisfied structurally by module-scope `vi.mock('@emailjs/browser')`).
- **Production changes during v1.0:** small `App.jsx` refactor to export `AppRoutes` (so tests can wrap it in `MemoryRouter`); `Contact.jsx` refactor from static feedback divs to state-driven `status` enum (`'idle' | 'sending' | 'success' | 'error'`) with `form.reset()` on success and a disabled submit button while sending.
- **Branch context:** Work shipped on the `testcases` branch (the branch's original purpose). Ready to PR to `v2`.
- **Deploy target:** GitHub Pages (static) — tests run pre-deploy, not in production.
- **Known deferred items:** Coverage reporting, CI workflow, pre-commit hooks, a11y assertions, dead CSS cleanup, and the REQUIREMENTS.md `send` vs `sendForm` typo — all surfaced in "Candidates for Next Milestone".

## Constraints

- **Tech stack**: Must stay on Vite — CRA migration is recent and shouldn't be reverted. Why: avoid backtracking.
- **Tooling**: Vitest preferred over Jest — native Vite integration, near-zero config beyond `vite.config.mjs`. Why: matches the existing Vite build pipeline.
- **Compatibility**: Existing `@testing-library/jest-dom` matchers should still work (they're framework-agnostic). Why: minimize churn to existing test dependencies.
- **Scope**: No new product features in this milestone. Why: testing milestone is about hardening, not growth.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Use Vitest, not Jest | Native Vite integration, faster, same Testing Library API | ✓ Validated in Phase 1 (Vitest 4.1.6) |
| Mock EmailJS at the module boundary | Don't hit a live email API in unit tests; deterministic + free | ✓ Validated in Phase 3 (`vi.mock('@emailjs/browser', ...)` module-scope, per-test `mockResolvedValueOnce`/`mockRejectedValueOnce`) |
| Refactor `Contact.jsx` to state-driven status enum | Success/error UI was static DOM; FORM-04/05 were not assertable without conditional render | ✓ Phase 3 (`status: 'idle' \| 'sending' \| 'success' \| 'error'`) |
| Bump `@testing-library/user-event` to v14 | Async API matches promise-based submit + `waitFor`/`findBy*` flow | ✓ Phase 3 (`^14.5.2`) |
| Keep HashRouter as-is for tests | Existing routing works in production; tests use `MemoryRouter`+`AppRoutes` | ✓ Validated in Phase 2 |
| Coarse phase granularity, sequential execution | Small project, single-developer cadence | ✓ Validated through Phase 2 |
| Per-test mocks (no global mocks in setupTests.js) | Keep test setup focused; mocks live where they're used | ✓ Established in Phase 2 |
| Section-id selectors for page sentinels | ARIA roles collide on Resume's `<h2>About Me</h2>`; section ids are stable | ✓ Established in Phase 2 |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd:complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-05-20 after v1.0 Testing Coverage milestone shipped*
