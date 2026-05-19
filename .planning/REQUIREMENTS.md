# Requirements: harirajv.github.io — Portfolio Site

**Defined:** 2026-05-19
**Core Value:** The portfolio reliably represents Hariraj's professional profile to visitors — every page renders, navigation works, and the contact form actually delivers messages.

## v1 Requirements

Requirements for this testing milestone. Each maps to roadmap phases.

### Test Infrastructure

- [x] **INFRA-01**: Vitest is configured in `vite.config.mjs` (`test` block with jsdom environment and `setupTests.js` referenced)
- [x] **INFRA-02**: `npm test` runs Vitest in single-pass (non-watch) mode and exits with the correct status code
- [x] **INFRA-03**: `npm run test:watch` (or equivalent) runs Vitest in watch mode for local development
- [x] **INFRA-04**: `setupTests.js` works with Vitest — `@testing-library/jest-dom` matchers register globally
- [x] **INFRA-05**: Stale CRA boilerplate test (`App.test.js` asserting "learn react") is removed or rewritten so the suite is green

### Routing & Layout

- [x] **ROUTE-01**: `App` mounted in `MemoryRouter` renders the `Home` page at route `/`
- [x] **ROUTE-02**: Navigating to `/about`, `/resume`, `/portfolio`, `/contact` each render their respective page component
- [x] **ROUTE-03**: `Layout` renders its header/footer chrome and children for any active route
- [x] **ROUTE-04**: An unknown route falls back gracefully (or asserts current behavior — no crash, blank content acceptable)

### Page Smoke Tests

- [x] **PAGE-01**: `Home` page renders without throwing and contains expected anchor text/landmark
- [x] **PAGE-02**: `About` page renders without throwing and contains expected anchor text/landmark
- [x] **PAGE-03**: `Resume` page renders without throwing and contains expected anchor text/landmark
- [x] **PAGE-04**: `Portfolio` page renders without throwing and contains expected anchor text/landmark
- [x] **PAGE-05**: `Contact` page renders form fields (name, email, subject, message) and a submit button

### Contact Form

- [ ] **FORM-01**: User can type into name/email/subject/message fields and the values update
- [ ] **FORM-02**: Submitting the form calls `emailjs.send` (or the project's wrapper) with the entered values
- [ ] **FORM-03**: `emailjs.send` is mocked in tests — no real network/email call is made
- [ ] **FORM-04**: Success state is shown after a resolved EmailJS send (assert visible feedback)
- [ ] **FORM-05**: Failure state is shown after a rejected EmailJS send (assert visible feedback or error message)

## v2 Requirements

Deferred to future release. Tracked but not in current roadmap.

### Coverage & Quality

- **QUAL-01**: Coverage reporting via `@vitest/coverage-v8` with a baseline threshold
- **QUAL-02**: CI workflow (GitHub Actions) running `npm test` on PRs to `v2`
- **QUAL-03**: Pre-commit hook running `npm test` before commit

### Accessibility

- **A11Y-01**: Automated a11y assertions via `jest-axe` (or equivalent) on each page
- **A11Y-02**: Keyboard navigation tests for the primary nav

## Out of Scope

Explicitly excluded. Documented to prevent scope creep.

| Feature | Reason |
|---------|--------|
| Playwright / Cypress E2E tests | Overkill for a static portfolio; component + integration tests are sufficient |
| Visual regression snapshots | No design churn; manual eyeballing is enough |
| Live EmailJS integration tests | We test our code, not theirs; deterministic mocks instead |
| New portfolio pages / features | This milestone is testing only |
| Migrating off Bootstrap | Not a testing concern |
| Re-architecting routing (Hash → Browser) | Existing routing works in prod |

## Traceability

Which phases cover which requirements. Populated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| INFRA-01 | Phase 1 | Complete |
| INFRA-02 | Phase 1 | Complete |
| INFRA-03 | Phase 1 | Complete |
| INFRA-04 | Phase 1 | Complete |
| INFRA-05 | Phase 1 | Complete |
| ROUTE-01 | Phase 2 | Complete |
| ROUTE-02 | Phase 2 | Complete |
| ROUTE-03 | Phase 2 | Complete |
| ROUTE-04 | Phase 2 | Complete |
| PAGE-01 | Phase 2 | Complete |
| PAGE-02 | Phase 2 | Complete |
| PAGE-03 | Phase 2 | Complete |
| PAGE-04 | Phase 2 | Complete |
| PAGE-05 | Phase 2 | Complete |
| FORM-01 | Phase 3 | Pending |
| FORM-02 | Phase 3 | Pending |
| FORM-03 | Phase 3 | Pending |
| FORM-04 | Phase 3 | Pending |
| FORM-05 | Phase 3 | Pending |

**Coverage:**
- v1 requirements: 19 total
- Mapped to phases: 19
- Unmapped: 0 ✓

---
*Requirements defined: 2026-05-19*
*Last updated: 2026-05-19 after initial definition*
