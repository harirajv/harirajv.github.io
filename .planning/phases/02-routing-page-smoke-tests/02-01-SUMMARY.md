---
phase: 02-routing-page-smoke-tests
plan: 01
subsystem: testing
tags: [vitest, jsdom, react-router, testing-library, memoryrouter, smoke-tests]

requires:
  - phase: 01-test-infrastructure
    provides: Vitest 4.1.6 + jsdom + jest-dom matchers + globals (describe/it/expect/vi) wired in vite.config.mjs

provides:
  - Named export `AppRoutes` from src/App.jsx (router-agnostic route table for testing)
  - Route-table test in src/App.test.jsx covering 5 known paths + /bogus unknown route
  - Isolated Layout chrome test in src/pages/Layout.test.jsx (banner, 4 nav hrefs, children pass-through)
  - Section-id contract (D-09): #hero, #about, #resume, #portfolio, #contact as stable DOM sentinels

affects: [02-routing-page-smoke-tests/02-02, 03-contact-form-tests]

tech-stack:
  added: []
  patterns:
    - "AppRoutes pattern: extract <Layout><Routes>...</Routes></Layout> into named export; default App wraps in <HashRouter>"
    - "Route testing: wrap <AppRoutes/> in <MemoryRouter initialEntries={[path]}> to drive routes deterministically"
    - "Section-id contract (D-09): container.querySelector('#<id>') as stable per-page assertion signal"
    - "Side-effect mocks scoped to test file: vi.mock('typed.js') for Home, vi.spyOn(global,'fetch') for Portfolio"
    - "ARIA banner role (getByRole('banner')) for Layout chrome assertions (D-11)"

key-files:
  created:
    - "src/pages/Layout.test.jsx"
  modified:
    - "src/App.jsx"
    - "src/App.test.jsx"

key-decisions:
  - "D-01: AppRoutes named export wraps the 5-route table; default App wraps AppRoutes in HashRouter — production behavior unchanged"
  - "D-02: Phase 1 banner-only smoke test dropped; route-table tests inherently cover Layout chrome via getByRole('banner')"
  - "D-03: Layout.test.jsx uses MemoryRouter (Link requires router ancestor); asserts About link -> '/' (locks current Layout.jsx:30 behavior)"
  - "D-12: No catch-all <Route path='*'> added; /bogus test locks current 'blank body + Layout chrome' behavior"
  - "Worktree merge: worktree-agent branch started from v2 (pre-Phase-1); merged testcases to pick up Phase 1 infrastructure before executing Phase 2 tasks"

patterns-established:
  - "Section-id contract (D-09): #hero (Home), #about (About), #resume (Resume), #portfolio (Portfolio), #contact (Contact) — single source of truth shared with Plan 02-02"
  - "Route test shape: render(<MemoryRouter initialEntries={[path]}><AppRoutes/></MemoryRouter>); destructure { container }; assert container.querySelector('#<id>').toBeInTheDocument()"
  - "Unknown route test: render at '/bogus'; assert banner present + all 5 section ids null"
  - "typed.js mock at file scope in App.test.jsx: vi.mock('typed.js', () => ({ default: class { constructor() {} destroy() {} } }))"
  - "fetch mock in beforeEach: vi.spyOn(global,'fetch').mockResolvedValue({ ok:true, json: () => Promise.resolve({projects:[]}) })"

requirements-completed:
  - ROUTE-01
  - ROUTE-02
  - ROUTE-03
  - ROUTE-04

duration: ~10min
completed: 2026-05-19
---

# Phase 2 Plan 01: Routing + Layout Tests Summary

**AppRoutes named export extracted from App.jsx; route-table test covers 5 paths + /bogus; isolated Layout test locks banner, 4 nav hrefs, and children pass-through under MemoryRouter.**

## Performance

- **Duration:** ~10 min
- **Started:** 2026-05-19T16:40:06Z
- **Completed:** 2026-05-19T16:43:31Z
- **Tasks:** 3 (all completed)
- **Files modified:** 3 (src/App.jsx, src/App.test.jsx, src/pages/Layout.test.jsx)

## Accomplishments

- Refactored `src/App.jsx` to export `AppRoutes` (named) alongside default `App` — identical runtime behavior, now testable in isolation
- Replaced Phase 1 single-assertion smoke test with a 6-case route-table test (ROUTE-01..04) using `MemoryRouter`
- Created `src/pages/Layout.test.jsx` asserting banner landmark, exact nav link hrefs (including the "About"->`/` current behavior), and children pass-through
- Full Vitest suite: 9 tests across 2 files, all green

## Task Commits

Each task was committed atomically:

1. **Task 1: Refactor src/App.jsx to export AppRoutes** - `4a898e9` (refactor)
2. **Task 2: Rewrite src/App.test.jsx as route-table test** - `94f58fc` (feat)
3. **Task 3: Add isolated src/pages/Layout.test.jsx** - `9d66a58` (feat)

## Files Created/Modified

- `src/App.jsx` - Added named `export function AppRoutes()` holding `<Layout><Routes>5 routes</Routes></Layout>`; default `App` becomes `<HashRouter><AppRoutes/></HashRouter>`
- `src/App.test.jsx` - Fully replaced with route-table test: 5 known paths + /bogus, `typed.js` mock (D-05), `fetch` spy (D-06), section-id assertions (D-09)
- `src/pages/Layout.test.jsx` - New isolated test: `getByRole('banner')`, 4 nav link href assertions, stub-child pass-through

## Decisions Made

- **D-01 applied exactly:** AppRoutes contains the route table; default App wraps it in HashRouter. No double-HashRouter nesting issue.
- **D-02 applied exactly:** Phase 1 "renders the Layout header without crashing" test dropped entirely; route tests inherit banner coverage.
- **D-03: "About" link asserts href="/" not "/about"** — Layout.jsx:30 maps "About" -> "/" (treats home as About-style landing). Test locks this as the contract.
- **D-12 enforced:** No `<Route path="*">` added. /bogus test asserts current behavior: banner visible, zero page section ids in DOM.
- **Worktree base branch correction (deviation):** The worktree-agent branch was spawned from v2 (pre-Phase-1 codebase, had `App.test.js` not `App.test.jsx` and no Vitest setup). Merged `testcases` branch (which contains Phase 1 commits) into the worktree branch before executing Phase 2 tasks. This brought in vite.config.mjs test block, package.json Vitest devDeps, and the correct `App.test.jsx` file.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Worktree missing Phase 1 infrastructure**
- **Found during:** Task 1 (pre-execution verification)
- **Issue:** The worktree-agent branch was created from `v2` (the older codebase branch) instead of `testcases` (the GSD-workflow branch with Phase 1 commits). The worktree had `src/App.test.js` (CRA boilerplate) instead of `src/App.test.jsx`, and `vite.config.mjs` lacked the `test` block. Running `npm test -- --run` failed with a CRA-era parse error.
- **Fix:** Ran `git merge testcases --no-edit` inside the worktree. Fast-forward merge brought in all Phase 1 commits (vite.config.mjs test block, package.json Vitest devDeps, `App.test.jsx`, `.planning/` artifacts, `CLAUDE.md`). `npm test` went green (1 test) before proceeding.
- **Files modified:** Multiple (via merge — package.json, package-lock.json, vite.config.mjs, src/App.test.jsx, src/App.test.js deleted, .planning/**, CLAUDE.md)
- **Verification:** `npm test -- --run` exits 0 with 1 test passing after merge, before any Phase 2 changes
- **Committed in:** Merge commit (fast-forward, no separate merge commit created)

---

**Total deviations:** 1 auto-fixed (Rule 3 - blocking infrastructure gap)
**Impact on plan:** Fix was necessary to reach a correct baseline. Phase 2 tasks then executed exactly as planned.

## Issues Encountered

- **Accidental edit to main repo App.jsx:** Early in execution, before the worktree merge, an Edit tool call targeting `src/App.jsx` resolved to the main repo path instead of the worktree path. This was immediately detected (git status in worktree showed no changes), reverted in the main repo, and the correct edit was applied to the worktree path after the merge. No persistent damage.

## Known Stubs

None — all assertions target live production markup (section ids already present in every page component). No stub data flows to any UI path exercised by these tests.

## Threat Flags

None — plan adds test files only (dev-time, not bundled). The `src/App.jsx` refactor is a function extraction with no new runtime branches, no new input surfaces.

## User Setup Required

None — no external service configuration required.

## Next Phase Readiness

- **Plan 02-02 (per-page smoke tests)** can begin immediately:
  - Section-id contract (D-09) established and proven: `#hero`, `#about`, `#resume`, `#portfolio`, `#contact`
  - Side-effect mock patterns established: `vi.mock('typed.js', ...)` for Home, `vi.spyOn(global,'fetch',...)` for Portfolio
  - `AppRoutes` available but 02-02 tests pages in isolation (not via routing) — each page test renders its own component directly under MemoryRouter or plain render
  - Full suite green (9 tests), no regressions to clean up

---
*Phase: 02-routing-page-smoke-tests*
*Completed: 2026-05-19*
