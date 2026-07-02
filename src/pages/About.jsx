import React from "react";

const principles = [
  {
    title: "Make the secure path the easiest path.",
    body: "Platform work should remove the temptation to bypass governance. I design cloud foundations where scoped access, private connectivity, and repeatable delivery are the default route."
  },
  {
    title: "Turn repeated operational pain into platform capability.",
    body: "When teams repeat the same reconciliation, deployment, migration, or recovery work, that is a signal to build a reusable system instead of another one-off fix."
  },
  {
    title: "Design for rollback, recovery, and idempotency before scale.",
    body: "Reliable platforms are built around failure paths from the beginning: safe retries, clear ownership boundaries, recoverable deploys, and data flows that tolerate real-world disorder."
  }
];

export default function About() {
  return (
    <main className="page-shell">
      <section id="about" className="section-block">
        <div className="section-kicker">About</div>
        <h1>Platform engineering is how repeated operational pain becomes reusable capability.</h1>
        <p className="section-lede">
          I build backend platforms and security-first cloud foundations for enterprises modernizing legacy systems. My work sits where event-driven architecture, infrastructure governance, and developer enablement meet.
        </p>

        <div className="manifesto-panel">
          <p>
            I care about the parts of engineering organizations that slow everything else down: stale data, risky deployments, unclear access boundaries, manual recovery, and prototypes that never become production systems.
          </p>
          <p>
            The best platform work makes the right path obvious. It turns operational knowledge into systems teams can reuse, trust, and improve without relearning the same failure modes.
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
