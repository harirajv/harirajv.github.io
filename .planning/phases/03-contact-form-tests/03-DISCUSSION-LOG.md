# Phase 3: Contact Form Tests - Discussion Log

> **Audit trail only.** Do not use as input to planning, research, or execution agents.
> Decisions are captured in CONTEXT.md — this log preserves the alternatives considered.

**Date:** 2026-05-19
**Phase:** 3-Contact Form Tests
**Areas discussed:** Success/failure UI strategy, user-event version, EmailJS mock strictness, Test file organization

---

## Success/failure UI strategy

### Q1: How should Contact.jsx signal success/failure so FORM-04/05 can be asserted?

| Option | Description | Selected |
|--------|-------------|----------|
| State-driven render | Convert Contact.jsx to track a status ('idle' \| 'sending' \| 'success' \| 'error') in React state. Conditionally render the loading/sent-message/error-message divs. Cleanest test surface; biggest prod-code delta but well-scoped. | ✓ |
| State-driven class toggle | Keep the divs always in the DOM but add a `show` class only when active, driven by React state. Less DOM churn; tests assert class presence. Requires the class to actually hide the divs (CSS edit too) for production correctness. | |
| No prod-code change | Leave Contact.jsx as-is. FORM-04/05 become call-path-only assertions; user never sees real feedback in prod. Cheapest, but tests nothing the user perceives. | |

**User's choice:** State-driven render
**Notes:** This unlocks proper FORM-04/05 assertions (`findByText` on appearing strings) and fixes a latent prod UX gap flagged in Phase 2's deferred bucket. Refactor stays small — class component shape preserved, just adds `state.status`.

### Q2: How should the status state be modeled?

| Option | Description | Selected |
|--------|-------------|----------|
| Single 'status' enum | `state.status = 'idle' \| 'sending' \| 'success' \| 'error'`. Mutually exclusive; one source of truth; easy to assert. | ✓ |
| Three booleans | `state.isLoading / isSuccess / isError`. Closer to existing 3-div structure; risk of inconsistent combinations. | |

**User's choice:** Single 'status' enum (Recommended)
**Notes:** Enum eliminates impossible combinations and matches conditional-render readability.

### Q3: On a rejected send, what does the error-message div contain?

| Option | Description | Selected |
|--------|-------------|----------|
| Generic fixed text | e.g., 'Failed to send. Please try again.' Hardcoded; test asserts that exact text. Deterministic; doesn't leak EmailJS internals. | ✓ |
| EmailJS error text | Render `err.text` from the rejection. More informative but exposes raw provider messages and couples test to mock payload shape. | |
| Empty div with error class | Keep the div empty (matches today) but only render on error. Cheapest, but user sees nothing meaningful on failure. | |

**User's choice:** Generic fixed text (Recommended)
**Notes:** "Failed to send. Please try again." is the locked copy.

### Q4: What happens to the form fields after a successful send?

| Option | Description | Selected |
|--------|-------------|----------|
| Reset the form | `this.form.current.reset()` on success. Standard contact-form UX; success state visually distinct. Test asserts inputs are empty after resolved send. | ✓ |
| Leave fields populated | No reset. User sees success message but text remains. Less prod change; test asserts only the success message. | |

**User's choice:** Reset the form (Recommended)
**Notes:** Reset is part of the success contract; FORM-04 will assert both the message and emptied inputs.

### Q5 (continuation): Continue or move on?

| Option | Description | Selected |
|--------|-------------|----------|
| More questions | One open thread: does the submit button disable during 'sending', and do we assert it? | ✓ |
| Next area | Locked enough; loading-state assertions at Claude's discretion. | |

**User's choice:** More questions — but a `<system-reminder>` immediately followed indicating "work without stopping for clarifying questions." Decision was made by Claude under that directive: disable submit button while `status === 'sending'`; whether the test asserts the disabled state is Claude's discretion (the 5 success criteria don't require it).

---

## user-event version

> No AskUserQuestion calls in this area — decision made by Claude under the "work without stopping" directive after the system-reminder fired.

| Option | Description | Selected |
|--------|-------------|----------|
| Stay on v13.5.0 (sync API) | No dep change. `userEvent.type(input, 'text')` returns synchronously. Older API; works fine for sync interactions. | |
| Bump to ^14.x (async API) | `await user.type/click`. Better fit for the promise-based submit flow + `waitFor`/`findBy*`. Phase 1's deferred bucket flagged this for Phase 3 to decide. | ✓ |

**User's choice (Claude under no-questions directive):** Bump to `^14.x`
**Notes:** Async API matches the test flow naturally; no other test file uses `user-event` yet, so migration cost is zero across the repo.

---

## EmailJS mock strictness

> No AskUserQuestion calls in this area — decision made by Claude under the "work without stopping" directive.

| Option | Description | Selected |
|--------|-------------|----------|
| 'Just called' | Assert `sendForm` was called at least once. Loosest. | |
| Form ref + values | Assert called exactly once, third arg is the form element, FormData read-back contains typed values. No service-ID/template-ID/publicKey assertions. | ✓ |
| Full args | Assert exact service ID, template ID, publicKey, form element. Strictest; couples tests to credentials. | |

**User's choice (Claude under no-questions directive):** Form ref + values
**Notes:** Catches "right args, wrong values" regressions without coupling tests to configuration that should be allowed to change independently. Also avoids parking credentials in test assertions.

---

## Test file organization

> No AskUserQuestion calls in this area — decision made by Claude under the "work without stopping" directive.

| Option | Description | Selected |
|--------|-------------|----------|
| Extend existing Contact.test.jsx | Add second `describe('Contact form interactions', ...)` block alongside the Phase 2 PAGE-05 smoke. Single file, shared imports, smaller inventory. | ✓ |
| Split into a second file | New `Contact.interaction.test.jsx`. Cleaner separation; more files to track; no real benefit at this scale. | |

**User's choice (Claude under no-questions directive):** Extend existing
**Notes:** Same component, same selectors (Phase 2 D-10), small file. One describe-block-per-concern is the established pattern from Phases 1 and 2.

---

## Claude's Discretion

- Whether to assert `expect(submitButton).toBeDisabled()` during the in-flight `sending` state. Useful but not in the 5 success criteria — add if it falls out naturally.
- Module-scope `vi.mock` vs per-test `vi.mock` — prefer module-scope (the Vitest idiom).
- `userEvent.setup()` location — `beforeEach` vs inline. Either fine.
- `findByText` vs `await waitFor(...)` — prefer `findByText` for terser tests.
- Whether to keep submit-button text as "Send Message" while disabled or switch to "Sending..." — keep stable to preserve a single `getByRole('button', { name: /send message/i })` selector across all 3 states.

## Deferred Ideas

- Asserting button-disabled state mid-flight — handy but optional (see D-05). Requires a controllable promise to be useful.
- Coverage reporting (`@vitest/coverage-v8`) — v2 / QUAL-01.
- CI workflow (`npm test` on PRs) — v2 / QUAL-02.
- a11y assertions (`jest-axe`) — v2 / A11Y-01.
- REQUIREMENTS.md FORM-02 typo (`emailjs.send` → `emailjs.sendForm`) — fix on next REQUIREMENTS edit; not a Phase 3 action.
- Cleanup of dead `.loading` / `.sent-message` / `.error-message` CSS rules — orthogonal to testing.
- Form-field HTML5 `required` validation tests — out of scope for FORM-01..05.
- Network/timeout edge cases — fulfillment/rejection is treated as binary here.
