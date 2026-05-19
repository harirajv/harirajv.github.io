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

### Active

<!-- Current scope. Building toward these in the testing milestone. -->

- [ ] Working test runner configured for Vite (Vitest, not stale CRA Jest setup)
- [ ] Stale CRA boilerplate test removed/replaced (`App.test.js` asserts non-existent "learn react" text)
- [ ] Smoke tests for each of the 5 routes (Home, About, Resume, Portfolio, Contact)
- [ ] Routing test — each route renders the correct page through `HashRouter`
- [ ] Layout test — `Layout` renders header/footer/children for any route
- [ ] Contact form interaction tests — field input, submit handler, EmailJS call mocked
- [ ] CI-friendly `npm test` script that runs Vitest in single-pass mode (non-watch)

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
- **Testing libs already installed but not wired up:** `@testing-library/react` 13, `@testing-library/jest-dom` 5, `@testing-library/user-event` 13 — left over from CRA's Jest setup
- **Vite test config status:** `vite.config.mjs` has NO `test` block. `setupTests.js` imports `@testing-library/jest-dom` (Jest-style). `App.test.js` is the CRA boilerplate that asserts text `/learn react/i` which doesn't exist in `App.jsx`. So `npm test` currently has no test runner at all.
- **Branch context:** Active branch is `testcases` — this milestone is the formalization of the testing work the branch was created for.
- **Deploy target:** GitHub Pages (static) — tests run pre-deploy, not in production.

## Constraints

- **Tech stack**: Must stay on Vite — CRA migration is recent and shouldn't be reverted. Why: avoid backtracking.
- **Tooling**: Vitest preferred over Jest — native Vite integration, near-zero config beyond `vite.config.mjs`. Why: matches the existing Vite build pipeline.
- **Compatibility**: Existing `@testing-library/jest-dom` matchers should still work (they're framework-agnostic). Why: minimize churn to existing test dependencies.
- **Scope**: No new product features in this milestone. Why: testing milestone is about hardening, not growth.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Use Vitest, not Jest | Native Vite integration, faster, same Testing Library API | — Pending |
| Mock EmailJS at the module boundary | Don't hit a live email API in unit tests; deterministic + free | — Pending |
| Keep HashRouter as-is for tests | Existing routing works in production; tests use `MemoryRouter` | — Pending |
| Coarse phase granularity, sequential execution | Small project, single-developer cadence | — Pending |

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
*Last updated: 2026-05-19 after initialization*
