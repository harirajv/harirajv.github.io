import React from "react";

export default function About() {
  return (
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
            <p>
              AWS-backed services, CI/CD workflows, API-driven applications, and React or Angular frontends that make operational complexity easier to use.
            </p>
          </article>
          <article className="info-panel">
            <h2>How I work</h2>
            <p>
              I connect software design, deployment reliability, and practical data skills so teams can ship useful systems with fewer surprises.
            </p>
          </article>
          <article className="info-panel">
            <h2>Current focus</h2>
            <p>
              DevOps engineering, Terraform-based infrastructure, AWS container services, reactive frontends, and disciplined delivery pipelines.
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}
