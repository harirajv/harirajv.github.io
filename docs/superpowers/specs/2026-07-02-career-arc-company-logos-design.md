# Career Arc Company Logos Design

## Scope

Add company logos to the homepage career arc timeline for Symantec, Freshworks, and Master Electronics. The logos should reinforce the company names without changing the timeline structure or introducing a separate decorative section.

## Approved Direction

Use logo plus company name inside each existing timeline item heading. This keeps the years, employer, and focus copy grouped together and preserves the current compact scan pattern.

## Visual Treatment

- Add local logo assets under `public/assets/logos/`.
- Extend the `timeline` data in `src/pages/Home.jsx` with logo metadata.
- Render each company heading as a small logo mark followed by the company name.
- Keep logo marks in a fixed 32px square container with restrained neutral or brand-tinted backgrounds.
- Preserve mobile wrapping so long company names do not overlap the year or focus copy.

## Accessibility

- Treat logos as decorative because the company name remains visible text.
- Use empty `alt` text and `aria-hidden="true"` on logo images.
- Keep the timeline list semantics unchanged.

## Testing

- Update homepage tests to assert that each career company logo renders from a local asset.
- Preserve the existing chronological order test for career years.
- Run the existing test suite and production build after implementation.
