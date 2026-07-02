import React from "react";
import { Envelope, Github, Linkedin } from "react-bootstrap-icons";

const contactMethods = [
  {
    label: "LinkedIn",
    value: "linkedin.com/in/hariraj-venkatesan",
    href: "https://linkedin.com/in/hariraj-venkatesan",
    icon: Linkedin,
    badge: "Fastest response"
  },
  {
    label: "Email",
    value: "harirajv@gmail.com",
    href: "mailto:harirajv@gmail.com",
    icon: Envelope
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
        <h1>Let's connect.</h1>
        <p className="section-lede">
          Reach out about engineering roles, technical collaboration, or systems work.
        </p>

        <div className="direct-contact-grid contact-card-grid-spaced">
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
                <Icon className="contact-card-icon" aria-hidden="true" focusable="false" />
                <span className="contact-card-label">{method.label}</span>
                {method.badge && <span className="preferred-badge">{method.badge}</span>}
                <strong>{method.value}</strong>
              </a>
            );
          })}
        </div>
      </section>
    </main>
  );
}
