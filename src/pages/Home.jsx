import React from "react";
import { Link } from "react-router-dom";
import { loadPortfolioSections, parseProjectTags } from "../projectData";

const pillars = [
  {
    title: "Real-Time Data Systems",
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
    years: "2015-2017",
    company: "Symantec",
    logo: { src: "/assets/logos/norton-favicon.ico", tone: "symantec" },
    focus: "Enterprise extension infrastructure and resilient communication primitives."
  },
  {
    years: "2017-2023",
    company: "Freshworks",
    logo: { src: "/assets/logos/freshworks-favicon.ico", tone: "freshworks" },
    focus: "Customer import systems, distributed auth, CI/CD tooling, and modernization work."
  },
  {
    years: "2023-Present",
    company: "Master Electronics",
    logo: { src: "/assets/logos/master-electronics.svg", tone: "master" },
    focus: "Ownership across real-time data, secure cloud foundations, delivery, and AI enablement."
  }
];

const productLogos = {
  AWS: { src: "/assets/logos/aws.svg", tone: "aws" },
  "AWS OIDC": { src: "/assets/logos/aws-iam.svg", tone: "aws" },
  Bedrock: { src: "/assets/logos/amazon-bedrock.svg", tone: "aws" },
  "Bedrock RAG": { src: "/assets/logos/amazon-bedrock.svg", tone: "aws" },
  CloudWatch: { src: "/assets/logos/aws-cloudwatch.svg", tone: "aws" },
  Databricks: { src: "/assets/logos/databricks.svg", tone: "databricks" },
  Debezium: { src: "/assets/logos/debezium-favicon.ico", tone: "debezium" },
  Docker: { src: "/assets/logos/docker.svg", tone: "docker" },
  ECS: { src: "/assets/logos/aws-ecs.svg", tone: "aws" },
  "ECS/Fargate": { src: "/assets/logos/aws-fargate.svg", tone: "aws" },
  Fargate: { src: "/assets/logos/aws-fargate.svg", tone: "aws" },
  "GitHub Actions": { src: "/assets/logos/github-actions.svg", tone: "github" },
  Kafka: { src: "/assets/logos/apache-kafka.svg", tone: "kafka" },
  PostgreSQL: { src: "/assets/logos/postgresql-favicon.ico", tone: "postgres" },
  Terraform: { src: "/assets/logos/terraform.svg", tone: "terraform" }
};

const techLabels = {
  Bedrock: "Amazon Bedrock",
  "Bedrock RAG": "Amazon Bedrock"
};

function TechTag({ tag }) {
  const logo = productLogos[tag];
  const label = techLabels[tag] || tag;
  const className = ["tech-tag", logo ? "tech-product-tag" : "tech-concept-tag", logo?.tone ? `tech-logo-${logo.tone}` : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={className}>
      {logo && <img className="tech-logo-icon" src={logo.src} alt="" aria-hidden="true" />}
      <em>{label}</em>
    </span>
  );
}

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
          <h1>I build the systems that make enterprise engineering move faster.</h1>
          <p className="hero-summary">
            Real-time data, zero-trust cloud infrastructure, and AI enablement for enterprises modernizing legacy systems.
          </p>
          <div className="hero-actions">
            <Link className="button primary" to="/portfolio">View projects</Link>
            <a className="button" href="mailto:harirajv@gmail.com">
              <img className="button-favicon" src="/assets/logos/gmail-favicon.ico" alt="" aria-hidden="true" />
              Email me
            </a>
            <a className="button" href="https://linkedin.com/in/hariraj-venkatesan" target="_blank" rel="noreferrer">
              <img className="button-favicon" src="/assets/logos/linkedin-favicon.ico" alt="" aria-hidden="true" />
              LinkedIn
            </a>
            <a className="button" href="https://github.com/harirajv" target="_blank" rel="noreferrer">
              <img className="button-favicon" src="/assets/logos/github-favicon.svg" alt="" aria-hidden="true" />
              GitHub
            </a>
          </div>
        </div>
        <section className="control-plane" aria-label="Control Plane">
          <div className="control-plane-header">
            <div>
              <span className="control-plane-kicker">Control Plane</span>
              <strong>Enterprise modernization live</strong>
            </div>
            <span className="status-pill">Healthy</span>
          </div>
          <div className="control-plane-grid" aria-label="System signals">
            <article className="signal-card">
              <span>CDC stream</span>
              <strong>12M+ events/day</strong>
            </article>
            <article className="signal-card">
              <span>Secure deploy</span>
              <strong>OIDC + PrivateLink</strong>
            </article>
            <article className="signal-card">
              <span>AI recovery</span>
              <strong>25% lower MTTR</strong>
            </article>
          </div>
          <div className="event-stream" aria-label="Delivery event stream">
            <div><span>09:42</span><strong>schema contract verified</strong></div>
            <div><span>09:44</span><strong>blue/green release staged</strong></div>
            <div><span>09:47</span><strong>dead-letter replay cleared</strong></div>
            <div><span>09:49</span><strong>runbook assistant updated</strong></div>
          </div>
          <div className="control-plane-metrics" aria-label="Operational outcomes">
            <span>4-6 min deploys</span>
            <span>12 hrs/week reclaimed</span>
            <span>rollback-ready paths</span>
          </div>
        </section>
      </section>

      <section className="section-block pillar-section">
        <div className="section-kicker">Core systems</div>
        <h2>Modernization work that removes enterprise drag.</h2>
        <div className="content-grid">
          {pillars.map((pillar) => (
            <article className="info-panel pillar-card" key={pillar.title}>
              <h3>{pillar.title}</h3>
              <p>{pillar.summary}</p>
              <div className="tag-list">
                {pillar.tags.map((tag) => <TechTag tag={tag} key={tag} />)}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="metric-grid platform-metrics" aria-label="Engineering proof points">
        {metrics.map((metric) => (
          <article className="metric-card" key={metric.label}>
            <strong>{metric.value}</strong>
            <span>{metric.label}</span>
          </article>
        ))}
      </section>

      <section className="section-block home-work">
        <div className="section-kicker">Featured case studies</div>
        <h2>Proof in production.</h2>
        {!projectsLoaded && <p className="state-message">Loading featured work...</p>}
        {projectsLoaded && featuredProjects.length === 0 && (
          <p className="state-message">Featured work is temporarily unavailable.</p>
        )}
        {featuredProjects.length > 0 && (
          <div className="project-grid compact">
            {featuredProjects.map((project) => (
              <article className="project-card compact-card platform-case-card" key={project.name}>
                <h3>{project.name}</h3>
                <div className="home-case-row">
                  <strong>Problem</strong>
                  <p>{project.problem}</p>
                </div>
                <div className="home-case-row">
                  <strong>Action</strong>
                  <p>{project.platform_move}</p>
                </div>
                <div className="home-case-row">
                  <strong>Outcome</strong>
                  <p>{project.outcome}</p>
                </div>
                <div className="tag-list">
                  {parseProjectTags(project.tech_tags).map((tag) => <TechTag tag={tag} key={tag} />)}
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="section-block timeline-section">
        <div className="section-kicker">Career arc</div>
        <h2>Systems work before and beyond the title.</h2>
        <ol className="timeline-list" aria-label="Career progression">
          {timeline.map((item) => (
            <li className="timeline-item" key={item.company}>
              <span className="timeline-year">{item.years}</span>
              <h3 className="timeline-company">
                <span className={`timeline-logo timeline-logo-${item.logo.tone}`}>
                  <img src={item.logo.src} alt="" aria-hidden="true" />
                </span>
                <span>{item.company}</span>
              </h3>
              <p>{item.focus}</p>
            </li>
          ))}
        </ol>
      </section>
    </main>
  );
}
