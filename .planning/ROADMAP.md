# Roadmap: harirajv.github.io — Portfolio Site

## Overview

Three-phase testing milestone for the harirajv.github.io portfolio. Phase 1 stands up a working Vitest setup on top of the existing Vite config and clears the stale CRA test scaffolding. Phase 2 adds smoke and routing tests for the five hash-routed pages and their shared `Layout`. Phase 3 adds interaction tests for the EmailJS-powered contact form (with the email send mocked). At the end, `npm test` runs green and exercises the parts of the portfolio that matter for reliability.

## Phases

- [ ] **Phase 1: Test Infrastructure** - Configure Vitest in vite.config.mjs, repair setupTests/jest-dom integration, replace stale CRA boilerplate test
- [ ] **Phase 2: Routing & Page Smoke Tests** - Tests for routing, Layout chrome, and each of the 5 pages rendering safely
- [ ] **Phase 3: Contact Form Tests** - Field interaction, submit handler, EmailJS mocked, success/failure states

## Phase Details

### Phase 1: Test Infrastructure
**Goal**: `npm test` runs Vitest against the current Vite project, exits with a correct status, and the suite is green (no leftover CRA boilerplate failures).
**Depends on**: Nothing (first phase)
**Requirements**: INFRA-01, INFRA-02, INFRA-03, INFRA-04, INFRA-05
**Success Criteria** (what must be TRUE):
  1. `npm test` runs a Vitest single-pass and exits 0 on a clean checkout
  2. `npm run test:watch` runs Vitest in watch mode for local dev
  3. `@testing-library/jest-dom` matchers are registered globally via `setupTests.js`
  4. The stale `App.test.js` boilerplate ("learn react") no longer fails the suite
  5. `vite.config.mjs` contains a `test` block (jsdom env, setupFiles wired)
**Plans**: 1 plan

Plans:
- [ ] 01-01: Wire Vitest into vite.config and clear stale CRA test scaffolding

### Phase 2: Routing & Page Smoke Tests
**Goal**: Every route and page renders safely under test, and `Layout` chrome is exercised. A regression on any of the five pages breaks the test suite.
**Depends on**: Phase 1
**Requirements**: ROUTE-01, ROUTE-02, ROUTE-03, ROUTE-04, PAGE-01, PAGE-02, PAGE-03, PAGE-04, PAGE-05
**Success Criteria** (what must be TRUE):
  1. Routing test mounts `App` under `MemoryRouter` and asserts the correct page renders for `/`, `/about`, `/resume`, `/portfolio`, `/contact`
  2. Each of the 5 page components has a smoke test that asserts at least one stable landmark/text without throwing
  3. `Layout` test asserts its header/footer chrome and that children render for an arbitrary active route
  4. Unknown route does not crash the app (graceful fallback or known empty state asserted)
**Plans**: 2 plans

Plans:
- [ ] 02-01: Routing + Layout tests (App under MemoryRouter, unknown-route behavior)
- [ ] 02-02: Per-page smoke tests for Home, About, Resume, Portfolio, Contact

### Phase 3: Contact Form Tests
**Goal**: The contact form's interaction path is covered end-to-end (typing → submit → EmailJS call → success/failure feedback), with EmailJS mocked so no real email is sent during tests.
**Depends on**: Phase 2
**Requirements**: FORM-01, FORM-02, FORM-03, FORM-04, FORM-05
**Success Criteria** (what must be TRUE):
  1. User can type into every contact-form field and the values are reflected in the inputs
  2. Submitting the form invokes `emailjs.send` (or its wrapper) with the typed values
  3. `emailjs.send` is mocked — no network call escapes the test
  4. After a resolved send, the user sees a success indication (asserted in the DOM)
  5. After a rejected send, the user sees a failure indication (asserted in the DOM)
**Plans**: 1 plan

Plans:
- [ ] 03-01: Contact form interaction tests with mocked EmailJS

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Test Infrastructure | 0/1 | Not started | - |
| 2. Routing & Page Smoke Tests | 0/2 | Not started | - |
| 3. Contact Form Tests | 0/1 | Not started | - |
