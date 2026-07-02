import React from "react";

const contactMethods = [
  {
    label: "LinkedIn",
    value: "linkedin.com/in/hariraj-venkatesan",
    href: "https://linkedin.com/in/hariraj-venkatesan",
    iconSrc: "/assets/logos/linkedin-favicon.ico",
    badge: "Fastest response"
  },
  {
    label: "Email",
    value: "harirajv@gmail.com",
    href: "mailto:harirajv@gmail.com",
    iconSrc: "/assets/logos/gmail-favicon.ico"
  },
  {
    label: "GitHub",
    value: "github.com/harirajv",
    href: "https://github.com/harirajv",
    iconSrc: "/assets/logos/github-favicon.svg"
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
          {contactMethods.map((method) => (
            <a
              className="direct-contact-card"
              href={method.href}
              target={method.href.startsWith("http") ? "_blank" : undefined}
              rel={method.href.startsWith("http") ? "noreferrer" : undefined}
              key={method.label}
            >
              <img className="contact-card-icon" src={method.iconSrc} alt="" aria-hidden="true" />
              <span className="contact-card-label">{method.label}</span>
              {method.badge && <span className="preferred-badge">{method.badge}</span>}
              <strong>{method.value}</strong>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
