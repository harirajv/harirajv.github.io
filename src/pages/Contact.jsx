import React from "react";
import { Envelope, Github, Linkedin } from "react-bootstrap-icons";

const contactMethods = [
  {
    label: "Email",
    value: "harirajv@gmail.com",
    href: "mailto:harirajv@gmail.com",
    icon: Envelope
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/hariraj-venkatesan",
    href: "https://linkedin.com/in/hariraj-venkatesan",
    icon: Linkedin
  },
  {
    label: "GitHub",
    value: "github.com/harirajv",
    href: "https://github.com/harirajv",
    icon: Github
  }
];

export default function Contact() {
  return (
    <main className="page-shell">
      <section id="contact" className="section-block contact">
        <div className="section-kicker">Contact</div>
        <h1>Let's talk platform engineering.</h1>
        <p className="section-lede">
          Reach out about enterprise modernization, platform engineering, secure cloud foundations, real-time data systems, or AI-enabled internal tooling.
        </p>

        <div className="direct-contact-grid">
          {contactMethods.map((method) => {
            const Icon = method.icon;
            return (
              <a
                className="direct-contact-card"
                href={method.href}
                target={method.href.startsWith("http") ? "_blank" : undefined}
                rel={method.href.startsWith("http") ? "noreferrer" : undefined}
                key={method.label}
              >
                <i aria-hidden="true"><Icon /></i>
                <span>{method.label}</span>
                <strong>{method.value}</strong>
              </a>
            );
          })}
        </div>
      </section>
    </main>
  );
}
