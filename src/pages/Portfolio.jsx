import React from "react";
import { loadPortfolioSections, parseProjectTags, projectImagePath } from "../projectData";

function PlatformProjectCard({ project }) {
  return (
    <article className="project-card platform-project-card">
      <div className="project-category">{project.category}</div>
      <h2>{project.name}</h2>
      <dl className="case-study-list">
        <div>
          <dt>Problem</dt>
          <dd>{project.problem}</dd>
        </div>
        <div>
          <dt>Platform move</dt>
          <dd>{project.platform_move}</dd>
        </div>
        <div>
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
  return (
    <article className="project-card">
      {project.image_src && <img src={projectImagePath(project.image_src)} alt="" className="project-image" />}
      <div className="project-body">
        <div className="project-category">{project.category}</div>
        <h2>{project.name}</h2>
        <p>{project.details_txt}</p>
        <div className="tag-list">
          {parseProjectTags(project.tech_tags).map((tag) => <span key={tag}>{tag}</span>)}
        </div>
        {project.details_link && (
          <a
            className="text-link"
            href={project.details_link}
            target="_blank"
            rel="noreferrer"
            aria-label={`Open ${project.name}`}
          >
            View project
          </a>
        )}
      </div>
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
        <h1>Selected engineering work.</h1>
        <p className="section-lede">
          A mix of enterprise systems work and earlier data/ML projects, grouped so the strongest engineering work is easy to scan first.
        </p>

        {loading && <p className="state-message">Loading portfolio...</p>}
        {!loading && error && <p className="state-message">Portfolio is temporarily unavailable. Please check back shortly.</p>}
        {!loading && !error && (
          <>
            <section className="portfolio-section" aria-labelledby="enterprise-systems-heading">
              <div className="section-kicker">Primary work</div>
              <h2 id="enterprise-systems-heading">Enterprise Systems</h2>
              <div className="project-grid platform-grid">
                {platformProjects.map((project) => (
                  <PlatformProjectCard project={project} key={project.name} />
                ))}
              </div>
            </section>

            <section className="portfolio-section" aria-labelledby="earlier-work-heading">
              <div className="section-kicker">Supporting range</div>
              <h2 id="earlier-work-heading">Earlier Data/ML Work</h2>
              <div className="project-grid">
                {earlierProjects.map((project) => (
                  <EarlierProjectCard project={project} key={project.name} />
                ))}
              </div>
            </section>
          </>
        )}
      </section>
    </main>
  );
}
