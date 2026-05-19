# Phase 3: Contact Form Tests - Context

**Gathered:** 2026-05-19
**Status:** Ready for planning

<domain>
## Phase Boundary

Cover the contact form's interaction path end-to-end under Vitest: typing into every field, submitting, observing the mocked `emailjs.sendForm` call, and asserting success/failure feedback in the DOM. No real email leaves the test. Because `Contact.jsx`'s success/error/loading divs are currently static (Phase 2 flagged this as the Phase 3 problem), the phase includes a small, well-scoped production refactor to make those states state-driven and therefore assertable.

**In scope:**
- Convert `src/pages/Contact.jsx` from "static success/error divs always in DOM" to a state-driven UI: a single `status` enum ('idle' | 'sending' | 'success' | 'error') drives conditional rendering of the `loading` / `sent-message` / `error-message` divs, disables the submit button while sending, and resets the form on success.
- Add a generic, fixed error message string (e.g., `"Failed to send. Please try again."`) inside the `error-message` div on the rejected path.
- Extend `src/pages/Contact.test.jsx` with a second `describe('Contact form interactions', ...)` block covering FORM-01..05.
- Bump `@testing-library/user-event` from `^13.5.0` → `^14.x` in `package.json`. Use the v14 async API (`await user.type(...)`, `await user.click(...)`).
- Per-test `vi.mock('@emailjs/browser', ...)` providing a `sendForm` mock — `mockResolvedValueOnce` for the success test, `mockRejectedValueOnce` for the failure test.
- `waitFor` / `findBy*` for the post-submit assertions (success message appears, fields cleared; or error message appears).

**Out of scope for Phase 3:**
- Touching `vite.config.mjs`, `src/setupTests.js`, or any Phase 1/2 territory — locked.
- Touching pages other than `Contact.jsx` or tests other than `Contact.test.jsx`.
- Coverage reporting (`@vitest/coverage-v8`) → v2 / QUAL-01.
- CI workflow → v2 / QUAL-02.
- Accessibility assertions (`jest-axe`) → v2 / A11Y-01.
- Validating EmailJS env/credentials, swapping out EmailJS for another provider, or anything that changes production email delivery behavior.
- Asserting `emailjs.sendForm` call-site credentials (service ID, template ID, public key) — those are config, not behavior.

</domain>

<decisions>
## Implementation Decisions

### Success/failure UI strategy (production refactor)
- **D-01:** Convert `Contact.jsx`'s submit feedback to be **state-driven**. Add `this.state = { status: 'idle' }`. The submit handler sets `'sending'` synchronously before calling `emailjs.sendForm`, `'success'` in the `.then` resolve callback, and `'error'` in the reject callback. This is the cleanest test surface — assertions look at `getByText` / `queryByText` of stable strings, not at always-present DOM nodes.
- **D-02:** Use a **single `status` enum** with values `'idle' | 'sending' | 'success' | 'error'`. Mutually exclusive states match user mental model; one source of truth; no risk of `isSuccess && isError` inconsistencies. Reject the three-booleans alternative.
- **D-03:** Render the three feedback divs **conditionally** in `render()`:
  - `status === 'sending'` → `<div className="loading">Loading</div>`
  - `status === 'success'` → `<div className="sent-message">Your message has been sent. Thank you!</div>` (keep current success copy)
  - `status === 'error'` → `<div className="error-message">Failed to send. Please try again.</div>` (NEW generic copy; the error-message div is empty today)
  - Otherwise none of the three render.
- **D-04:** On a resolved `sendForm`, call `this.form.current.reset()` so inputs clear. The test asserts the inputs are empty after the resolved send, in addition to the success message being visible.
- **D-05:** While `status === 'sending'`, the submit button is **disabled** (`disabled={this.state.status === 'sending'}`). Prevents double-submit; the loading div renders alongside. Test may optionally assert the disabled attribute (Claude's discretion); primary success-criteria assertions remain typing → submit → mock call → success/error feedback.
- **D-06:** The error path renders **fixed, hardcoded text** (`"Failed to send. Please try again."`). Do NOT render `err.text` from the EmailJS rejection — that leaks provider internals to the user and couples the test to the mock's rejection-payload shape. The test asserts the literal string.

### Tooling
- **D-07:** Bump `@testing-library/user-event` to `^14.x` in `package.json` `dependencies`. Use the async API in tests: `const user = userEvent.setup()` followed by `await user.type(input, 'value')` and `await user.click(submitButton)`. Phase 1's `D-deferred-user-event-v14` is resolved here. Pin with `^` to match existing style.

### EmailJS mock strategy
- **D-08:** Mock `@emailjs/browser` per-test using `vi.mock('@emailjs/browser', () => ({ default: { sendForm: vi.fn() } }))`. No global mock in `setupTests.js` (Phase 2 D-04 stands). Each test sets the mock behavior just before submitting via `emailjs.sendForm.mockResolvedValueOnce(...)` or `.mockRejectedValueOnce(...)`. Vitest's `restoreMocks` (or an explicit `afterEach(() => vi.restoreAllMocks())`) keeps mocks from bleeding across tests.
- **D-09:** Assertion strictness on `sendForm`: assert **called exactly once** and that the **third argument is the actual form element** (`this.form.current` — the `<form>` node passed by the component). Spot-check the typed values via `new FormData(formArg).get('user_name')` etc. Do NOT assert the literal service ID (`service_eniwifa`), template ID (`contact_form`), or `publicKey` — those are configuration, not behavior, and coupling the test to them creates churn and leaks credentials into assertions.
- **D-10:** For the success test, use `mockResolvedValueOnce({ status: 200, text: 'OK' })`. For the failure test, use `mockRejectedValueOnce({ text: 'simulated error' })`. The shape mirrors EmailJS's real return/reject — close enough that the component's `.then(ok, err)` callbacks behave normally — but the test never asserts on these payload contents (per D-06).

### Test file organization
- **D-11:** **Extend the existing `src/pages/Contact.test.jsx`** with a second `describe('Contact form interactions', () => { ... })` block. Keep the Phase 2 `describe('Contact', () => { ... })` smoke (PAGE-05). Single file = easier to navigate, shared imports, smaller test-file inventory. Reject the "second file" alternative.
- **D-12:** Tests in the new describe block use `userEvent.setup()` once per test (or in a `beforeEach`), `render(<Contact/>)`, then `await user.type(...)` per field, `await user.click(submitButton)`, then `await screen.findByText(...)` for the post-submit feedback assertion. Selectors match Phase 2 D-10 — inputs by `name` attribute (`input[name="user_name"]`, etc.), submit button by accessible text "Send Message".
- **D-13:** Test cases (5 total, one per requirement):
  - FORM-01: types into all 4 fields, asserts each input's `.value` reflects the typed text.
  - FORM-02: types valid values, submits, asserts `emailjs.sendForm` was called once with the form element as 3rd arg, and FormData contains the typed values.
  - FORM-03: implicit in every test in this block — no test is allowed to omit the `vi.mock('@emailjs/browser')`; this is structural, not a separate test case.
  - FORM-04: mock resolves; asserts success message appears via `findByText(/has been sent/i)` AND that inputs are empty after the resolved send.
  - FORM-05: mock rejects; asserts error message appears via `findByText(/failed to send/i)`.
- **D-14:** Use `@testing-library/user-event` v14 idioms: `const user = userEvent.setup()`. Wrap async submit assertions in `findBy*` queries (auto-`waitFor`); do not use `fireEvent` for the typing/click path — only fall back to `fireEvent` if a particular interaction can't be expressed in `user-event`.

### Claude's Discretion
- Whether to assert `expect(submitButton).toBeDisabled()` during the in-flight sending state (would need a controllable promise that doesn't resolve immediately, e.g., a `new Promise(resolve => { resolveFn = resolve })` pattern). Useful but optional — not in the 5 success criteria. Add if it falls out naturally; skip if it'd complicate the test.
- Whether to consolidate the per-test `vi.mock('@emailjs/browser')` at the top of the file (one `vi.mock` at module scope, then `.mockResolvedValueOnce` / `.mockRejectedValueOnce` per test) vs duplicating per test. The module-scope pattern is the Vitest idiom; prefer it.
- Whether to put `userEvent.setup()` in a `beforeEach` or inline in each `it`. Either is fine.
- Whether to use `screen.findByText` vs `await waitFor(() => expect(screen.queryByText(...)).toBeInTheDocument())`. Prefer `findByText` for terser tests.
- The exact accessible name of the submit button after the disabled-attribute toggle — should remain "Send Message" (don't change to "Sending..." text on disable; the loading div carries the in-flight signal, button text staying stable keeps `getByRole('button', { name: /send message/i })` working across all 3 states).

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project planning docs
- `.planning/PROJECT.md` — Project framing, Core Value, Key Decisions (Vitest, "Mock EmailJS at the module boundary", per-test mocks, section-id selectors)
- `.planning/REQUIREMENTS.md` §"Contact Form" (FORM-01..05) — the requirements this phase satisfies. Note: FORM-02 says `emailjs.send`; the real API in `Contact.jsx` is `sendForm` — treat as typo (flagged in Phase 1 & 2).
- `.planning/ROADMAP.md` §"Phase 3: Contact Form Tests" — phase goal, 5 success criteria, single plan (03-01)

### Prior phase artifacts to read
- `.planning/phases/02-routing-page-smoke-tests/02-CONTEXT.md` — section-id strategy (D-09), field-by-`name`-attr selectors (D-10), per-test `vi.mock` pattern (D-04), and the flag in `<code_context>`/`<deferred>` that Contact.jsx success/error state is currently static DOM (the central problem this phase solves)
- `.planning/phases/01-test-infrastructure/01-CONTEXT.md` — Vitest config baseline (jsdom, globals, setupFiles), `Contact.jsx` uses `sendForm` not `send`, `@testing-library/user-event` v13→v14 bump deferred to Phase 3 (resolved here in D-07)

### Files to modify (Phase 3 scope)
- `src/pages/Contact.jsx` — refactor to state-driven status enum, conditional render of loading/sent/error divs, generic error copy, submit button disabled while sending, `this.form.current.reset()` on success
- `src/pages/Contact.test.jsx` — extend with `describe('Contact form interactions', ...)` block (FORM-01..05). Keep existing PAGE-05 smoke describe untouched.
- `package.json` — bump `@testing-library/user-event` to `^14.x`

### Files to leave alone (Phase 3 scope guard)
- `vite.config.mjs`, `src/setupTests.js`, `package.json` `test` scripts — Phase 1 territory, locked
- `src/App.jsx`, `src/App.test.jsx`, `src/pages/Layout.jsx`, `src/pages/Layout.test.jsx` — Phase 2 territory, locked
- `src/pages/{Home,About,Resume,Portfolio}.{jsx,test.jsx}` — unrelated to Phase 3
- `src/index.css`, `src/App.css` and any Contact-specific CSS — production styling is not a testing concern; the state-driven render obviates the CSS-based show/hide of `.loading`/`.sent-message`/`.error-message` (whose hide rules may or may not exist today; the conditional-render approach makes this moot)
- `src/main.jsx`, `src/reportWebVitals.js` — unrelated

### External docs (read for current syntax/options)
- EmailJS `sendForm` API: https://www.emailjs.com/docs/sdk/send-form/ — confirms signature `(serviceID, templateID, formElement, { publicKey })` and Promise return shape
- `@testing-library/user-event` v14: https://testing-library.com/docs/user-event/intro — async setup-and-use pattern, `userEvent.setup()`, `await user.type/click`
- v13 → v14 migration: https://github.com/testing-library/user-event/releases/tag/v14.0.0 — what changes vs v13
- Testing Library async utilities: https://testing-library.com/docs/dom-testing-library/api-async/ — `findBy*`, `waitFor`, when each is appropriate
- Vitest mocking: https://vitest.dev/api/vi.html — `vi.mock`, `mockResolvedValueOnce`, `mockRejectedValueOnce`, `restoreMocks`

No project-local ADRs exist (greenfield GSD init).

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/setupTests.js` — already registers `@testing-library/jest-dom`. Phase 3 interaction tests inherit `toBeInTheDocument()`, `toHaveValue()`, `toBeDisabled()` matchers without new imports.
- `@testing-library/react` (already v13), Vitest globals — same as Phase 2; new tests follow the same import patterns.
- Phase 2's `Contact.test.jsx` `describe('Contact', ...)` smoke — kept as-is; the new interaction describe block is added below it, sharing `import { render, screen } from '@testing-library/react'` and `import Contact from './Contact'`. Add `import userEvent from '@testing-library/user-event'` for the new block.
- Form-field `name` attributes on `Contact.jsx`'s inputs (`user_name`, `user_email`, `subject`, `message`) — already the established selector convention from Phase 2 D-10. Reuse them.

### Established Patterns
- **Per-test mocks via `vi.mock(...)` / `vi.spyOn(...)`** — Phase 2 D-04. Phase 3 follows: `vi.mock('@emailjs/browser', ...)` at module scope, `mockResolvedValueOnce` / `mockRejectedValueOnce` per test.
- **Colocated `.test.jsx`** — Phase 1 D-16/D-17. Phase 3 extends `src/pages/Contact.test.jsx`.
- **Section-id selectors** — Phase 2 D-09. Already used by the existing Contact smoke; carried into the interaction block where needed (e.g., to assert `#contact` is in the DOM at start).
- **No CSS imported by tests** — Phase 1 D-08, default Vitest behavior. Visibility assertions therefore cannot rely on `display: none`; this is exactly why D-01 (state-driven conditional render) is the right call — `queryByText` returns null when the element is not rendered, regardless of CSS.
- **One `describe` per concern in a file** — Phase 1 / Phase 2 convention. Phase 3 adds one more `describe` to `Contact.test.jsx`.

### Integration Points
- **`Contact.jsx:14`**: `emailjs.sendForm('service_eniwifa', 'contact_form', this.form.current, { publicKey: 'I-4RM4Z6x02jtxW5Z' })`. The third argument is the form DOM node (via `React.createRef()`). The mock test asserts that argument is the actual form element by reference (or via `instanceof HTMLFormElement` + FormData read-back), not by deep structural comparison.
- **`Contact.jsx` class component**: uses `React.createRef()` for `this.form`. The refactor adds `this.state = { status: 'idle' }` and `this.setState(...)` calls. No conversion to function component / hooks — keep the class shape. The Phase 2 smoke test still works because the section-id and form fields don't change.
- **`Contact.jsx` static feedback divs** (today: lines 67–69): replaced by conditional render based on `this.state.status`. The Phase 2 smoke test (`Contact.test.jsx` line 7: `expect(container.querySelector('#contact')).toBeInTheDocument()`) still passes because `#contact` is on the `<section>`, not the feedback divs. The Phase 2 smoke does NOT currently assert any of `loading`/`error-message`/`sent-message` exist — verified during scout — so removing them from the idle render does not break Phase 2's smoke.
- **Submit handler error path** (today: `(err) => { console.error('Failed...', err.text) }`): the refactor replaces `console.error` with `this.setState({ status: 'error' })`. The console-log on success is similarly replaced.
- **`@testing-library/user-event` v13 → v14 bump**: existing test code in the repo doesn't import `user-event` yet (Phase 2 used `container.querySelector` and `fireEvent` only). Zero migration cost across other test files.

### Codebase facts worth flagging
- The existing `.loading`, `.error-message`, `.sent-message` CSS classes in production stylesheets may have visibility rules tied to a parent class (e.g., `.php-email-form.sent .sent-message { display: block }`). With state-driven conditional render, those rules no longer fire and don't need to. Production CSS does not need to change; the divs just won't render at all in `idle` state. If a future polish phase wants to keep CSS-driven transitions (fade-in), it can re-introduce class-toggling — but that's deferred.
- `Contact.jsx` does NOT import its own CSS file (it relies on global `App.css` / Bootstrap). No CSS module concerns.

</code_context>

<specifics>
## Specific Ideas

- **Status enum shape**: prefer string literal union for readability — `status: 'idle' | 'sending' | 'success' | 'error'`. Initialize to `'idle'`. The submit handler does `this.setState({ status: 'sending' })` before the `emailjs.sendForm(...)` call (synchronous flip so the loading state is visible immediately under tests' `await user.click(...)`).
- **Success copy**: keep existing string `"Your message has been sent. Thank you!"` so the change is purely structural (was-static, now-conditional).
- **Error copy**: `"Failed to send. Please try again."` — short, generic, user-actionable. Used as the literal `findByText` target in FORM-05.
- **Test pattern (preferred)**:
  ```js
  vi.mock('@emailjs/browser', () => ({
    default: { sendForm: vi.fn() }
  }));
  import emailjs from '@emailjs/browser';

  describe('Contact form interactions', () => {
    beforeEach(() => vi.restoreAllMocks());

    it('FORM-04: shows success message after a resolved send', async () => {
      emailjs.sendForm.mockResolvedValueOnce({ status: 200, text: 'OK' });
      const user = userEvent.setup();
      render(<Contact />);
      await user.type(screen.getByPlaceholderText(/your name/i), 'Hari');
      // ...
      await user.click(screen.getByRole('button', { name: /send message/i }));
      expect(await screen.findByText(/has been sent/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/your name/i)).toHaveValue('');
    });
  });
  ```
  (Selectors here use placeholder for readability of the example; the actual tests prefer `name`-attr `querySelector` per Phase 2 D-10. Either works — placeholder is acceptable when it doesn't churn.)
- **Mock placement**: the `vi.mock('@emailjs/browser')` call MUST be at module scope (top of the test file), not inside `describe`/`beforeEach`. Vitest hoists `vi.mock` regardless, but writing it at the top is the explicit idiom.
- **Form-element argument check**: `expect(emailjs.sendForm).toHaveBeenCalledWith(expect.any(String), expect.any(String), expect.any(HTMLFormElement), expect.any(Object))` + a follow-up read-back of FormData from the captured call: `const formArg = emailjs.sendForm.mock.calls[0][2]; expect(new FormData(formArg).get('user_name')).toBe('Hari');`. This catches "right args, wrong values" regressions without coupling to credentials.

</specifics>

<deferred>
## Deferred Ideas

- **Asserting button-disabled state during in-flight `sending`** — handy but not in the 5 success criteria; Claude's discretion (D-05). If implemented, use a controllable promise that doesn't resolve synchronously.
- **Coverage reporting (`@vitest/coverage-v8`) with thresholds** — deferred to v2 / QUAL-01.
- **CI workflow (`npm test` on PRs to `v2`)** — deferred to v2 / QUAL-02.
- **a11y assertions (`jest-axe`)** — deferred to v2 / A11Y-01.
- **REQUIREMENTS.md FORM-02 wording fix** (`emailjs.send` → `emailjs.sendForm`) — typo carried across Phases 1, 2, and 3. Worth fixing on next REQUIREMENTS edit, but not a Phase 3 action.
- **CSS cleanup of `.loading`/`.sent-message`/`.error-message` rules** — orthogonal to testing. The state-driven conditional render means those CSS rules are dead code; a future polish phase can remove them.
- **Form-field validation tests** (e.g., asserting the `required` HTML5 validation blocks submit when fields are empty) — not in FORM-01..05; would be a tightening pass in a future milestone.
- **Network/timeout tests** (slow EmailJS, no-response handling) — not in scope; the mocked-promise contract treats fulfillment/rejection as binary.

</deferred>

---

*Phase: 3-Contact Form Tests*
*Context gathered: 2026-05-19*
