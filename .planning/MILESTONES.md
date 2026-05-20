# Milestones

## v1.0 Testing Coverage (Shipped: 2026-05-20)

**Phases completed:** 3 phases, 4 plans, 14 tasks

**Key accomplishments:**

- Vitest 4.1.6 wired into Vite via single-config `test` block, replacing stale CRA test scaffolding with a green smoke test that asserts the Layout banner landmark.
- AppRoutes named export extracted from App.jsx; route-table test covers 5 paths + /bogus; isolated Layout test locks banner, 4 nav hrefs, and children pass-through under MemoryRouter.
- Five page-level smoke tests using section-id contract (D-09), typed.js no-op mock for Home, fetch spy for Portfolio, and name-attr form assertions for Contact — full 14-test Vitest suite green.
- State-driven Contact form refactor + 4 user-event v14 interaction tests covering FORM-01..05 with a mocked @emailjs/browser SDK

---
