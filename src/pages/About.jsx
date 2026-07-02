import React from "react";

const pillars = [
  {
    number: "01",
    label: "Secure defaults",
    title: "Make the secure path the easiest path.",
    body: "Good systems make the right choice feel natural. I design access, deployment, and infrastructure paths that reduce friction without weakening governance."
  },
  {
    number: "02",
    label: "Reusable tools",
    title: "Turn repeated operational pain into reusable tools.",
    body: "When teams repeat the same reconciliation, deployment, migration, or recovery work, that is a signal to build something reusable instead of another one-off fix."
  },
  {
    number: "03",
    label: "Recovery-first design",
    title: "Design for rollback, recovery, and idempotency before scale.",
    body: "Reliable systems are built around failure paths from the beginning: safe retries, clear ownership boundaries, recoverable deploys, and data flows that tolerate real-world disorder."
  }
];

export default function About() {
  return (
    <main className="page-shell">
      <section id="about" className="section-block">
        <div className="section-kicker">Workstyle</div>
        <h1>How I build reliable systems.</h1>
        <p className="section-lede">
          I turn operational friction into secure, reusable systems that help teams ship and recover with less guesswork.
        </p>

        <div className="workstyle-intro">
          <div className="manifesto-panel">
            <p>
              My work starts where teams lose time: stale data, risky deploys, unclear access, manual recovery, and prototypes that need a production path.
            </p>
          </div>
          <figure className="workstyle-flow-figure">
            <img
              className="workstyle-flow"
              src="/assets/img/devops-toolchain.svg"
              alt="DevOps toolchain loop showing plan, create, verify, package, release, configure, monitor, and version control."
            />
            <figcaption>
              DevOps workflow illustration by Kharnagy, licensed{" "}
              <a href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a>.
            </figcaption>
          </figure>
        </div>

        <div className="workstyle-pillars" aria-label="Workstyle pillars">
          {pillars.map((pillar) => (
            <article className="workstyle-pillar" key={pillar.label}>
              <span className="workstyle-pillar-number">{pillar.number}</span>
              <div>
                <h2>{pillar.label}</h2>
                <strong>{pillar.title}</strong>
                <p>{pillar.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
