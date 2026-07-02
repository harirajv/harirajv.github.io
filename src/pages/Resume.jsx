import React from "react";

const highlights = [
  "12M+ daily change events across real-time CDC and enterprise data synchronization workflows.",
  "4-6 minute deployment cycles through containerized delivery paths and automated quality gates.",
  "25% lower MTTR through AI-assisted operational workflows and targeted platform automation.",
  "12 operational hours per week reclaimed through schema-driven automation.",
  "400+ enterprise client migrations supported through secure, queue-driven import tooling.",
  "75% CI pipeline latency reduction in earlier developer tooling work."
];

const timeline = [
  {
    role: "Platform Engineer",
    place: "Master Electronics",
    focus: "Real-time data platforms, zero-trust cloud foundations, delivery automation, and AI enablement."
  },
  {
    role: "Senior Software Engineer",
    place: "Freshworks",
    focus: "Customer import platforms, distributed auth/RBAC, CI/CD tooling, and legacy modernization."
  },
  {
    role: "SDE Intern",
    place: "Symantec",
    focus: "Enterprise browser-extension communication infrastructure and resilient coordination primitives."
  }
];

export default function Resume() {
  return (
    <main className="page-shell">
      <section id="resume" className="section-block">
        <div className="section-kicker">Resume</div>
        <h1>Platform engineering proof, without the resume clutter.</h1>
        <p className="section-lede">
          A focused snapshot of platform work across enterprise data movement, secure cloud foundations, developer tooling, and production AI enablement.
        </p>
        <a className="button primary" href="/assets/resume.pdf" target="_blank" rel="noreferrer">
          Download resume
        </a>

        <section className="resume-highlight-section" aria-labelledby="resume-proof-heading">
          <h2 id="resume-proof-heading" className="resume-title">Platform Engineering Proof</h2>
          <div className="resume-highlight-grid">
            {highlights.map((highlight) => (
              <article className="resume-highlight" key={highlight}>
                <p>{highlight}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="resume-highlight-section" aria-labelledby="resume-timeline-heading">
          <h2 id="resume-timeline-heading" className="resume-title">Career Timeline</h2>
          <div className="timeline-list">
            {timeline.map((item) => (
              <article className="timeline-item" key={`${item.role}-${item.place}`}>
                <h3>{item.role}</h3>
                <p className="resume-meta">{item.place}</p>
                <p>{item.focus}</p>
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
