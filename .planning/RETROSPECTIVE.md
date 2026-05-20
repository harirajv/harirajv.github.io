# Project Retrospective

*A living document updated after each milestone. Lessons feed forward into future planning.*

## Milestone: v1.0 — Testing Coverage

**Shipped:** 2026-05-20
**Phases:** 3 | **Plans:** 4 | **Tasks:** 14

### What Was Built
- Vitest 4.1.6 wired into Vite via single-config `test` block (jsdom env, globals, `setupTests.js` reused). Stale CRA `App.test.js` rewritten as `App.test.jsx`. `npm test` and `npm run test:watch` scripts added. (Phase 1)
- `AppRoutes` named export extracted from `App.jsx` so tests can wrap routes in `MemoryRouter`; isolated `Layout.test.jsx` covers banner role, 4 nav hrefs, children pass-through; 5-route table test + unknown-route assertion. (Phase 2)
- Per-page smoke tests (Home, About, Resume, Portfolio, Contact) using `#section-id` selectors. `typed.js` mocked as no-op for Home; `global.fetch` spied for Portfolio with `waitFor`. (Phase 2)
- `Contact.jsx` refactored from static feedback divs to a state-driven `status` enum (`'idle' | 'sending' | 'success' | 'error'`); `form.current.reset()` on success; submit disabled while sending; generic error copy (no provider-internals leak). `@testing-library/user-event` bumped to ^14.5.2. 4 interaction tests cover FORM-01/02/04/05 (FORM-03 satisfied structurally by module-scope `vi.mock('@emailjs/browser')`). (Phase 3)
- Final state: 7 test files / 18 tests, full Vitest suite green, no real network/email in tests.

### What Worked
- **Phase 2's `<deferred>` flag for the Phase 3 problem.** The Contact.jsx static-DOM issue was identified in Phase 2's CONTEXT.md and named in `<code_context>` and `<deferred>`. Phase 3's discuss-phase didn't have to rediscover it — the gray area was teed up.
- **Section-id selector strategy (D-09 in Phase 2).** Established once, reused in every per-page test, sidestepped the Resume "About Me" heading collision cleanly.
- **Per-test `vi.mock` discipline.** No bleeding mocks, no global setup file bloat. `setupTests.js` stayed focused on jest-dom matcher registration across all 3 phases.
- **GSD's tight CONTEXT.md → PLAN.md → SUMMARY.md → VERIFICATION.md chain.** Every D-NN decision survived to verification. Decision-coverage gate caught a markdown-heading shape mismatch in Phase 3's plan format — non-trivial signal, easy fix.

### What Was Inefficient
- **CONTEXT.md `<decisions>` section grew large in Phase 3.** 14 decisions for a single 1-plan phase felt heavy. Some of those (e.g., D-10's mock payload shape) are implementation polish that arguably belonged in PLAN.md or Claude's Discretion. Trade-off vs. downstream-agent clarity was correct here, but watch for it in larger phases.
- **Plan format vs decision-coverage gate.** The plan checker's "designated headings" pattern (`# tasks` / `# truths` / etc.) doesn't match the XML-tag plan layout (`<tasks>...</tasks>`). Had to retrofit `## Tasks` headings above the XML blocks so the gate would find the D-NN citations. Minor friction, but worth a planner-template tweak.
- **REQUIREMENTS.md typo (`send` vs `sendForm`) carried across all 3 phases.** Each phase flagged it; none of the 3 phases owned the fix. Deferred to next milestone — the right call for scope, but evidence that cross-phase typo cleanup needs an explicit owner.

### Patterns Established
- **Colocated `.test.jsx`** next to `.jsx` source — no `tests/` directory. (Phase 1 D-16)
- **`#section-id` selectors over ARIA roles** when role-text collides across pages. ARIA roles still preferred when they read naturally (e.g., `getByRole('banner')` for Layout). (Phase 2 D-09, D-11)
- **Form-field selectors by `name` attribute** — readable and the same attribute EmailJS reads via FormData. (Phase 2 D-10)
- **State-driven UI for assertability** — when verifying a success/error UI, conditional render off React state beats CSS-toggled visibility every time in jsdom (no CSS pipeline). (Phase 3 D-01)
- **Module-scope `vi.mock`** for external SDKs, plus per-test `mockResolvedValueOnce` / `mockRejectedValueOnce`. (Phase 3 D-08, D-10)
- **EmailJS credentials stay out of test assertions** — assert call arity + form-element type + FormData values, not service/template/publicKey literals. (Phase 3 D-09)

### Key Lessons
1. **A `<deferred>` in CONTEXT.md is a load-bearing artifact.** Phase 2's deferred note about Contact.jsx's static DOM was the single most useful input to Phase 3's discuss. Be deliberate about what gets parked there.
2. **Test-only milestones still touch production code.** Phase 3's "testing" goal required a Contact.jsx refactor to make success/error states assertable. The naive read ("we're just adding tests") would have missed that. Discuss-phase teed it up correctly.
3. **Mock contract precision matters.** FORM-02's `mockResolvedValueOnce` → `mockReturnValueOnce(new Promise(() => {}))` switch during execution wasn't laziness — it was avoiding `form.reset()` clobbering the FormData read-back. Auto-fixed deviation, well-documented in SUMMARY.md. Verifier confirmed soundness.
4. **The decision-coverage gate is structural, not semantic.** It searches `# heading` body sections, not XML-tag bodies. If your planner output uses XML, add explicit markdown headings. Future planner templates should default to this layout.
5. **Coarse-grained phases work for small projects.** 3 phases / 4 plans / 14 tasks shipped a full testing harness over ~10 hours. Sub-phase granularity would have been noise.

### Cost Observations
- Model mix (this orchestrator): Opus 4.7 (1M context) for discuss/plan orchestration; Sonnet for executor + verifier subagents. Pattern-mapper and plan-checker ran on Sonnet.
- Sessions: 2 (Phase 3 discuss → plan in one session, execute → verify → milestone close in another).
- Notable: First-iteration plan-checker pass on Phase 3 — no revision loop needed. Strong signal that CONTEXT.md → PLAN.md fidelity is high.

---

## Cross-Milestone Trends

### Process Evolution

| Milestone | Sessions | Phases | Key Change |
|-----------|----------|--------|------------|
| v1.0 | 2 | 3 | Established GSD workflow on a brownfield React+Vite project; locked Vitest as the test runner; built the discuss→plan→execute chain pattern |

### Cumulative Quality

| Milestone | Tests | Coverage | Zero-Dep Additions |
|-----------|-------|----------|-------------------|
| v1.0 | 18 (7 files) | not yet measured (QUAL-01 deferred) | 0 prod deps added; 1 test dep bumped (`user-event` v13 → v14) |

### Top Lessons (Verified Across Milestones)

_To be filled as more milestones ship. v1.0 lessons above are first-milestone candidates._
