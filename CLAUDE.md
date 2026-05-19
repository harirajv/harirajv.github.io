<!-- GSD:project-start source:PROJECT.md -->
## Project

**harirajv.github.io — Portfolio Site**

Personal portfolio and resume site for Hariraj Venkatesan, built with React 18 + Vite and deployed via GitHub Pages at harirajv.github.io. Five hash-routed pages (Home, About, Resume, Portfolio, Contact) wrapped in a shared `Layout`, with an EmailJS-powered contact form.

**Core Value:** The portfolio reliably represents Hariraj's professional profile to visitors — every page renders, navigation works, and the contact form actually delivers messages.

### Constraints

- **Tech stack**: Must stay on Vite — CRA migration is recent and shouldn't be reverted. Why: avoid backtracking.
- **Tooling**: Vitest preferred over Jest — native Vite integration, near-zero config beyond `vite.config.mjs`. Why: matches the existing Vite build pipeline.
- **Compatibility**: Existing `@testing-library/jest-dom` matchers should still work (they're framework-agnostic). Why: minimize churn to existing test dependencies.
- **Scope**: No new product features in this milestone. Why: testing milestone is about hardening, not growth.
<!-- GSD:project-end -->

<!-- GSD:stack-start source:STACK.md -->
## Technology Stack

Technology stack not yet documented. Will populate after codebase mapping or first phase.
<!-- GSD:stack-end -->

<!-- GSD:conventions-start source:CONVENTIONS.md -->
## Conventions

Conventions not yet established. Will populate as patterns emerge during development.
<!-- GSD:conventions-end -->

<!-- GSD:architecture-start source:ARCHITECTURE.md -->
## Architecture

Architecture not yet mapped. Follow existing patterns found in the codebase.
<!-- GSD:architecture-end -->

<!-- GSD:skills-start source:skills/ -->
## Project Skills

No project skills found. Add skills to any of: `.claude/skills/`, `.agents/skills/`, `.cursor/skills/`, `.github/skills/`, or `.codex/skills/` with a `SKILL.md` index file.
<!-- GSD:skills-end -->

<!-- GSD:workflow-start source:GSD defaults -->
## GSD Workflow Enforcement

Before using Edit, Write, or other file-changing tools, start work through a GSD command so planning artifacts and execution context stay in sync.

Use these entry points:
- `/gsd-quick` for small fixes, doc updates, and ad-hoc tasks
- `/gsd-debug` for investigation and bug fixing
- `/gsd-execute-phase` for planned phase work

Do not make direct repo edits outside a GSD workflow unless the user explicitly asks to bypass it.
<!-- GSD:workflow-end -->



<!-- GSD:profile-start -->
## Developer Profile

> Profile not yet configured. Run `/gsd-profile-user` to generate your developer profile.
> This section is managed by `generate-claude-profile` -- do not edit manually.
<!-- GSD:profile-end -->
