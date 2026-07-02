# Interactive Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the approved interactive technical showcase redesign with clean URLs, responsive laptop/mobile layouts, data-driven projects, and GitHub Pages deep-link fallback.

**Architecture:** Keep the current Vite + React 18 application and route structure, but replace the stock template presentation with focused page components, shared project data loading, and a responsive top navigation. Use `BrowserRouter` plus a `404.html` build fallback for GitHub Pages deep links. Avoid new heavy dependencies; use CSS Grid, Flexbox, CSS variables, and small React helpers.

**Tech Stack:** React 18, Vite 5, React Router 6, Vitest, Testing Library, CSS, GitHub Pages.

---

## File Structure

- Modify `src/App.jsx`: switch from `HashRouter` to `BrowserRouter`; keep route paths.
- Modify `src/pages/Layout.jsx`: replace fixed side navigation with responsive top navigation.
- Modify `src/pages/Home.jsx`: replace typed-template hero with the technical showcase homepage and featured project loading.
- Modify `src/pages/Portfolio.jsx`: render cards from `public/assets/projects.json`, with loading and error states.
- Modify `src/pages/About.jsx`: remove template placeholder copy and use technical positioning copy.
- Modify `src/pages/Resume.jsx`: fix typo and keep content while matching the new visual system.
- Modify `src/pages/Contact.jsx`: keep EmailJS behavior and update markup hooks for the new visual system.
- Replace most of `src/App.css`: define the new design system, layout, responsive behavior, cards, forms, hero, and reduced-motion handling.
- Modify `src/index.css`: keep global reset/body defaults aligned with the new design.
- Modify `package.json`: add a `postbuild` lifecycle script that copies `build/index.html` to `build/404.html` for GitHub Pages deep-link fallback.
- Modify tests in `src/pages/*.test.jsx` and `src/App.test.jsx`: update routing, content, project rendering, fallback behavior, and contact states.

## Task 1: Clean URLs And GitHub Pages Fallback

**Files:**
- Modify: `src/App.jsx`
- Modify: `package.json`
- Test: `src/App.test.jsx`
- Test: `src/pages/Layout.test.jsx`

- [ ] **Step 1: Write/update routing tests**

Update `src/App.test.jsx` to render `AppRoutes` inside `MemoryRouter` and assert clean paths render expected pages:

```jsx
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AppRoutes } from './App';

vi.mock('typed.js', () => ({
  default: class { constructor() {} destroy() {} }
}));

describe('AppRoutes', () => {
  it('renders the home page at /', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <AppRoutes />
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { name: /software engineer for systems that ship/i })).toBeInTheDocument();
  });

  it('renders the portfolio page at /portfolio', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ projects: [] })
    });

    render(
      <MemoryRouter initialEntries={['/portfolio']}>
        <AppRoutes />
      </MemoryRouter>
    );
    expect(await screen.findByRole('heading', { name: /portfolio/i })).toBeInTheDocument();
  });
});
```

Update `src/pages/Layout.test.jsx` to expect About at `/about` instead of `/`:

```jsx
expect(aboutLink).toHaveAttribute('href', '/about');
expect(resumeLink).toHaveAttribute('href', '/resume');
expect(portfolioLink).toHaveAttribute('href', '/portfolio');
expect(contactLink).toHaveAttribute('href', '/contact');
```

- [ ] **Step 2: Run tests and verify failure**

Run:

```bash
npm test -- src/App.test.jsx src/pages/Layout.test.jsx
```

Expected: tests fail because `App.jsx` still uses `HashRouter`, the homepage heading does not exist yet, and Layout maps About to `/`.

- [ ] **Step 3: Implement router and build fallback**

Update `src/App.jsx`:

```jsx
import React from 'react';
import {
  BrowserRouter,
  Route,
  Routes
} from 'react-router-dom';
import './App.css';
import Layout from './pages/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Resume from './pages/Resume';
import Portfolio from './pages/Portfolio';
import Contact from './pages/Contact';

export function AppRoutes() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Layout>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
```

Update `package.json` scripts so every production build copies the generated Vite HTML to `build/404.html`:

```json
"scripts": {
  "start": "vite",
  "build": "vite build",
  "postbuild": "cp build/index.html build/404.html",
  "preview": "vite preview",
  "test": "vitest run",
  "test:watch": "vitest"
}
```

This makes the deployed GitHub Pages 404 fallback serve the same bundled app shell as the homepage, including hashed production assets.

- [ ] **Step 4: Run focused tests**

Run:

```bash
npm test -- src/App.test.jsx src/pages/Layout.test.jsx
```

Expected: Layout href assertions pass after Task 2; App heading assertions may remain red until Home and Portfolio tasks land.

- [ ] **Step 5: Commit**

```bash
git add src/App.jsx package.json src/App.test.jsx src/pages/Layout.test.jsx
git commit -m "feat: use clean portfolio routes"
```

## Task 2: Responsive Top Navigation

**Files:**
- Modify: `src/pages/Layout.jsx`
- Modify: `src/App.css`
- Test: `src/pages/Layout.test.jsx`

- [ ] **Step 1: Write navigation behavior tests**

Add assertions to `src/pages/Layout.test.jsx`:

```jsx
expect(screen.getByRole('link', { name: /hariraj venkatesan/i })).toHaveAttribute('href', '/');
expect(screen.getByRole('navigation', { name: /primary/i })).toBeInTheDocument();
```

- [ ] **Step 2: Run test and verify failure**

Run:

```bash
npm test -- src/pages/Layout.test.jsx
```

Expected: fails because the brand link and labelled primary nav do not exist yet.

- [ ] **Step 3: Implement Layout markup**

Replace `src/pages/Layout.jsx` with:

```jsx
import React from "react";
import { NavLink, Link } from "react-router-dom";

const navItems = [
  { label: "About", to: "/about" },
  { label: "Resume", to: "/resume" },
  { label: "Portfolio", to: "/portfolio" },
  { label: "Contact", to: "/contact" }
];

export default function Layout({ children }) {
  return (
    <>
      <header className="site-header">
        <Link to="/" className="site-brand" aria-label="Hariraj Venkatesan home">
          <span className="brand-signal" aria-hidden="true" />
          <span>Hariraj Venkatesan</span>
        </Link>
        <nav className="site-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>
      {children}
    </>
  );
}
```

- [ ] **Step 4: Add base navigation CSS**

In `src/App.css`, add top navigation rules:

```css
.site-header {
  position: sticky;
  top: 0;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 18px clamp(20px, 5vw, 72px);
  background: rgba(15, 21, 28, 0.92);
  border-bottom: 1px solid var(--line);
  backdrop-filter: blur(16px);
}

.site-brand,
.nav-link {
  color: var(--text);
  text-decoration: none;
}

.site-brand {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  font-weight: 800;
}

.brand-signal {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 20px var(--accent);
}

.site-nav {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.nav-link {
  min-height: 40px;
  display: inline-flex;
  align-items: center;
  border: 1px solid transparent;
  padding: 8px 12px;
  color: var(--muted);
}

.nav-link:hover,
.nav-link:focus-visible,
.nav-link.active {
  color: var(--text);
  border-color: var(--line-strong);
  background: var(--panel);
}

@media (max-width: 640px) {
  .site-header {
    align-items: flex-start;
    flex-direction: column;
    padding: 16px 20px;
  }

  .site-nav {
    width: 100%;
    justify-content: flex-start;
  }

  .nav-link {
    flex: 1 1 auto;
    justify-content: center;
  }
}
```

- [ ] **Step 5: Run focused test**

Run:

```bash
npm test -- src/pages/Layout.test.jsx
```

Expected: pass.

- [ ] **Step 6: Commit**

```bash
git add src/pages/Layout.jsx src/pages/Layout.test.jsx src/App.css
git commit -m "feat: add responsive top navigation"
```

## Task 3: Data-Driven Portfolio

**Files:**
- Modify: `src/pages/Portfolio.jsx`
- Modify: `src/App.css`
- Test: `src/pages/Portfolio.test.jsx`

- [ ] **Step 1: Write project rendering and fallback tests**

Replace `src/pages/Portfolio.test.jsx` with:

```jsx
import { render, screen, waitFor } from '@testing-library/react';
import Portfolio from './Portfolio';

const projects = [
  {
    name: 'CSP Cost Optimization',
    category: 'Web',
    image_src: 'Cloud-Cost.jpg',
    details_txt: 'Optimizes cloud provider expenses.',
    details_link: 'https://github.com/harirajv/CSP-profit-maximisation',
    tech_tags: 'Python,Cloud'
  }
];

describe('Portfolio', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders project cards from JSON', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ projects })
    });

    render(<Portfolio />);

    expect(screen.getByText(/loading projects/i)).toBeInTheDocument();
    expect(await screen.findByRole('heading', { name: /csp cost optimization/i })).toBeInTheDocument();
    expect(screen.getByText('Python')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /open csp cost optimization/i })).toHaveAttribute('href', projects[0].details_link);
  });

  it('renders a fallback when project loading fails', async () => {
    vi.spyOn(global, 'fetch').mockRejectedValueOnce(new Error('network error'));

    render(<Portfolio />);

    await waitFor(() => {
      expect(screen.getByText(/projects are temporarily unavailable/i)).toBeInTheDocument();
    });
  });
});
```

- [ ] **Step 2: Run tests and verify failure**

Run:

```bash
npm test -- src/pages/Portfolio.test.jsx
```

Expected: fails because existing hard-coded markup does not expose the loading state, tags, or fallback.

- [ ] **Step 3: Implement data-driven Portfolio**

Replace `src/pages/Portfolio.jsx` with a functional component:

```jsx
import React from "react";

function parseTags(tags) {
  return tags.split(",").map((tag) => tag.trim()).filter(Boolean);
}

export default function Portfolio() {
  const [projects, setProjects] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    let mounted = true;

    fetch("/assets/projects.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Unable to load projects");
        }
        return response.json();
      })
      .then((data) => {
        if (mounted) {
          setProjects(data.projects || []);
          setError(false);
        }
      })
      .catch(() => {
        if (mounted) {
          setError(true);
        }
      })
      .finally(() => {
        if (mounted) {
          setLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <main className="page-shell">
      <section id="portfolio" className="section-block">
        <div className="section-kicker">Selected work</div>
        <h1>Portfolio</h1>
        <p className="section-lede">
          Projects across cloud optimization, computer vision, language systems, healthcare data, fraud detection, and React applications.
        </p>

        {loading && <p className="state-message">Loading projects...</p>}
        {!loading && error && <p className="state-message">Projects are temporarily unavailable. Please check back shortly.</p>}
        {!loading && !error && (
          <div className="project-grid">
            {projects.map((project) => (
              <article className="project-card" key={project.name}>
                <img src={`/assets/img/portfolio/${project.image_src}`} alt="" className="project-image" />
                <div className="project-body">
                  <div className="project-category">{project.category}</div>
                  <h2>{project.name}</h2>
                  <p>{project.details_txt}</p>
                  <div className="tag-list">
                    {parseTags(project.tech_tags).map((tag) => <span key={tag}>{tag}</span>)}
                  </div>
                  {project.details_link && (
                    <a className="text-link" href={project.details_link} target="_blank" rel="noreferrer" aria-label={`Open ${project.name}`}>
                      View project
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
```

- [ ] **Step 4: Add portfolio CSS**

Add card, tag, grid, and state-message rules in `src/App.css` as part of the shared design system in Task 6.

- [ ] **Step 5: Run focused tests**

Run:

```bash
npm test -- src/pages/Portfolio.test.jsx
```

Expected: pass.

- [ ] **Step 6: Commit**

```bash
git add src/pages/Portfolio.jsx src/pages/Portfolio.test.jsx src/App.css
git commit -m "feat: render portfolio from project data"
```

## Task 4: Technical Showcase Home

**Files:**
- Modify: `src/pages/Home.jsx`
- Modify: `src/App.css`
- Test: `src/pages/Home.test.jsx`

- [ ] **Step 1: Write homepage tests**

Replace `src/pages/Home.test.jsx` with:

```jsx
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from './Home';

describe('Home', () => {
  it('renders the technical showcase hero', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: /software engineer for systems that ship/i })).toBeInTheDocument();
    expect(screen.getByText(/aws infrastructure/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /view projects/i })).toHaveAttribute('href', '/portfolio');
    expect(screen.getByRole('link', { name: /download resume/i })).toHaveAttribute('href', '/assets/resume.pdf');
  });
});
```

- [ ] **Step 2: Run test and verify failure**

Run:

```bash
npm test -- src/pages/Home.test.jsx
```

Expected: fails because the current Home uses Typed.js and template copy.

- [ ] **Step 3: Implement homepage**

Replace `src/pages/Home.jsx` with:

```jsx
import React from "react";
import { Link } from "react-router-dom";

const metrics = [
  { value: "3+", label: "years building production software" },
  { value: "75%", label: "test pipeline runtime reduction" },
  { value: "AWS", label: "ECS, Fargate, Route 53, Terraform" },
  { value: "MS", label: "Software Engineering, ASU" }
];

const featuredProjects = [
  { name: "CSP Cost Optimization", tags: ["Python", "Cloud", "AHP"] },
  { name: "Pedestrian Detection", tags: ["Computer Vision", "PyTorch"] },
  { name: "HackerNews Mobile Reader", tags: ["React", "Mobile"] }
];

export default function Home() {
  return (
    <main>
      <section id="hero" className="hero-showcase">
        <div className="hero-copy">
          <p className="terminal-line">$ building cloud systems, data products, and reliable delivery pipelines</p>
          <h1>Software engineer for systems that ship.</h1>
          <p className="hero-summary">
            DevOps engineer and full-stack developer focused on AWS infrastructure, scalable web services, CI/CD, and practical data systems.
          </p>
          <div className="hero-actions">
            <Link className="button primary" to="/portfolio">View Projects</Link>
            <a className="button" href="/assets/resume.pdf" target="_blank" rel="noreferrer">Download Resume</a>
            <Link className="button" to="/contact">Contact</Link>
          </div>
        </div>
        <div className="systems-map" aria-hidden="true">
          <span className="system-line line-one" />
          <span className="system-line line-two" />
          <span className="system-line line-three" />
          <div className="system-node node-aws"><strong>AWS</strong><span>ECS, Route 53, Fargate</span></div>
          <div className="system-node node-delivery"><strong>Delivery</strong><span>Terraform, Jenkins, CI/CD</span></div>
          <div className="system-node node-apps"><strong>Apps</strong><span>React, Angular, APIs</span></div>
          <div className="system-node node-data"><strong>Data</strong><span>ML, CV, NLP</span></div>
        </div>
      </section>

      <section className="metric-grid" aria-label="Career highlights">
        {metrics.map((metric) => (
          <article className="metric-card" key={metric.label}>
            <strong>{metric.value}</strong>
            <span>{metric.label}</span>
          </article>
        ))}
      </section>

      <section className="section-block home-work">
        <div className="section-kicker">Featured work</div>
        <h2>Project signals</h2>
        <div className="project-grid compact">
          {featuredProjects.map((project) => (
            <article className="project-card compact-card" key={project.name}>
              <h3>{project.name}</h3>
              <div className="tag-list">
                {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
```

- [ ] **Step 4: Run focused test**

Run:

```bash
npm test -- src/pages/Home.test.jsx
```

Expected: pass.

- [ ] **Step 5: Commit**

```bash
git add src/pages/Home.jsx src/pages/Home.test.jsx src/App.css
git commit -m "feat: add technical showcase homepage"
```

## Task 5: About, Resume, And Contact Content Polish

**Files:**
- Modify: `src/pages/About.jsx`
- Modify: `src/pages/Resume.jsx`
- Modify: `src/pages/Contact.jsx`
- Modify: `src/App.css`
- Test: `src/pages/About.test.jsx`
- Test: `src/pages/Resume.test.jsx`
- Test: `src/pages/Contact.test.jsx`

- [ ] **Step 1: Update page tests**

Add content assertions:

```jsx
// src/pages/About.test.jsx
expect(screen.getByText(/cloud infrastructure/i)).toBeInTheDocument();
expect(screen.queryByText(/lorem ipsum/i)).not.toBeInTheDocument();
```

```jsx
// src/pages/Resume.test.jsx
expect(screen.getByRole('heading', { name: /summary/i })).toBeInTheDocument();
expect(screen.queryByText(/sumary/i)).not.toBeInTheDocument();
expect(screen.getByRole('link', { name: /download resume/i })).toHaveAttribute('href', '/assets/resume.pdf');
```

```jsx
// src/pages/Contact.test.jsx
expect(screen.getByRole('heading', { name: /contact/i })).toBeInTheDocument();
expect(screen.getByRole('button', { name: /send message/i })).toBeEnabled();
```

- [ ] **Step 2: Run tests and verify failure**

Run:

```bash
npm test -- src/pages/About.test.jsx src/pages/Resume.test.jsx src/pages/Contact.test.jsx
```

Expected: About and Resume fail on old copy/typo; Contact may pass before restyling.

- [ ] **Step 3: Update About**

Replace template copy with:

```jsx
<main className="page-shell">
  <section id="about" className="section-block">
    <div className="section-kicker">About</div>
    <h1>Engineering reliable systems from infrastructure to interface.</h1>
    <p className="section-lede">
      I am a software engineer focused on cloud infrastructure, full-stack applications, and data-informed product work.
    </p>
    <div className="content-grid">
      <article className="info-panel">
        <h2>What I build</h2>
        <p>AWS-backed services, CI/CD workflows, API-driven applications, and React or Angular frontends that make operational complexity easier to use.</p>
      </article>
      <article className="info-panel">
        <h2>How I work</h2>
        <p>I connect software design, deployment reliability, and practical data skills so teams can ship useful systems with fewer surprises.</p>
      </article>
    </div>
  </section>
</main>
```

- [ ] **Step 4: Update Resume and Contact**

Fix `Sumary` to `Summary`, update the resume download link text to "Download resume", and add page shell classes. Keep all existing experience bullets and EmailJS state logic.

- [ ] **Step 5: Run focused tests**

Run:

```bash
npm test -- src/pages/About.test.jsx src/pages/Resume.test.jsx src/pages/Contact.test.jsx
```

Expected: pass.

- [ ] **Step 6: Commit**

```bash
git add src/pages/About.jsx src/pages/About.test.jsx src/pages/Resume.jsx src/pages/Resume.test.jsx src/pages/Contact.jsx src/pages/Contact.test.jsx src/App.css
git commit -m "feat: polish portfolio content pages"
```

## Task 6: Full Responsive Design System

**Files:**
- Modify: `src/App.css`
- Modify: `src/index.css`
- Test: all existing tests

- [ ] **Step 1: Replace old template CSS**

Replace the BootstrapMade template-heavy CSS in `src/App.css` with the new design system. It must include:

```css
:root {
  --bg: #0f151c;
  --bg-soft: #111923;
  --panel: #172231;
  --panel-light: #f4f7fa;
  --text: #f8fbff;
  --text-dark: #111923;
  --muted: #9fb0c3;
  --line: #253446;
  --line-strong: #31465b;
  --accent: #1fb6a6;
  --accent-warm: #f3b84f;
  --danger: #f87171;
  --success: #34d399;
}
```

Required selectors:

- `.page-shell`
- `.section-block`
- `.section-kicker`
- `.section-lede`
- `.hero-showcase`
- `.systems-map`
- `.system-node`
- `.metric-grid`
- `.metric-card`
- `.project-grid`
- `.project-card`
- `.project-image`
- `.tag-list`
- `.info-panel`
- `.resume-grid`
- `.resume-item`
- `.contact-grid`
- `.php-email-form`
- `.state-message`

- [ ] **Step 2: Add responsive breakpoints**

Add breakpoints:

```css
@media (max-width: 900px) {
  .hero-showcase,
  .contact-grid,
  .resume-grid,
  .content-grid {
    grid-template-columns: 1fr;
  }

  .systems-map {
    min-height: 320px;
  }
}

@media (max-width: 640px) {
  h1 {
    font-size: 2.25rem;
  }

  .hero-actions,
  .project-grid,
  .metric-grid {
    grid-template-columns: 1fr;
  }

  .button,
  .php-email-form button {
    width: 100%;
  }
}
```

- [ ] **Step 3: Add reduced-motion handling**

Add:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
  }
}
```

- [ ] **Step 4: Run all tests**

Run:

```bash
npm test
```

Expected: all tests pass.

- [ ] **Step 5: Commit**

```bash
git add src/App.css src/index.css
git commit -m "style: apply responsive technical design system"
```

## Task 7: Production Build And Manual Verification

**Files:**
- Modify if needed: `package.json`, `vite.config.mjs`, tests affected by build issues

- [ ] **Step 1: Run full test suite**

Run:

```bash
npm test
```

Expected: all tests pass.

- [ ] **Step 2: Run production build**

Run:

```bash
npm run build
```

Expected: Vite builds successfully into `build`.

- [ ] **Step 3: Verify fallback file is emitted**

Run:

```bash
test -f build/404.html
```

Expected: exit code `0`.

- [ ] **Step 4: Start local dev server for responsive inspection**

Run:

```bash
npm start
```

Expected: Vite prints a local URL. Inspect:

- Laptop width around 1440px.
- Mobile width around 390px.
- `/`, `/about`, `/resume`, `/portfolio`, and `/contact`.
- No horizontal scrolling.
- Navigation remains usable.
- Project cards and contact form fit mobile.

- [ ] **Step 5: Final commit for verification fixes**

If manual verification requires fixes:

```bash
git add src public
git commit -m "fix: address responsive portfolio verification"
```

If no fixes are needed, do not create an empty commit.

## Self-Review

- Spec coverage: routing, GitHub Pages fallback, responsive layout, data-driven portfolio, homepage showcase, content cleanup, motion constraints, accessibility basics, and testing are covered by Tasks 1-7.
- Placeholder scan: no unresolved marker phrases are present.
- Type consistency: route paths, project fields (`name`, `category`, `image_src`, `details_txt`, `details_link`, `tech_tags`), and CSS selector names are consistent across tasks.
