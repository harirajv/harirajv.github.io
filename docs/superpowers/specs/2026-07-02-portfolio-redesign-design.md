# Portfolio Redesign Design

## Goal

Redesign the portfolio from a stock resume-template feel into an interactive technical showcase. The site should immediately communicate cloud engineering, DevOps, full-stack development, and practical data/ML experience while remaining credible, responsive, maintainable, and deployable on GitHub Pages.

## Direction

Use the approved "Interactive Technical Showcase" direction:

- Dark technical homepage hero with a system-map style visual.
- Clear positioning around software engineering, AWS infrastructure, delivery pipelines, web applications, and data systems.
- Stronger proof signals through metrics, concise resume highlights, and project cards.
- Restrained motion using CSS transitions and decorative animation only.
- Responsive layouts for laptop, tablet, and mobile.

## Architecture

Keep the current Vite, React 18, and React Router structure. The existing pages remain:

- Home
- About
- Resume
- Portfolio
- Contact

The redesign changes the presentation layer and selected page structure without introducing a heavy animation or visualization framework. Use CSS Grid, Flexbox, responsive media queries, CSS variables, and lightweight component state.

Switch routing from `HashRouter` to clean browser URLs with `BrowserRouter`. Because the site is deployed to GitHub Pages, the implementation must include fallback handling so direct visits and refreshes work for `/about`, `/resume`, `/portfolio`, and `/contact`.

## Components

### Global Shell

Replace the fixed left-side pill navigation with a responsive top navigation.

Laptop and desktop:

- Brand/name on the left.
- Route links on the right.
- Clear active, hover, and focus states.

Mobile:

- Compact top navigation that does not squeeze page content.
- Links remain tap-friendly and readable.
- No horizontal scrolling.

### Home

Make the homepage the flagship experience.

Required sections:

- Technical hero with headline, role summary, and primary calls to action.
- System-map visual showing AWS, delivery, apps, and data as connected capabilities.
- Signal metrics for experience, AWS/cloud work, delivery impact, and education.
- Featured project cards sourced from the same project data as the portfolio, using the first three projects unless the data order is changed deliberately.

Responsive behavior:

- Laptop: two-column hero with copy and system visual side by side.
- Tablet: reduced spacing and narrower grids.
- Mobile: single-column flow, copy first, visual below, wrapped buttons, readable metrics.

### Portfolio

Use `public/assets/projects.json` as the source of truth instead of duplicating hard-coded project cards.

The page should:

- Load and render project cards from JSON.
- Show a polished loading state while data loads.
- Show a quiet fallback state if data fails to load.
- Render tags from `tech_tags`.
- Use real project images already in `public/assets/img/portfolio`.
- Support responsive grids from multi-column laptop layout to single-column mobile layout.

### About

Remove placeholder template copy and personal placeholder details. Replace them with concise copy that supports the technical positioning:

- Who Hariraj is professionally.
- What kinds of systems he builds.
- What strengths connect DevOps, full-stack work, and data systems.

### Resume

Keep the existing resume content but restyle it to match the technical showcase design.

Required improvements:

- Fix visible typo: "Sumary" to "Summary".
- Preserve resume download link.
- Use a responsive timeline or grouped experience layout.
- Laptop may use two columns; mobile must collapse to one column.

### Contact

Keep the EmailJS behavior and existing form states:

- `idle`
- `sending`
- `success`
- `error`

Restyle the contact page to match the new design. Inputs and buttons must be full-width and touch-friendly on mobile.

## Data Flow

`Portfolio.jsx` loads project data from `assets/projects.json`.

Data handling:

- `loading: true` before fetch completes.
- `projects` set from the JSON response on success.
- `loading: false` after success or failure.
- Failure renders a fallback message instead of an empty page.

Home features the first three project records from the same project data used by Portfolio. Avoid maintaining two full copies of project content.

## Interaction And Motion

Interactions should make the site feel technical and alive without compromising readability.

Use:

- CSS hover and focus transitions for nav links, buttons, cards, and project links.
- Decorative animated lines or node highlights in the hero system-map visual.
- `prefers-reduced-motion` to disable nonessential animation.

Avoid:

- Heavy animation libraries.
- Motion that delays content.
- Effects that make text harder to read.

## Routing And Deployment

Use clean URLs:

- `/`
- `/about`
- `/resume`
- `/portfolio`
- `/contact`

Implementation must include GitHub Pages SPA fallback support. The production build should include a `404.html` fallback that serves the React app for deep links, so direct visits and refreshes for `/about`, `/resume`, `/portfolio`, and `/contact` render the intended route. This behavior must be verified before completion.

## Responsive Requirements

Verify at minimum:

- Laptop/desktop viewport: full technical hero, top navigation, multi-column metrics and project grids.
- Tablet viewport: reduced columns and spacing without cramped text.
- Mobile viewport: single-column flow, no horizontal scrolling, readable text, tap-friendly controls.

Text must not overflow buttons, cards, or navigation. Project cards must keep images and content proportionate across viewport sizes.

## Accessibility Requirements

- Preserve semantic headings.
- Use descriptive image alt text for meaningful images.
- Keep decorative visuals hidden from assistive tech where appropriate.
- Ensure keyboard focus states are visible.
- Maintain sufficient color contrast.
- Keep motion optional through `prefers-reduced-motion`.

## Testing And Verification

Automated checks:

- Existing render tests continue passing.
- Update tests where labels, headings, or routing assumptions change.
- Add focused tests for data-driven portfolio rendering and the fetch-failure fallback.

Commands:

- `npm test`
- `npm run build`

Manual verification:

- Start the Vite dev server.
- Inspect laptop and mobile layouts.
- Verify navigation on all routes.
- Verify clean URL deep links and refresh behavior through a production-style preview or GitHub Pages equivalent.
- Verify contact form states still render correctly.

## Out Of Scope

- New backend services.
- New project content beyond rewriting existing portfolio copy.
- Heavy animation, 3D rendering, or a full case-study CMS.
- Replacing the deployment platform.
