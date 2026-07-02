import React from "react";
import { Link } from "react-router-dom";
import { loadPortfolioSections, parseProjectTags } from "../projectData";

const pillars = [
  {
    title: "Real-Time Data Platforms",
    summary: "Event-driven systems that keep enterprise operations synchronized when stale data creates business risk.",
    tags: ["Kafka", "CDC", "Debezium", "Idempotency"]
  },
  {
    title: "Secure Cloud Foundations",
    summary: "Infrastructure paths where governed access, private networking, and rollback-safe delivery are the default.",
    tags: ["Terraform", "AWS OIDC", "PrivateLink", "ECS/Fargate"]
  },
  {
    title: "AI-Enabled Engineering Systems",
    summary: "Production-grade internal AI workflows that improve developer feedback loops and operational recovery.",
    tags: ["Databricks", "Bedrock RAG", "MCP Skills", "AIOps"]
  }
];

const metrics = [
  { value: "12M+", label: "daily change events" },
  { value: "4-6 min", label: "deployment cycles" },
  { value: "25%", label: "lower MTTR" },
  { value: "12 hrs/week", label: "operational toil reclaimed" }
];

const timeline = [
  {
    company: "Symantec",
    focus: "Enterprise extension infrastructure and resilient communication primitives."
  },
  {
    company: "Freshworks",
    focus: "Customer import platforms, distributed auth, CI/CD tooling, and modernization work."
  },
  {
    company: "Master Electronics",
    focus: "Platform ownership across real-time data, secure cloud foundations, delivery, and AI enablement."
  }
];

export default function Home() {
  const [featuredProjects, setFeaturedProjects] = React.useState([]);
  const [projectsLoaded, setProjectsLoaded] = React.useState(false);

  React.useEffect(() => {
    let mounted = true;

    loadPortfolioSections()
      .then(({ platformProjects }) => {
        if (mounted) {
          setFeaturedProjects(platformProjects.slice(0, 3));
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
      <section id="hero" className="hero-showcase platform-hero">
        <div className="hero-copy">
          <p className="terminal-line">$ platform engineering for enterprise modernization</p>
          <h1>I build the platforms that make enterprise engineering move faster.</h1>
          <p className="hero-summary">
            Real-time data platforms, zero-trust cloud infrastructure, and AI enablement for enterprises modernizing legacy systems.
          </p>
          <div className="hero-actions">
            <Link className="button primary" to="/portfolio">View platform work</Link>
            <a className="button" href="mailto:harirajv@gmail.com">Email me</a>
            <a className="button" href="https://linkedin.com/in/hariraj-venkatesan" target="_blank" rel="noreferrer">LinkedIn</a>
            <a className="button" href="https://github.com/harirajv" target="_blank" rel="noreferrer">GitHub</a>
          </div>
        </div>
        <div className="systems-map" aria-hidden="true">
          <span className="system-line line-one" />
          <span className="system-line line-two" />
          <span className="system-line line-three" />
          <div className="system-node node-aws"><strong>Secure Cloud</strong><span>Terraform, OIDC, PrivateLink</span></div>
          <div className="system-node node-delivery"><strong>Real-Time Data</strong><span>Kafka, CDC, DLQ recovery</span></div>
          <div className="system-node node-apps"><strong>AI Enablement</strong><span>Databricks, RAG, MCP</span></div>
          <div className="system-node node-data"><strong>Velocity</strong><span>Faster deploys, lower MTTR</span></div>
        </div>
      </section>

      <section className="section-block pillar-section">
        <div className="section-kicker">Platform pillars</div>
        <h2>Modernization work that removes enterprise drag.</h2>
        <div className="content-grid">
          {pillars.map((pillar) => (
            <article className="info-panel pillar-card" key={pillar.title}>
              <h3>{pillar.title}</h3>
              <p>{pillar.summary}</p>
              <div className="tag-list">
                {pillar.tags.map((tag) => <span key={tag}>{tag}</span>)}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="metric-grid platform-metrics" aria-label="Platform engineering proof points">
        {metrics.map((metric) => (
          <article className="metric-card" key={metric.label}>
            <strong>{metric.value}</strong>
            <span>{metric.label}</span>
          </article>
        ))}
      </section>

      <section className="section-block home-work">
        <div className="section-kicker">Featured platform work</div>
        <h2>Case studies with measurable platform outcomes.</h2>
        {!projectsLoaded && <p className="state-message">Loading featured platform work...</p>}
        {projectsLoaded && featuredProjects.length === 0 && (
          <p className="state-message">Featured platform work is temporarily unavailable.</p>
        )}
        {featuredProjects.length > 0 && (
          <div className="project-grid compact">
            {featuredProjects.map((project) => (
              <article className="project-card compact-card platform-case-card" key={project.name}>
                <div className="project-category">{project.category}</div>
                <h3>{project.name}</h3>
                <p><strong>Problem:</strong> {project.problem}</p>
                <p><strong>Platform move:</strong> {project.platform_move}</p>
                <p><strong>Outcome:</strong> {project.outcome}</p>
                <div className="tag-list">
                  {parseProjectTags(project.tech_tags).map((tag) => <span key={tag}>{tag}</span>)}
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="section-block timeline-section">
        <div className="section-kicker">Career arc</div>
        <h2>Platform work before and beyond the title.</h2>
        <div className="timeline-list">
          {timeline.map((item) => (
            <article className="timeline-item" key={item.company}>
              <h3>{item.company}</h3>
              <p>{item.focus}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
