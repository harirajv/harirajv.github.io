# Phase 2: Routing & Page Smoke Tests - Context

**Gathered:** 2026-05-19
**Status:** Ready for planning

<domain>
## Phase Boundary

Prove that the portfolio's hash-routed app is wired correctly under test: every URL renders the right page component, `Layout` chrome surrounds them, and each of the 5 pages mounts in jsdom without throwing. A regression on any of the 5 pages or on the route wiring must break `npm test`.

**In scope:**
- Tiny refactor of `src/App.jsx` to export a sibling `AppRoutes` component (Layout + Routes) so it can be wrapped in `MemoryRouter` for tests. Prod `App` keeps `HashRouter`.
- New routing tests in `src/App.test.jsx` covering `/`, `/about`, `/resume`, `/portfolio`, `/contact`, and an unknown path (`/bogus`).
- New isolated Layout test at `src/pages/Layout.test.jsx` — header role, nav links, children pass-through.
- New per-page smoke tests at `src/pages/{Home,About,Resume,Portfolio,Contact}.test.jsx`, each rendering the page in isolation and asserting a stable section landmark.
- Side-effect mocks per page where needed: `typed.js` (Home), `global.fetch` (Portfolio).

**Out of scope for Phase 2:**
- Contact form interaction (typing, submit handler, EmailJS) → Phase 3
- Coverage reporting (`@vitest/coverage-v8`) → v2 / QUAL-01
- CI workflow → v2 / QUAL-02
- a11y assertions (`jest-axe`) → v2 / A11Y-01
- Adding a 404/NotFound page or redirect for unknown routes → not in this milestone (decision: lock current behavior)
- Migrating `HashRouter` → `BrowserRouter`, or any other routing refactor beyond the `AppRoutes` extraction

</domain>

<decisions>
## Implementation Decisions

### Routing test approach
- **D-01:** Refactor `src/App.jsx` to export a sibling `function AppRoutes()` that holds `<Layout><Routes>...</Routes></Layout>`. The default `App` export remains `<HashRouter><AppRoutes/></HashRouter>`. Prod runtime behavior is unchanged; tests wrap `<AppRoutes/>` in `<MemoryRouter initialEntries={[path]}>` to drive each route deterministically. Single source of truth — no duplicate route table in tests.
- **D-02:** All route assertions live in `src/App.test.jsx`. Replace Phase 1's lone "banner role" smoke test with a route-table test that mounts `<MemoryRouter><AppRoutes/></MemoryRouter>` once per route and asserts the correct page section id is in the DOM (see D-09). The phase 1 banner check is inherently satisfied by every route case (Layout still mounts), so the dedicated banner-only test is dropped — not kept alongside.
- **D-03:** `Layout` gets its own isolated test at `src/pages/Layout.test.jsx`. It renders `<MemoryRouter><Layout>{stubChild}</Layout></MemoryRouter>`, asserts `getByRole('banner')` on the header, asserts the 4 nav `<Link>`s have the expected `href`s (`/`, `/resume`, `/portfolio`, `/contact` — see Code Insights note on About's "/" link), and asserts the stub child renders inside the Layout (children pass-through contract).

### Side-effect handling per page
- **D-04:** Mocks are declared per test file using `vi.mock(...)` / `vi.spyOn(...)`. **Do not** put global mocks in `src/setupTests.js`. Keep `setupTests.js` as-is so it stays focused on jest-dom matcher registration (the Phase 1 contract).
- **D-05 (Home):** Mock `typed.js` as a no-op default-export class so Home's `componentDidMount` (`new Typed(this.el, options)`) and `componentWillUnmount` (`this.typed.destroy()`) are zero-cost. Pattern:

  ```js
  vi.mock('typed.js', () => ({
    default: class { constructor() {} destroy() {} }
  }));
  ```

  Reason: typed.js runs a persistent timer loop; mocking removes all timer/leak risk and keeps the smoke test fast.

- **D-06 (Portfolio):** Mock the global `fetch` per-test with `vi.spyOn(global, 'fetch').mockResolvedValue({ ok: true, json: () => Promise.resolve({ projects: [] }) })`. Use `waitFor` from RTL to let the `componentDidMount` chain (`fetch().then(json).then(setState)`) resolve, then assert the section id. Mock is restored in `afterEach` (RTL/Vitest defaults will handle this if `vi.restoreAllMocks()` is called). Reason: exercises the success branch (cDM → setState → re-render) which is what runs in prod when the JSON arrives.
- **D-07 (Contact):** No mock of `@emailjs/browser` in Phase 2. Rendering `<Contact/>` does not call `emailjs.sendForm` — that only fires on submit, and Phase 2 does not simulate submit. The default `emailjs` import is side-effect-free at module load. Phase 3 will introduce the mock alongside the submit interaction.
- **D-08 (About, Resume):** No special handling required. About's `handleWaypointEnter` is defined but not wired to any DOM event today. Resume's `componentDidMount` does not exist. Both render purely synchronously.

### Per-page assertion selectors
- **D-09:** Every page test (and the routing test, per route) uses `container.querySelector('#<section-id>')` as the "rendered correctly" signal. Mapping:

  | Path | Page component | Section id |
  |------|----------------|------------|
  | `/` | `Home` | `#hero` |
  | `/about` | `About` | `#about` |
  | `/resume` | `Resume` | `#resume` |
  | `/portfolio` | `Portfolio` | `#portfolio` |
  | `/contact` | `Contact` | `#contact` |

  Reason: This bypasses the heading-text collision (`Resume.jsx`'s `<h2>` is literally `"About Me"`, which would clash with `About.jsx`'s `<h2>About</h2>` under heading-role matching). Section ids are stable CSS hooks — already used by `App.css` — so they're unlikely to churn.
- **D-10:** `Contact.test.jsx` adds extra assertions to satisfy PAGE-05: inputs queried by `name` attribute (`user_name`, `user_email`, `subject`, and a `<textarea name="message">`) and a submit button matched by accessible text "Send Message". Querying by `name` attr (rather than placeholder) gives Phase 3 a clean handle for `userEvent.type(...)` interaction tests.
- **D-11:** The Phase 1 pattern of preferring ARIA roles is preserved where it works without contortion: `Layout.test.jsx` continues to use `getByRole('banner')`. For per-page sentinels, the section-id query wins on signal-to-noise grounds (D-09).

### Unknown-route behavior (ROUTE-04)
- **D-12:** Do NOT add a `<Route path="*">` catch-all or any redirect. Lock the current behavior: with no catch-all defined, react-router-dom 6 renders Layout chrome (banner remains visible) but nothing inside the `<Routes>` slot. The test for ROUTE-04 in `App.test.jsx` asserts: rendering at `initialEntries={['/bogus']}` does not throw, `getByRole('banner')` is present (Layout mounts), and none of `#hero`, `#about`, `#resume`, `#portfolio`, `#contact` is in the DOM. This treats the current behavior as the contract.

### Test file layout & plan boundaries
- **D-13:** Plan boundaries (per ROADMAP):
  - **Plan 02-01** owns: `src/App.jsx` refactor (export `AppRoutes`), `src/App.test.jsx` (route table + unknown route), `src/pages/Layout.test.jsx`.
  - **Plan 02-02** owns: per-page smoke tests at `src/pages/Home.test.jsx`, `About.test.jsx`, `Resume.test.jsx`, `Portfolio.test.jsx`, `Contact.test.jsx`. Plan 02-02 depends on plan 02-01 only insofar as it consumes the same section-id contract (D-09).
- **D-14:** Test files use `.test.jsx` extension (Phase 1 convention), colocated with the source. No `tests/` directory.

### Claude's Discretion
- Exact `data-testid` opt-in vs `container.querySelector` syntax — both reach the same node. Stick with `container.querySelector` to avoid touching production markup.
- Choice of stub child node in `Layout.test.jsx` (e.g., `<div data-testid="stub-child"/>` vs a literal text marker) — either works.
- Whether to use `userEvent` or `fireEvent` for any incidental click tests — Phase 2 doesn't need user interactions, so this only matters if a test grows.
- Whether to add an `afterEach(() => vi.restoreAllMocks())` in each test file or rely on Vitest's `restoreMocks: true` option — either is fine; the goal is no mock bleed between tests.

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project planning docs
- `.planning/PROJECT.md` — Project framing, Core Value, Key Decisions (Vitest, EmailJS mocking, HashRouter+MemoryRouter convention)
- `.planning/REQUIREMENTS.md` §"Routing & Layout" (ROUTE-01..04) and §"Page Smoke Tests" (PAGE-01..05) — the requirements this phase satisfies
- `.planning/ROADMAP.md` §"Phase 2: Routing & Page Smoke Tests" — Phase goal, 4 success criteria, and 2-plan split (02-01 routing+Layout, 02-02 per-page smoke)

### Prior phase artifacts to read
- `.planning/phases/01-test-infrastructure/01-CONTEXT.md` — Vitest config decisions, jest-dom + globals contract, ARIA-role assertion pattern, `Contact.jsx` uses `emailjs.sendForm` (not `send`) flag
- `.planning/phases/01-test-infrastructure/01-01-SUMMARY.md` — what Phase 1 actually shipped: Vitest 4.1.6, jsdom 29, `setupTests.js` reused, `App.test.jsx` smoke test (this will be replaced in Phase 2 per D-02)

### Files to modify (Phase 2 scope)
- `src/App.jsx` — refactor: export `function AppRoutes()` containing `<Layout><Routes>...</Routes></Layout>`; keep default `App` as `<HashRouter><AppRoutes/></HashRouter>`
- `src/App.test.jsx` — replace contents with route-table test (5 routes + 1 unknown path) using `<MemoryRouter><AppRoutes/></MemoryRouter>`

### Files to create (Phase 2 scope)
- `src/pages/Layout.test.jsx` — isolated Layout chrome + children pass-through test
- `src/pages/Home.test.jsx` — smoke + `typed.js` mock
- `src/pages/About.test.jsx` — smoke
- `src/pages/Resume.test.jsx` — smoke
- `src/pages/Portfolio.test.jsx` — smoke + `fetch` mock + `waitFor`
- `src/pages/Contact.test.jsx` — smoke + form-field assertions (no emailjs mock yet)

### Files to leave alone (Phase 2 scope guard)
- `vite.config.mjs`, `package.json` scripts, `src/setupTests.js` — Phase 1 territory, locked
- `src/main.jsx`, `src/App.css`, `src/index.css`, `src/reportWebVitals.js` — unrelated
- Page bodies (`Home.jsx`, `About.jsx`, `Resume.jsx`, `Portfolio.jsx`, `Contact.jsx`) — Phase 2 only adds *tests*; production page code is not modified beyond the tiny App.jsx refactor

### External docs (read for current syntax/options)
- React Testing Library — `render`, `screen`, `getByRole`, `getByText`, `waitFor`: https://testing-library.com/docs/react-testing-library/api
- react-router-dom v6 `MemoryRouter`: https://reactrouter.com/en/main/router-components/memory-router — confirms `initialEntries` is the supported way to drive a path
- Vitest mocking — `vi.mock`, `vi.spyOn`, `vi.fn`: https://vitest.dev/api/vi.html

No project-local ADRs exist (greenfield GSD init).

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/setupTests.js` — already registers `@testing-library/jest-dom` matchers globally. Phase 2 tests inherit `toBeInTheDocument()` etc. without any new imports.
- Vitest globals (`describe`, `it`, `expect`, `vi`, `beforeEach`, `afterEach`) — turned on in `vite.config.mjs` `test.globals`. Phase 1's `App.test.jsx` already uses them this way; Phase 2 continues the pattern.
- Section ids in production markup — already exist on every page (`#hero`, `#about`, `#resume`, `#portfolio`, `#contact`). No production change is required to support the D-09 selector strategy.

### Established Patterns
- **Colocated test files** — `Foo.jsx` → `Foo.test.jsx` (Phase 1 D-16). Phase 2 places `Home.test.jsx` etc. alongside the source in `src/pages/`.
- **ARIA-role assertions where they read naturally** — Phase 1 set this with `getByRole('banner')`. Phase 2 keeps it for `Layout.test.jsx`. Per-page tests fall back to `container.querySelector('#<section-id>')` because of the heading-text collision (D-09).
- **ESM + JSX** — `package.json` is `"type": "module"`; component files are `.jsx`. New tests follow the same convention.

### Integration Points
- **Routing in App.jsx:** `<App/>` mounts `<HashRouter>` directly, so `<App/>` cannot be wrapped in `<MemoryRouter>` (nested routers would conflict). The Phase 2 refactor splits this responsibility: `App` owns the production router; `AppRoutes` owns the route table. Tests address `AppRoutes` under `MemoryRouter`.
- **Layout nav links:** `Layout.jsx:30` builds `href_value = item === "About" ? "/" : identifier`. This means the "About" nav link points to `/` (home), not `/about`. The Layout test should assert this *current* behavior (link text "About" → `to="/"`), not what one might expect from the label. Flagged in `<deferred>` for future reconsideration.
- **typed.js side effect (Home):** `Home.jsx:18` calls `new Typed(this.el, options)` on a `<span>` ref that React fills in after the first render. With `typed.js` mocked to a no-op class, the assignment to `this.typed` still succeeds (it's an instance of the no-op class), and `componentWillUnmount` calls `destroy()` on the same instance. No null-guard needed.
- **fetch side effect (Portfolio):** `Portfolio.jsx:13` calls `fetch("assets/projects.json")` with a relative URL. In jsdom this would attempt a real fetch and fail (no network); mocking `global.fetch` per-test contains the surface area.
- **EmailJS in Contact.jsx:** `Contact.jsx:14` calls `emailjs.sendForm('service_eniwifa', 'contact_form', this.form.current, { publicKey: 'I-4RM4Z6x02jtxW5Z' })`. **Note for Phase 3 planning:** the real method is `sendForm`, not `send` as `REQUIREMENTS.md FORM-02` writes (already flagged in Phase 1 SUMMARY). Phase 2 does not invoke this path.

### Codebase facts worth flagging for later phases
- `Contact.jsx` has *static, always-rendered* `<div className="loading">Loading</div>`, `<div className="error-message">`, and `<div className="sent-message">Your message has been sent. Thank you!</div>`. There is no state-driven visibility today — they're CSS-toggled (or not toggled at all). **Phase 3 will need to either:** (a) add real state-driven visibility in `Contact.jsx` for FORM-04/FORM-05 (success/failure UI), or (b) assert visibility classes change. This is a Phase 3 problem; flagging here so the Phase 3 discuss/plan doesn't get surprised.
- Existing `App.test.jsx` from Phase 1 has only one `it("renders the Layout header without crashing")`. Phase 2's D-02 replaces the file's content entirely.

</code_context>

<specifics>
## Specific Ideas

- **AppRoutes export style:** Add `export function AppRoutes() { ... }` (named export, function declaration) alongside the existing `export default App`. Matches React idioms and lets the test import it as `import App, { AppRoutes } from './App'`.
- **One describe block per test file** — e.g., `describe('App routing', () => {...})` in `App.test.jsx`, `describe('Layout', () => {...})` in `Layout.test.jsx`, `describe('Home', () => {...})` in `Home.test.jsx`. Mirrors Phase 1's structure.
- **Routing test shape** — a `describe('App routing')` with one `it('renders Home at /')`, `it('renders About at /about')`, etc. Plus `it('renders Layout chrome but no page section on unknown route')` for ROUTE-04.
- **Use `render(<MemoryRouter initialEntries={[path]}><AppRoutes/></MemoryRouter>)` and destructure `{ container }`** for the section-id query. Then `screen.getByRole('banner')` for the chrome assertion.
- **For Portfolio**, prefer the explicit `await waitFor(() => expect(container.querySelector('#portfolio')).toBeInTheDocument())` pattern so the test won't false-pass before fetch resolves.

</specifics>

<deferred>
## Deferred Ideas

- **`Layout.jsx` "About" link points to `/`** (Layout.jsx:30) — likely intentional (treats `/` as the About-style landing page), but worth a sanity check in a future polish phase. Phase 2 locks the current behavior in the test.
- **Adding a real 404/NotFound page** — out of scope for this testing milestone; could be a future small UX phase. Phase 2 only locks the current "blank body with Layout chrome" behavior.
- **Coverage reporting (`@vitest/coverage-v8`) with thresholds** — deferred to v2 / QUAL-01.
- **CI workflow running `npm test` on PRs to `v2`** — deferred to v2 / QUAL-02.
- **a11y assertions (`jest-axe`)** — deferred to v2 / A11Y-01.
- **REQUIREMENTS.md FORM-02 says `emailjs.send`; code uses `emailjs.sendForm`** — typo fix and Phase 3 will mock `sendForm`. Not a Phase 2 action.
- **Resume page header text "About Me" vs page name "Resume"** — visible UX oddity, but production-content concern, not a testing one. Phase 2 just asserts `#resume`.
- **`Contact.jsx` success/error state is currently static DOM** — Phase 3 will need to introduce state-driven visibility (or assert class toggling) for FORM-04/05.

</deferred>

---

*Phase: 2-Routing & Page Smoke Tests*
*Context gathered: 2026-05-19*
