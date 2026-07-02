import React from "react";
import { Link } from "react-router-dom";
import { loadProjects, parseProjectTags } from "../projectData";

const metrics = [
  { value: "3+", label: "years building production software" },
  { value: "75%", label: "test pipeline runtime reduction" },
  { value: "AWS", label: "ECS, Fargate, Route 53, Terraform" },
  { value: "MS", label: "Software Engineering, ASU" }
];

export default function Home() {
  const [featuredProjects, setFeaturedProjects] = React.useState([]);
  const [projectsLoaded, setProjectsLoaded] = React.useState(false);

  React.useEffect(() => {
    let mounted = true;

    loadProjects()
      .then((projects) => {
        if (mounted) {
          setFeaturedProjects(projects.slice(0, 3));
        }
      })
      .catch(() => {
        if (mounted) {
          setFeaturedProjects([]);
        }
      })
      .finally(() => {
        if (mounted) {
          setProjectsLoaded(true);
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

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
        {!projectsLoaded && <p className="state-message">Loading featured projects...</p>}
        {projectsLoaded && featuredProjects.length === 0 && (
          <p className="state-message">Featured projects are temporarily unavailable.</p>
        )}
        {featuredProjects.length > 0 && (
          <div className="project-grid compact">
            {featuredProjects.map((project) => (
              <article className="project-card compact-card" key={project.name}>
                <div className="project-category">{project.category}</div>
                <h3>{project.name}</h3>
                <p>{project.details_txt}</p>
                <div className="tag-list">
                  {parseProjectTags(project.tech_tags).map((tag) => <span key={tag}>{tag}</span>)}
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
