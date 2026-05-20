---
phase: 03-contact-form-tests
plan: 01
subsystem: testing
tags: [testing, react, vitest, user-event, emailjs, contact-form]

requires:
  - phase: 01-test-infrastructure
    provides: Vitest config (jsdom env, globals, setupFiles), jest-dom matchers
  - phase: 02-routing-page-smoke-tests
    provides: PAGE-05 Contact smoke (section id + name-attr selector contract), per-test vi.mock convention
provides:
  - State-driven Contact.jsx with status enum ('idle' | 'sending' | 'success' | 'error')
  - Conditional render of loading/success/error feedback divs
  - form.current.reset() on resolved send (clears inputs + incidental privacy benefit)
  - Submit-button disabled during in-flight send
  - 4 Contact form interaction tests (FORM-01, FORM-02, FORM-04, FORM-05) appended to Contact.test.jsx
  - @testing-library/user-event v14 async API in the project (userEvent.setup() + await user.type/click)
  - vi.mock('@emailjs/browser') module-scope mock pattern for default-imported SDK
affects: [future contact-form polish, future a11y assertions, future coverage reporting]

tech-stack:
  added: ["@testing-library/user-event@^14.5.2 (bumped from ^13.5.0; resolved 14.6.1)"]
  patterns:
    - "Status-enum-driven conditional render (single source of truth for UI state)"
    - "Module-scope vi.mock for default-imported SDKs with { default: { ... } } shape"
    - "FormData read-back from captured mock-call form argument for value verification"
    - "Never-resolving promise to test in-flight call args without triggering post-resolve side effects"
    - "user-event v14 async setup-and-use idiom"

key-files:
  created: []
  modified:
    - src/pages/Contact.jsx
    - src/pages/Contact.test.jsx
    - package.json
    - package-lock.json

key-decisions:
  - "State-driven status enum (D-02): single 'status' field with 4 values, rejected three-booleans alternative"
  - "Fixed generic error copy 'Failed to send. Please try again.' (D-06): no err.text leak to user or console"
  - "Module-scope vi.mock('@emailjs/browser') (D-08): { default: { sendForm: vi.fn() } } shape matches default-import contract"
  - "Test does not assert literal EmailJS credentials (D-09): expect.any(String) + FormData read-back, not service/template/publicKey literals"
  - "Submit button text remains 'Send Message' across all status values (D-discretion): keeps getByRole accessible-name selector stable"
  - "FORM-02 uses never-resolving promise: prevents form.current.reset() from clearing inputs before FormData read-back"

patterns-established:
  - "Status-enum-driven UI state: this.state = { status: 'idle' | 'sending' | 'success' | 'error' }"
  - "Conditional render: {this.state.status === 'X' && <div .../>} short-circuit per status"
  - "Module-scope vi.mock + per-test mockResolvedValueOnce / mockRejectedValueOnce"
  - "FormData(formArg).get('field_name') for value verification without coupling to call-site config"

requirements-completed: [FORM-01, FORM-02, FORM-03, FORM-04, FORM-05]

duration: 2min 31s
completed: 2026-05-20
---

# Phase 3 Plan 1: Contact Form Tests Summary

**State-driven Contact form refactor + 4 user-event v14 interaction tests covering FORM-01..05 with a mocked @emailjs/browser SDK**

## Performance

- **Duration:** 2m 31s
- **Started:** 2026-05-20T02:26:44Z
- **Completed:** 2026-05-20T02:29:15Z
- **Tasks:** 3
- **Files modified:** 4

## Accomplishments
- Refactored `Contact.jsx` from "static success/error divs always in DOM" to a status-enum-driven conditional render — feedback states are now assertable and the in-flight state is reachable via the loading div + disabled submit button
- Removed pre-existing console logging (`console.log('Success')`, `console.error('Failed...', err.text)`) — closes T-03-01 information disclosure (err.text no longer leaks to console)
- Bumped `@testing-library/user-event` from `^13.5.0` → `^14.5.2` (resolved 14.6.1); resolved Phase 1's deferred user-event v14 migration
- Added 4 async interaction tests covering FORM-01 (typing), FORM-02 (sendForm called once with HTMLFormElement carrying typed FormData), FORM-04 (success message + cleared inputs on resolved send), FORM-05 (error message on rejected send); FORM-03 satisfied structurally by module-scope `vi.mock('@emailjs/browser')`
- Full Vitest suite green: 7 test files, 18 tests passing — Phase 1 setup, Phase 2 routing + 5 page smokes + Layout test, preserved Phase 2 PAGE-05 Contact smoke, and 4 new Phase 3 FORM tests

## Task Commits

Each task was committed atomically:

1. **Task 1: Refactor Contact.jsx to state-driven status enum** — `7feb76c` (refactor)
2. **Task 2: Bump @testing-library/user-event to ^14.5.2** — `905357e` (chore)
3. **Task 3: Add Contact form interaction tests (FORM-01/02/04/05)** — `0d49e15` (test)

**Plan metadata commit:** (this commit) — docs: complete plan

## Files Created/Modified
- `src/pages/Contact.jsx` — Refactored to state-driven status enum: constructor initializes `status: 'idle'`; onSubmit transitions `idle → sending → (success | error)`; feedback divs render conditionally on `status`; `form.current.reset()` runs on success; submit button disabled while sending; production console logging removed; all Phase 2 selector contracts (section id, form ref, input `name` attrs, button name) and EmailJS call signature preserved verbatim.
- `src/pages/Contact.test.jsx` — Appended `describe('Contact form interactions', ...)` with 4 tests; added `import userEvent from '@testing-library/user-event'`, module-scope `vi.mock('@emailjs/browser', () => ({ default: { sendForm: vi.fn() } }))`, and `import emailjs from '@emailjs/browser'`. Phase 2 `describe('Contact', ...)` PAGE-05 smoke preserved verbatim.
- `package.json` — Single line change: `@testing-library/user-event` pin moved from `^13.5.0` to `^14.5.2` in `dependencies`.
- `package-lock.json` — Regenerated via `npm install`; resolved version is `14.6.1`.

## Decisions Made

All implementation decisions followed CONTEXT D-01 through D-14 as locked. One execution-time refinement:

- **FORM-02 uses a never-resolving promise (`mockReturnValueOnce(new Promise(() => {}))`)** instead of `mockResolvedValueOnce(...)`. Rationale: with a resolved mock, the success path's `form.current.reset()` runs before FormData read-back, leaving the form empty. A never-resolving promise keeps the form in its post-type state so the captured form-element argument still carries the typed values. This pattern is the standard Vitest/Jest idiom for "stuck in-flight" assertions. It also means FORM-02 stays in the `sending` UI state and never reaches `success` — which is exactly what we want when asserting call args, not post-resolve UI.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] FORM-02 captured FormData was empty after success-path reset**
- **Found during:** Task 3 (interaction tests)
- **Issue:** The plan's FORM-02 design used `mockResolvedValueOnce(...)` and awaited `findByText(/has been sent/i)` before reading back FormData from the captured mock-call form element. But `form.current.reset()` (called on success per D-04) cleared the form's inputs before the FormData read-back ran, so all `fd.get(...)` calls returned empty strings and the assertion `expect(fd.get('user_name')).toBe('Hari')` failed.
- **Fix:** Switched FORM-02's mock to `emailjs.sendForm.mockReturnValueOnce(new Promise(() => {}))` — a never-resolving promise that prevents the success path from running, leaving the form's input values intact for FormData read-back. Removed the now-unneeded `await screen.findByText(/has been sent/i)` from FORM-02; the success-message-after-resolve assertion remains in FORM-04 where it belongs. FORM-04 still uses `mockResolvedValueOnce(...)` for the success path; FORM-05 still uses `mockRejectedValueOnce(...)` for the error path — only FORM-02 changed.
- **Files modified:** src/pages/Contact.test.jsx
- **Verification:** Re-ran `npm test`: 7 test files / 18 tests, all passing.
- **Committed in:** 0d49e15 (Task 3 commit — the fix was applied before the task was committed)

---

**Total deviations:** 1 auto-fixed (Rule 3 - Blocking)
**Impact on plan:** Pure test-design fix; no scope change, no requirement change, no production-code change. All 5 FORM requirements remain covered by the originally planned 4 tests. FORM-03 is still satisfied structurally by the module-scope `vi.mock('@emailjs/browser')`.

## Issues Encountered

- React `act()` warning surfaced briefly during the failing FORM-02 run (logged twice to stderr). This was a downstream symptom of the FormData read-back failing — the test was tearing down before the post-submit setState had flushed. The Rule 3 fix (never-resolving promise + dropping the unneeded `findByText` wait) resolved both the assertion failure and the `act()` warning. The final suite produces no `act()` warnings.

## Threat Flags

No new threat surface beyond what the plan's `<threat_model>` documented. Key outcomes:
- T-03-01 (Information Disclosure on error path): mitigated as planned — `console.error('Failed...', err.text)` removed; user sees only the fixed generic copy `"Failed to send. Please try again."`.
- T-03-02 (Information Disclosure in test fixtures): mitigated as planned — `Contact.test.jsx` does NOT contain `service_eniwifa` or `I-4RM4Z6x02jtxW5Z`; FORM-02 asserts via `expect.any(String/HTMLFormElement/Object)` + `new FormData(formArg)` read-back.
- T-03-03 (Pre-existing hardcoded credentials in `Contact.jsx:16`): accepted, out of scope, preserved verbatim per D-09.
- T-03-04 (Incidental privacy benefit of form reset on success): in effect — `form.current.reset()` clears all inputs after a successful send.
- T-03-SC (Supply chain on `@testing-library/user-event` v14 bump): clean — `[KNOWN]` package from the testing-library org, resolved to 14.6.1 via the existing org's package, lockfile regenerated for an auditable diff.

## User Setup Required

None — no external service configuration required. EmailJS credentials remain hardcoded in `Contact.jsx` per pre-existing posture (T-03-03 accepted in plan's threat model).

## Next Phase Readiness

- v1 testing milestone is complete after this plan: `npm test` exits 0 against all 19 v1 requirements (INFRA-01..05, ROUTE-01..04, PAGE-01..05, FORM-01..05).
- No blockers for the v2 milestone backlog (QUAL-01 coverage reporting, QUAL-02 CI workflow, A11Y-01 jest-axe, A11Y-02 keyboard nav).
- Deferred items from Phase 1 that this plan resolves: `D-deferred-user-event-v14` (user-event v13 → v14 bump) — now closed.

## Self-Check: PASSED

Verified before writing this section:
- src/pages/Contact.jsx: FOUND (modified, committed in 7feb76c)
- src/pages/Contact.test.jsx: FOUND (modified, committed in 0d49e15)
- package.json: FOUND (modified, committed in 905357e)
- package-lock.json: FOUND (modified, committed in 905357e)
- Commit 7feb76c: FOUND in git log
- Commit 905357e: FOUND in git log
- Commit 0d49e15: FOUND in git log
- `npm test` exits 0 with 7 test files / 18 tests passing

---
*Phase: 03-contact-form-tests*
*Completed: 2026-05-20*
