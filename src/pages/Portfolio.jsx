import React from "react";
import { PlusCircleDotted } from "react-bootstrap-icons";
import { loadPortfolioSections, parseProjectTags, projectImagePath } from "../projectData";

function projectLinks(project) {
  const links = [];

  if (project.details_link) {
    links.push({
      label: "GitHub",
      url: project.details_link
    });
  }

  return links.concat(project.paper_links || []).filter((link) => link.url);
}

function PlatformProjectCard({ project }) {
  return (
    <article
      className="project-card platform-project-card designed-case-study-card"
      aria-label={`${project.name} case study`}
    >
      <header className="case-study-header">
        <h2>{project.name}</h2>
      </header>
      <dl className="case-study-list">
        <div className="case-study-row case-study-problem">
          <dt>Problem</dt>
          <dd>{project.problem}</dd>
        </div>
        <div className="case-study-row case-study-move">
          <dt>Technical move</dt>
          <dd>{project.platform_move}</dd>
        </div>
        <div className="case-study-row case-study-outcome">
          <dt>Outcome</dt>
          <dd>{project.outcome}</dd>
        </div>
      </dl>
      <div className="tag-list">
        {parseProjectTags(project.tech_tags).map((tag) => <span key={tag}>{tag}</span>)}
      </div>
    </article>
  );
}

function EarlierProjectCard({ project }) {
  const links = projectLinks(project);

  return (
    <article className="project-card">
      {project.image_src && <img src={projectImagePath(project.image_src)} alt="" className="project-image" />}
      <div className="project-body">
        <h2>{project.name}</h2>
        <p>{project.details_txt}</p>
        <div className="project-meta-row">
          <div className="tag-list">
            {parseProjectTags(project.tech_tags).map((tag) => <span key={tag}>{tag}</span>)}
          </div>
          {links.length > 0 && (
            <div className="project-link-row" aria-label={`${project.name} links`}>
              {links.map((link) => (
                <a
                  className="project-link-pill"
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Open ${link.label} for ${project.name}`}
                  title={`Open ${link.label}`}
                  key={`${link.label}-${link.url}`}
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

function ComingSoonCard({ title }) {
  return (
    <article className="coming-soon-tile">
      <PlusCircleDotted className="coming-soon-icon" aria-hidden="true" focusable="false" />
      <h2>{title}</h2>
    </article>
  );
}

export default function Portfolio() {
  const [platformProjects, setPlatformProjects] = React.useState([]);
  const [earlierProjects, setEarlierProjects] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    let mounted = true;

    loadPortfolioSections()
      .then((sections) => {
        if (mounted) {
          setPlatformProjects(sections.platformProjects);
          setEarlierProjects(sections.earlierProjects);
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
        <div className="section-kicker">Portfolio</div>
        <h1>Systems with outcomes.</h1>
        <p className="section-lede">
          Enterprise delivery, automation, and ML experiments, arranged so the strongest engineering stories are easy to scan first.
        </p>

        {loading && <p className="state-message">Loading portfolio...</p>}
        {!loading && error && <p className="state-message">Portfolio is temporarily unavailable. Please check back shortly.</p>}
        {!loading && !error && (
          <>
            <section className="portfolio-section" aria-labelledby="enterprise-systems-heading">
              <h2 id="enterprise-systems-heading">Modernization Systems</h2>
              <div className="project-grid platform-grid">
                {platformProjects.map((project) => (
                  <PlatformProjectCard project={project} key={project.name} />
                ))}
                <ComingSoonCard
                  title="More systems in progress"
                />
              </div>
            </section>

            <section className="portfolio-section" aria-labelledby="earlier-projects-heading">
              <h2 id="earlier-projects-heading">ML Lab</h2>
              <div className="project-grid">
                {earlierProjects.map((project) => (
                  <EarlierProjectCard project={project} key={project.name} />
                ))}
                <ComingSoonCard
                  title="More ML in progress"
                />
              </div>
            </section>
          </>
        )}
      </section>
    </main>
  );
}
