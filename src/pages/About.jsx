import React from "react";

const principles = [
  {
    title: "Make the secure path the easiest path.",
    body: "Good systems make the right choice feel natural. I design access, deployment, and infrastructure paths that reduce friction without weakening governance."
  },
  {
    title: "Turn repeated operational pain into reusable tools.",
    body: "When teams repeat the same reconciliation, deployment, migration, or recovery work, that is a signal to build something reusable instead of another one-off fix."
  },
  {
    title: "Design for rollback, recovery, and idempotency before scale.",
    body: "Reliable systems are built around failure paths from the beginning: safe retries, clear ownership boundaries, recoverable deploys, and data flows that tolerate real-world disorder."
  }
];

export default function About() {
  return (
    <main className="page-shell">
      <section id="about" className="section-block">
        <div className="section-kicker">About</div>
        <h1>How I build reliable systems.</h1>
        <p className="section-lede">
          I like work that turns messy operations into clear systems: moving data in real time, making cloud delivery safer, and giving engineers tools that remove recurring friction.
        </p>

        <div className="manifesto-panel">
          <p>
            I care about the hidden parts of engineering organizations that slow everything else down: stale data, risky deployments, unclear access boundaries, manual recovery, and useful prototypes that never become production systems.
          </p>
          <p>
            The best engineering work makes the right path obvious. It turns operational knowledge into systems teams can reuse, trust, and improve without relearning the same failure modes.
          </p>
        </div>

        <div className="content-grid principle-grid">
          {principles.map((principle) => (
            <article className="info-panel" key={principle.title}>
              <h2>{principle.title}</h2>
              <p>{principle.body}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
