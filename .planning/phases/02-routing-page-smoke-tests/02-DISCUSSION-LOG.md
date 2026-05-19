# Phase 2: Routing & Page Smoke Tests - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in `02-CONTEXT.md` — this log preserves the alternatives considered.

**Date:** 2026-05-19
**Phase:** 2-Routing & Page Smoke Tests
**Areas discussed:** Routing test approach, Side-effect handling per page (Typed/fetch/emailjs), Per-page assertion selector strategy, Unknown-route behavior (ROUTE-04)

---

## Routing test approach

| Option | Description | Selected |
|--------|-------------|----------|
| Extract `<AppRoutes>` sibling | Refactor `App.jsx` so `HashRouter` wraps an exported `<AppRoutes>` that holds Layout + Routes. Prod still uses HashRouter. Tests render `<MemoryRouter initialEntries={[path]}><AppRoutes/></MemoryRouter>`. Single source of truth. | ✓ |
| Hash manipulation on full `<App/>` | Don't touch App. Render `<App/>`, set `window.location.hash`, dispatch `hashchange`. Tests jsdom-fragile and noisier. | |
| Duplicate routes inside a test helper | Copy the 5 `<Route>` lines into a test-only `<TestRoutes>` under `<MemoryRouter>`. Drift risk on new routes. | |

**User's choice:** Extract `<AppRoutes>` sibling (Recommended)
**Notes:** Phase 1 already pre-flagged this approach in `01-CONTEXT.md`'s Integration Points. Prod HashRouter behavior is untouched.

---

| Option | Description | Selected |
|--------|-------------|----------|
| Export from `App.jsx`; test in `App.test.jsx` | `export function AppRoutes() {...}` alongside default `App`. Routing assertions go in the existing `App.test.jsx`. | ✓ |
| New `src/AppRoutes.jsx` + `AppRoutes.test.jsx` | Move Layout+Routes into its own module; `App.jsx` becomes 3 lines. | |
| Export from `App.jsx`; new `App.routing.test.jsx` | Same App.jsx refactor, but keep the existing smoke test as-is and add a separate routing test file. | |

**User's choice:** Export from `App.jsx`; test in `App.test.jsx` (Recommended)
**Notes:** Minimal file proliferation. Existing Phase 1 smoke test inside `App.test.jsx` is superseded by the route-table tests.

---

| Option | Description | Selected |
|--------|-------------|----------|
| New `src/pages/Layout.test.jsx` | Colocated with `Layout.jsx`. Tests Layout in isolation: render `<MemoryRouter><Layout>{stub}</Layout></MemoryRouter>`, assert banner role, nav links, child pass-through. | ✓ |
| Fold Layout assertions into `App.test.jsx` | No new file; assert chrome alongside route assertions. | |
| Both — isolated `Layout.test.jsx` + spot-checks in `App.test.jsx` | Layout owns chrome contract; App.test.jsx adds one banner sanity check. | |

**User's choice:** New `src/pages/Layout.test.jsx` (Recommended)
**Notes:** Mirrors Phase 1's colocation convention.

---

| Option | Description | Selected |
|--------|-------------|----------|
| Replace with route-table test | Drop the standalone `banner exists` it() — every route assertion implicitly proves chrome too. | ✓ |
| Keep banner smoke + add route table | Two describe blocks: smoke + routing. | |
| Keep banner smoke only; routing in `App.routing.test.jsx` | Walk back the earlier file-structure choice. | |

**User's choice:** Replace with route-table test (Recommended)
**Notes:** Phase 1's banner-only test is inherently covered by the route table; no value in keeping both.

---

## Side-effect handling per page (Typed/fetch/emailjs)

| Option | Description | Selected |
|--------|-------------|----------|
| Per-test mocks where needed | `vi.mock`/`vi.spyOn` in the specific test file that needs them. | ✓ |
| Global mocks in `setupTests.js` | Default mocks for typed.js + fetch in setupTests. | |
| Render-and-tolerate (no mocks) | Let side effects run; suppress console noise. | |

**User's choice:** Per-test mocks where needed (Recommended)
**Notes:** Keeps `setupTests.js` aligned with Phase 1's contract (jest-dom matchers only).

---

| Option | Description | Selected |
|--------|-------------|----------|
| Mock fetch with resolved empty projects | `vi.spyOn(global, 'fetch').mockResolvedValue({ ok: true, json: () => Promise.resolve({ projects: [] }) })`. Exercises the success branch via `waitFor`. | ✓ |
| Mock fetch to reject; assert no-crash | Mock fetch to reject; assert component still mounts. | |
| Synchronous render only — assert pre-fetch state | No fetch mock; assert static chrome only. | |

**User's choice:** Mock fetch with resolved empty projects (Recommended)
**Notes:** Exercises `componentDidMount` → `setState` → re-render path. Empty projects array avoids needing fixture data.

---

| Option | Description | Selected |
|--------|-------------|----------|
| `vi.mock('typed.js')` as a no-op class | Replace typed.js default export with a class whose constructor/destroy are no-ops. | ✓ |
| `vi.useFakeTimers()` and let typed.js run | Don't mock module; control time. | |
| No mock; rely on componentWillUnmount cleanup | Let typed.js run; trust RTL unmount + cWU. | |

**User's choice:** `vi.mock('typed.js')` as a no-op class (Recommended)
**Notes:** Removes all timer-leak surface area. Trust typed.js to do its job in prod; don't exercise it in unit tests.

---

| Option | Description | Selected |
|--------|-------------|----------|
| No mock in Phase 2 — render only | `<Contact/>` render doesn't call sendForm; Phase 3 owns the mock alongside the submit interaction. | ✓ |
| Mock emailjs preemptively in Phase 2 | Add the mock now so Phase 3 has zero setup. | |

**User's choice:** No mock in Phase 2 — render only (Recommended)
**Notes:** Avoid pre-paying complexity. Module-level emailjs import is side-effect-free.

---

## Per-page assertion selector strategy

| Option | Description | Selected |
|--------|-------------|----------|
| Section id via `container.querySelector` | Assert `#hero / #about / #resume / #portfolio / #contact` per page. Bypasses h2-text collision (`Resume.jsx`'s h2 is "About Me"). | ✓ |
| Heading role with exact-match name | `getByRole('heading', { level: 2, name: /^About$/ })` etc. Pure ARIA pattern but reads awkwardly for Resume. | |
| Hybrid — role for Home, section id for the rest | Home: `getByRole('heading', { level: 1, name: /Hariraj Venkatesan/ })`. Others: section id. | |

**User's choice:** Section id via `container.querySelector` (Recommended)
**Notes:** Section ids are stable CSS hooks already used in `App.css`. Single pattern across all 5 pages.

---

| Option | Description | Selected |
|--------|-------------|----------|
| Yes — single source of truth | App.test.jsx asserts the same section ids as per-page tests. | ✓ |
| Routing uses heading-name; per-page uses section id | Two patterns. | |

**User's choice:** Yes — single source of truth (Recommended)
**Notes:** Renaming a section id breaks both layers visibly together.

---

| Option | Description | Selected |
|--------|-------------|----------|
| Form fields by `name` attribute + submit button | Inputs queried by `name=user_name`/`user_email`/`subject`/`message`; submit by text "Send Message". | ✓ |
| Form fields by placeholder text | `queryByPlaceholderText('Your Name')` etc. | |
| Section id only + submit button | Defer field enumeration to Phase 3. | |

**User's choice:** Form fields by `name` attribute + submit button (Recommended)
**Notes:** `name` attrs are the contract Contact.jsx already exposes. Reusable handle for Phase 3 interaction tests.

---

## Unknown-route behavior (ROUTE-04)

| Option | Description | Selected |
|--------|-------------|----------|
| Lock current behavior | No App.jsx changes. Test asserts no throw + `getByRole('banner')` + no section ids present for `/bogus`. | ✓ |
| Add a tiny `<Route path="*">` NotFound stub | One-line catch-all; test asserts `#not-found` renders. | |
| Redirect unknown routes to `/` | `<Route path='*' element={<Navigate to='/' replace/>}/>`. Behavior change visible to real users. | |

**User's choice:** Lock current behavior (Recommended)
**Notes:** Treats today's blank-body behavior as the contract. Adding NotFound or a redirect would be scope creep for a testing milestone.

---

## Claude's Discretion

- Choice of `data-testid` vs `container.querySelector` for the section-id check (both reach the same node — sticking with `container.querySelector` to avoid touching production markup).
- Exact stub child node used in `Layout.test.jsx` (any unique marker is acceptable).
- Whether to use `userEvent` or `fireEvent` if any incidental click test grows (Phase 2 doesn't require user interaction).
- Whether to add per-file `afterEach(() => vi.restoreAllMocks())` or set Vitest's `restoreMocks: true` config flag (functionally equivalent).

## Deferred Ideas

- **`Layout.jsx` "About" nav link points to `/`** — keep current behavior, revisit in a future polish phase.
- **Real 404/NotFound page** — out of scope for the testing milestone.
- **Coverage reporting** (`@vitest/coverage-v8`, thresholds) — deferred to v2 / QUAL-01.
- **CI workflow** — deferred to v2 / QUAL-02.
- **a11y assertions** (`jest-axe`) — deferred to v2 / A11Y-01.
- **REQUIREMENTS.md FORM-02 `emailjs.send` typo** — Phase 3 fixes by mocking `sendForm` instead.
- **Resume `<h2>` text "About Me"** — production-content oddity; not a testing concern.
- **`Contact.jsx` success/error currently static DOM** — Phase 3 will introduce state-driven visibility for FORM-04/05.
