# Platform Brand Content Design

## Goal

Reposition the website from a general software portfolio into a bold personal brand for a platform engineer who helps enterprises modernize legacy systems. The site should communicate one clear promise:

> I build the platforms that make enterprise engineering move faster.

The content should emphasize real-time data platforms, zero-trust cloud infrastructure, and AI-enabled engineering systems. It should reduce generic full-stack positioning, student/teaching emphasis, and contact-form prominence.

## Audience

Primary audience: enterprise companies modernizing legacy systems and hiring platform engineers.

The site should speak to hiring managers and technical leaders who care about delivery velocity, data freshness, secure cloud governance, production reliability, and internal developer enablement.

## Content Voice

Use a bold personal-brand tone with proof-backed intensity.

Guidelines:

- Be confident and memorable, but keep every major claim tied to a metric, mechanism, or concrete outcome.
- Do not use explicit "senior" level language. Let ownership, project scope, and metrics imply level.
- Use first person where it reads strongest, especially on the homepage and About page.
- Use neutral case-study language where it improves credibility.
- Company names may appear, but architecture and metrics should stay outcome-focused and public-safe.

## Homepage

The homepage becomes the flagship brand surface.

### Hero

Headline:

> I build the platforms that make enterprise engineering move faster.

Supporting copy:

> Real-time data platforms, zero-trust cloud infrastructure, and AI enablement for enterprises modernizing legacy systems.

Primary call to action:

- View platform work

Secondary calls to action:

- Email me
- LinkedIn
- GitHub

### Platform Pillars

Show three core pillars immediately after the hero.

#### Real-Time Data Platforms

Positioning: replacing stale, batch-oriented workflows with event-driven systems that keep enterprise operations synchronized.

Content themes:

- Kafka
- CDC
- Debezium
- event logs
- canonical order state
- data freshness
- idempotency
- reconciliation reduction

#### Secure Cloud Foundations

Positioning: making secure infrastructure and deployment paths the default, not an afterthought.

Content themes:

- Terraform
- AWS
- OIDC
- IAM governance
- PrivateLink
- ECS/Fargate
- rollback-safe delivery
- private networking

#### AI-Enabled Engineering Systems

Positioning: turning AI and data prototypes into governed internal platforms that improve developer and operational workflows.

Content themes:

- Databricks
- Bedrock RAG
- MCP skills
- CI assistants
- AIOps workflows
- productionized internal AI tools

### Proof Metrics

Use these metrics in this priority order:

1. 12M+ daily change events
2. 4-6 minute deployment cycles
3. 25% lower MTTR
4. 12 hours/week operational toil reclaimed

The metrics should be visually prominent but concise. Avoid overexplaining them in the hero; the case studies can provide context.

### Homepage Case Studies

Show only three homepage case studies to keep the page sharp:

1. Real-Time CDC Platform
2. Zero-Trust Infrastructure Automation
3. AI Enablement Platform

Each homepage card should include:

- the legacy drag or operational problem
- the platform move
- the business or engineering outcome

### Career Timeline

Add a compact credibility strip rather than a full resume.

The timeline should show the arc:

- Symantec: early enterprise systems and browser-extension infrastructure work
- Freshworks: platform-adjacent work across data import, routing, auth, CI/CD, and modernization
- Master Electronics: current platform engineering ownership across data, infrastructure, delivery, and AI enablement

Keep this short. The homepage should still feel like a brand page, not a resume page.

## Portfolio

Keep the page title "Portfolio."

Restructure the page into two sections:

1. Platform Work
2. Earlier Data/ML Work

### Platform Work

Use richer cards than the current project cards, but do not add individual detail pages yet.

Each card should include:

- Problem: the legacy or operational drag
- Platform move: what was built
- Outcome: measurable or business result
- Tech tags: concise and public-safe

Primary platform cards:

#### Real-Time CDC Platform

Story: replaced stale synchronization patterns with event-driven data propagation across enterprise order and ERP workflows.

Emphasize:

- 12M+ daily change events
- schema-driven onboarding
- DLQ recovery
- idempotency
- reduced reconciliation overhead

#### Zero-Trust Infrastructure Automation

Story: standardized secure cloud delivery with governed infrastructure paths.

Emphasize:

- Terraform
- AWS OIDC
- IAM scope reduction
- PrivateLink/private networking
- ECS/Fargate deployment stability
- removal of static deployment credentials

#### AI Enablement Platform

Story: moved internal AI and data prototypes into governed production environments.

Emphasize:

- Databricks
- Bedrock RAG
- MCP skills
- CI assistants
- AIOps workflows
- 40% faster Databricks pipeline development
- 25% lower MTTR

#### CI/CD Platform & Developer Tooling

Story: modernized CI/CD and developer feedback loops.

Emphasize:

- immutable builds
- quality gates
- deployment friction reduction
- pipeline velocity

Avoid making "Azure DevOps migration" the title or primary framing. It can remain part of the story where useful.

#### Customer Data Import Platform

Story: earlier enterprise platform work supporting secure, large-scale customer onboarding.

Emphasize:

- 400+ enterprise client migrations
- Kubernetes workers
- queue-driven orchestration
- secure OAuth integrations
- S3 multipart uploads
- tenant isolation

### Earlier Data/ML Work

Keep academic and earlier data projects, but visually separate them from platform work so they show range without diluting the brand.

Candidate projects:

- Pedestrian Detection
- Indian Language Identifier
- Credit Card Fraud Detection
- Chronic Kidney Disease Detection
- CSP Cost Optimization, framed as decision-support/data systems work

These cards should be shorter than platform cards.

## About

The About page becomes a short manifesto, not a biography dump.

Core message:

> Platform engineering is how repeated operational pain becomes reusable capability.

The page should make clear that the differentiator is backend/platform architecture combined with security-first cloud governance.

Working principles:

1. Make the secure path the easiest path.
2. Turn repeated operational pain into platform capability.
3. Design for rollback, recovery, and idempotency before scale.

Avoid long personal history. Use the page to explain how Hariraj thinks and works.

## Resume

Replace the full web resume with a lightweight conversion page.

Required content:

- short platform-engineering positioning summary
- 4-6 proof highlights
- download resume PDF button
- compact career timeline with company, role, and platform-relevant focus

Remove education from the body of the page. The resume PDF can carry traditional education and coursework details.

## Contact

Shift from form-first contact to direct-channel contact.

Primary channels:

- Email: `harirajv@gmail.com`
- LinkedIn: `https://linkedin.com/in/hariraj-venkatesan`
- GitHub: `https://github.com/harirajv`

Remove the ASU email from the primary contact surface.

The EmailJS contact form should be removed from the primary Contact page or heavily demoted. The recommended implementation is to remove the form from the primary page and present direct channels clearly.

## Navigation

Keep the existing top-level pages:

- Home
- About
- Resume
- Portfolio
- Contact

Do not rename Portfolio.

## Out Of Scope

- Detailed case-study routes
- Full CMS or content management layer
- New visual redesign beyond what content changes require
- Publishing internal architecture diagrams
- Presenting sensitive project implementation details

## Success Criteria

The revised site should make a visitor understand within one screen that Hariraj is a platform engineer focused on enterprise modernization.

The site succeeds if it clearly communicates:

- what kind of platform engineer he is
- what problems he solves
- which proof points support the claim
- how to contact him directly
- how current enterprise platform work differs from earlier academic data/ML projects
