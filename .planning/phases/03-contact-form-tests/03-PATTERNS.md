# Phase 3: Contact Form Tests - Pattern Map

**Mapped:** 2026-05-19
**Files analyzed:** 3
**Analogs found:** 3 / 3

## File Classification

| New/Modified File | Role | Data Flow | Closest Analog | Match Quality |
|-------------------|------|-----------|----------------|---------------|
| `src/pages/Contact.jsx` | component (class) | event-driven (form submit + async promise) | self (in-place refactor) | exact (self) |
| `src/pages/Contact.test.jsx` | test (extension) | event-driven async test | `src/pages/Portfolio.test.jsx` (async mock + waitFor) + `src/pages/Home.test.jsx` (`vi.mock` shape) | role-match (compose two analogs) |
| `package.json` | config (dependency bump) | n/a | self (already contains `@testing-library/user-event`) | exact (self) |

---

## Pattern Assignments

### `src/pages/Contact.jsx` (component, event-driven submit)

**Analog:** `src/pages/Contact.jsx` itself — this is an in-place refactor. The executor MUST read the current file in full before editing. Preserve class-component shape, ref-based form access, and the EmailJS call signature; ONLY change state handling and the three feedback divs.

**Current imports** (lines 1-3 — keep as-is, no new imports needed):
```jsx
import React from "react";
import { Envelope, GeoAlt, Phone } from "react-bootstrap-icons";
import emailjs from "@emailjs/browser";
```

**Current class scaffold** (lines 5-9 — extend `constructor` with `this.state`):
```jsx
export default class Contact extends React.Component {
    constructor(props) {
        super(props);
        this.form = React.createRef();
    }
```

Refactor target: add `this.state = { status: 'idle' };` inside the constructor.

**Current submit handler** (lines 11-19 — this is the central refactor surface):
```jsx
onSubmit = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_eniwifa', 'contact_form', this.form.current, { publicKey: 'I-4RM4Z6x02jtxW5Z'})
        .then(
            () => { console.log('Success') },
            (err) => { console.error('Failed...', err.text) }
        );
}
```

Refactor target (per CONTEXT D-01/D-04/D-06):
- Call `this.setState({ status: 'sending' })` synchronously BEFORE `emailjs.sendForm(...)`.
- Replace `console.log('Success')` with `this.setState({ status: 'success' }); this.form.current.reset();`.
- Replace `console.error(...)` with `this.setState({ status: 'error' })`. Do NOT render `err.text`.
- Keep the `sendForm` argument list verbatim — credentials are config, not behavior (CONTEXT D-09).

**Current static feedback divs** (lines 66-70 — REPLACE with conditional render):
```jsx
<div className="my-3">
    <div className="loading">Loading</div>
    <div className="error-message"></div>
    <div className="sent-message">Your message has been sent. Thank you!</div>
</div>
```

Refactor target (per CONTEXT D-03):
```jsx
<div className="my-3">
    {this.state.status === 'sending' && <div className="loading">Loading</div>}
    {this.state.status === 'error' && <div className="error-message">Failed to send. Please try again.</div>}
    {this.state.status === 'success' && <div className="sent-message">Your message has been sent. Thank you!</div>}
</div>
```

**Current submit button** (line 71 — add `disabled` per CONTEXT D-05):
```jsx
<div className="text-center"><button type="submit">Send Message</button></div>
```

Refactor target — `disabled={this.state.status === 'sending'}`. Button text stays `Send Message` (CONTEXT Discretion bullet).

**Form ref usage** (line 51 — DO NOT TOUCH):
```jsx
<form className="php-email-form" ref={this.form} onSubmit={this.onSubmit}>
```

Untouched contract — Phase 2 PAGE-05 smoke and Phase 3 FORM-02 (3rd-arg-is-form-element assertion) both depend on `this.form.current` resolving to this `<form>` node.

**Section id contract** (line 24 — DO NOT TOUCH):
```jsx
<section id="contact" className="contact">
```

Phase 2 PAGE-05 smoke asserts `container.querySelector('#contact')`. Section id MUST remain `#contact`.

**Input `name` attributes** (lines 54, 57, 61, 64 — DO NOT TOUCH):
```jsx
<input type="text" name="user_name" .../>
<input type="email" name="user_email" .../>
<input type="text" name="subject" .../>
<textarea name="message" .../>
```

Phase 2 D-10 / Phase 3 D-12 selector contract — interaction tests query these by `name` attr.

---

### `src/pages/Contact.test.jsx` (test, event-driven async)

**Existing content to PRESERVE** (lines 1-14 — the Phase 2 PAGE-05 smoke; the new describe block is appended BELOW this, sharing imports):
```jsx
import { render, screen } from '@testing-library/react';
import Contact from './Contact';

describe('Contact', () => {
  it('renders the contact form with all required fields and a submit button', () => {
    const { container } = render(<Contact />);
    expect(container.querySelector('#contact')).toBeInTheDocument();
    expect(container.querySelector('input[name="user_name"]')).toBeInTheDocument();
    expect(container.querySelector('input[name="user_email"]')).toBeInTheDocument();
    expect(container.querySelector('input[name="subject"]')).toBeInTheDocument();
    expect(container.querySelector('textarea[name="message"]')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Send Message/i })).toBeInTheDocument();
  });
});
```

Per CONTEXT D-11, this `describe('Contact', ...)` block stays untouched. Phase 3 appends a second `describe('Contact form interactions', ...)` block below it.

**Imports to ADD at top of file** (extend the existing import block):
```jsx
import userEvent from '@testing-library/user-event';
```

(Vitest globals `vi`, `describe`, `it`, `expect`, `beforeEach` come from `test.globals: true` in `vite.config.mjs` — no import needed. `@testing-library/jest-dom` matchers come from `setupTests.js` — no import needed.)

---

#### Analog A — `src/pages/Home.test.jsx` (canonical `vi.mock` shape)

**Module-scope `vi.mock` pattern** (lines 4-6 — mirror this exact placement and shape):
```jsx
vi.mock('typed.js', () => ({
  default: class { constructor() {} destroy() {} }
}));
```

Phase 3 equivalent (per CONTEXT D-08, place at top of file BELOW the imports, BEFORE any `describe`):
```jsx
vi.mock('@emailjs/browser', () => ({
  default: { sendForm: vi.fn() }
}));
import emailjs from '@emailjs/browser';
```

Key parallel: `Contact.jsx` does `import emailjs from "@emailjs/browser"` (default import), so the mock shape is `default: { sendForm: vi.fn() }` — same `default:` key as the typed.js mock. Vitest hoists `vi.mock` above imports automatically; explicit top-of-file placement is the idiom.

---

#### Analog B — `src/pages/Portfolio.test.jsx` (async + `beforeEach`/`afterEach` mock lifecycle + `waitFor`)

**`beforeEach` / `afterEach` mock lifecycle** (lines 5-14 — mirror the restore pattern):
```jsx
describe('Portfolio', () => {
  beforeEach(() => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ projects: [] })
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders the portfolio section after fetch resolves', async () => {
    ...
  });
});
```

Phase 3 equivalent — `beforeEach(() => vi.restoreAllMocks())` (per CONTEXT D-08 / Discretion bullet on module-scope `vi.mock` + per-test `.mockResolvedValueOnce` / `.mockRejectedValueOnce`). Do NOT use `vi.spyOn(global, 'fetch')` — that's Portfolio-specific. Phase 3 uses module-scope `vi.mock('@emailjs/browser', ...)` and reaches into the imported mock with `emailjs.sendForm.mockResolvedValueOnce(...)`.

**Async test signature + RTL async assertion** (lines 16-19 — mirror `async` + waitFor; for Phase 3 prefer `findByText` per CONTEXT D-14):
```jsx
it('renders the portfolio section after fetch resolves', async () => {
    const { container } = render(<Portfolio />);
    await waitFor(() => expect(container.querySelector('#portfolio')).toBeInTheDocument());
});
```

Phase 3 equivalent — `async` `it`, `render(<Contact />)`, `await user.type(...)` per field, `await user.click(...)` on submit button, then `expect(await screen.findByText(/has been sent/i)).toBeInTheDocument()`. `findByText` auto-`waitFor`s; no explicit `waitFor` wrapper needed.

---

#### Composite test shape for the new `describe('Contact form interactions', ...)` block

Drawn from CONTEXT `<specifics>` lines 145-167 and the two analogs above. This is the pattern executors mirror for FORM-01..05:

```jsx
describe('Contact form interactions', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('FORM-04: shows success message after a resolved send and clears inputs', async () => {
    emailjs.sendForm.mockResolvedValueOnce({ status: 200, text: 'OK' });
    const user = userEvent.setup();
    const { container } = render(<Contact />);

    const nameInput = container.querySelector('input[name="user_name"]');
    await user.type(nameInput, 'Hari');
    // ... type into user_email, subject, message ...

    await user.click(screen.getByRole('button', { name: /send message/i }));

    expect(await screen.findByText(/has been sent/i)).toBeInTheDocument();
    expect(nameInput).toHaveValue('');
  });

  it('FORM-02: calls emailjs.sendForm exactly once with the form element', async () => {
    emailjs.sendForm.mockResolvedValueOnce({ status: 200, text: 'OK' });
    const user = userEvent.setup();
    const { container } = render(<Contact />);
    // ... type into all 4 fields ...
    await user.click(screen.getByRole('button', { name: /send message/i }));

    expect(emailjs.sendForm).toHaveBeenCalledTimes(1);
    expect(emailjs.sendForm).toHaveBeenCalledWith(
      expect.any(String),
      expect.any(String),
      expect.any(HTMLFormElement),
      expect.any(Object)
    );
    const formArg = emailjs.sendForm.mock.calls[0][2];
    expect(new FormData(formArg).get('user_name')).toBe('Hari');
  });

  it('FORM-05: shows error message after a rejected send', async () => {
    emailjs.sendForm.mockRejectedValueOnce({ text: 'simulated error' });
    const user = userEvent.setup();
    render(<Contact />);
    // ... type into all 4 required fields (form requires them all) ...
    await user.click(screen.getByRole('button', { name: /send message/i }));

    expect(await screen.findByText(/failed to send/i)).toBeInTheDocument();
  });
});
```

Selector pattern (per CONTEXT D-12, Phase 2 D-10): `container.querySelector('input[name="..."]')` for inputs, `screen.getByRole('button', { name: /send message/i })` for submit. Required-field caveat: the form fields all have `required` HTML5 attributes, so EVERY interaction test that submits must type into all 4 fields, or use `noValidate` workaround (latter is out-of-scope — just fill all fields).

---

### `package.json` (config, dependency bump)

**Analog:** `package.json` itself.

**Current `@testing-library/user-event` pin** (line 11 — bump per CONTEXT D-07):
```json
"@testing-library/user-event": "^13.5.0",
```

Refactor target — change to `"@testing-library/user-event": "^14.x"` (use the latest v14 release; pin with `^` per existing style). Located in `dependencies`, not `devDependencies` — leave it in `dependencies` (preserve existing position per CONTEXT D-07: "Pin with `^` to match existing style").

**Verify after bump** — `package-lock.json` will be regenerated; `npm install` is required before running `npm test`. No other lines in `package.json` change.

---

## Shared Patterns

### Vitest globals (no imports needed)

**Source:** `vite.config.mjs` lines 13-17 — `test.globals: true` makes `describe`, `it`, `expect`, `vi`, `beforeEach`, `afterEach` ambient.
**Apply to:** `src/pages/Contact.test.jsx` (new describe block uses `vi`, `beforeEach`, `describe`, `it`, `expect` without imports).

```jsx
test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/setupTests.js']
}
```

### jest-dom matchers (no imports needed)

**Source:** `src/setupTests.js` line 5 — side-effect `import '@testing-library/jest-dom'` registers `toBeInTheDocument`, `toHaveValue`, `toBeDisabled` on `expect` globally.
**Apply to:** `src/pages/Contact.test.jsx` interaction block — uses `toBeInTheDocument()`, `toHaveValue('')`, optionally `toBeDisabled()`.

```jsx
import '@testing-library/jest-dom';
```

### Section-id selector convention (Phase 2 D-09)

**Source:** `src/pages/Contact.test.jsx` line 7 — `container.querySelector('#contact')`.
**Apply to:** Existing Phase 2 smoke (PAGE-05) — already in place, do not regress. The state-driven refactor must keep `<section id="contact">` intact so this selector continues to resolve.

### Field-by-`name`-attr selector convention (Phase 2 D-10)

**Source:** `src/pages/Contact.test.jsx` lines 8-11 — `container.querySelector('input[name="user_name"]')`, etc.
**Apply to:** All FORM-01..05 interaction tests in the new describe block. Use the same `name`-attr selectors when calling `user.type(...)` and when asserting `.toHaveValue('')` after a resolved send.

### Per-test `vi.mock` / mock lifecycle (Phase 2 D-04, Phase 3 D-08)

**Source (mock shape):** `src/pages/Home.test.jsx` lines 4-6 — module-scope `vi.mock('typed.js', () => ({ default: class { ... } }))`.
**Source (lifecycle):** `src/pages/Portfolio.test.jsx` lines 5-14 — `beforeEach` sets mock, `afterEach(() => vi.restoreAllMocks())` cleans up.
**Apply to:** New `describe('Contact form interactions', ...)` block. Module-scope `vi.mock('@emailjs/browser', ...)` once, `mockResolvedValueOnce` / `mockRejectedValueOnce` per test, `beforeEach(() => vi.restoreAllMocks())` to prevent bleed.

### Async test shape (RTL)

**Source:** `src/pages/Portfolio.test.jsx` lines 16-19 — `async () => { ... await waitFor(...) }`.
**Apply to:** All 5 FORM tests are async. Prefer `await screen.findByText(...)` (auto-waitFor) for post-submit feedback over explicit `waitFor` wrappers (CONTEXT D-14).

### user-event v14 setup-and-use idiom (Phase 3 D-07/D-14)

**Source:** Not yet in codebase — this is the v14 bump payload. Canonical shape:
```jsx
const user = userEvent.setup();
await user.type(input, 'value');
await user.click(button);
```
**Apply to:** Every FORM-01..05 test. Call `userEvent.setup()` once per `it` (or in `beforeEach` per CONTEXT Discretion bullet). All `user.*` methods are awaited under v14.

---

## No Analog Found

No new file in Phase 3 lacks an analog — all three are either in-place modifications of existing files (`Contact.jsx`, `Contact.test.jsx`, `package.json`) or compose two existing test analogs (`Home.test.jsx` + `Portfolio.test.jsx`) into one test file.

The single net-new pattern (user-event v14 async setup-and-use) is documented in CONTEXT specifics lines 145-167 — the executor mirrors the example block there verbatim.

---

## Metadata

**Analog search scope:**
- `/Users/hariraj.venkatesan/repos/harirajv.github.io/src/pages/*.test.jsx` (6 files, all read)
- `/Users/hariraj.venkatesan/repos/harirajv.github.io/src/pages/Contact.jsx` (refactor target)
- `/Users/hariraj.venkatesan/repos/harirajv.github.io/package.json` (dependency bump target)
- `/Users/hariraj.venkatesan/repos/harirajv.github.io/src/setupTests.js` (cross-cutting matcher source)
- `/Users/hariraj.venkatesan/repos/harirajv.github.io/vite.config.mjs` (cross-cutting globals source)

**Files scanned:** 10
**Pattern extraction date:** 2026-05-19
