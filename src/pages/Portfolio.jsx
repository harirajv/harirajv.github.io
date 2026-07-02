import React from "react";
import { loadProjects, parseProjectTags, projectImagePath } from "../projectData";

export default function Portfolio() {
  const [projects, setProjects] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);

  React.useEffect(() => {
    let mounted = true;

    loadProjects()
      .then((loadedProjects) => {
        if (mounted) {
          setProjects(loadedProjects);
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
                <img src={projectImagePath(project.image_src)} alt="" className="project-image" />
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
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
