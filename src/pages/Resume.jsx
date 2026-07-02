import React from "react";

const education = [
  {
    title: "Master of Science - Software Engineering",
    years: "2022 - 2024",
    place: "Arizona State University, Tempe, AZ",
    detail: "Focused study in advanced data structures and algorithms, data science, data visualization, and programming paradigms."
  },
  {
    title: "Bachelor of Technology - Computer Science",
    years: "2015 - 2019",
    place: "SASTRA University, India",
    detail: "Coursework across algorithm design, data warehousing, machine learning techniques, and natural language processing."
  }
];

const experience = [
  {
    title: "DevOps Engineer",
    years: "2024 - Present",
    place: "Master Electronics, Phoenix, AZ",
    bullets: [
      "Automated infrastructure deployment with Terraform modules to promote consistency and simplify rollback across environments.",
      "Designed ECS services on AWS Fargate with Route 53 for service discovery for seamless communication between containerized services.",
      "Implemented NgRx SignalStore for reactive state management of Angular components."
    ]
  },
  {
    title: "Graduate Student Assistant",
    years: "2022 - 2024",
    place: "Arizona State University, Tempe, AZ",
    bullets: [
      "Taught data science, exploratory data analysis, data visualization, and machine learning algorithms for undergraduate and graduate students.",
      "Devised Python problems for pattern detection with Pandas and data-driven decision making with Matplotlib.",
      "Evaluated assignments and exam submissions for appropriate usage of data structures and optimized algorithm design."
    ]
  },
  {
    title: "Senior Software Engineer",
    years: "2019 - 2022",
    place: "Freshworks, Chennai, India",
    bullets: [
      "Created REST APIs for admin operations backed by Memcached for 60% faster response time.",
      "Developed JWT authorization for role-based API access between Spring Boot microservices.",
      "Created a fault-tolerant CI/CD pipeline on AWS Spot EC2 with dynamic scalability of Kubernetes pods.",
      "Built containerized test suites with Jenkins and reduced execution time from 2 hours to 30 minutes."
    ]
  }
];

export default function Resume() {
  return (
    <main className="page-shell">
      <section id="resume" className="section-block">
        <div className="section-kicker">Resume</div>
        <h1>Cloud, software, and delivery experience.</h1>
        <p className="section-lede">
          A snapshot of academic and professional work across AWS infrastructure, full-stack software, DevOps automation, and data science.
        </p>
        <a className="button primary" href="/assets/resume.pdf" target="_blank" rel="noreferrer">
          Download resume
        </a>

        <div className="resume-grid">
          <div>
            <h2 className="resume-title">Summary</h2>
            <article className="resume-item">
              <h3>Hariraj Venkatesan</h3>
              <p>
                Business-driven software engineer with 3+ years of experience designing scalable web applications on AWS and maintaining cloud infrastructure for reliable customer experiences.
              </p>
            </article>

            <h2 className="resume-title">Education</h2>
            {education.map((item) => (
              <article className="resume-item" key={item.title}>
                <h3>{item.title}</h3>
                <p className="resume-meta">{item.years}</p>
                <p><em>{item.place}</em></p>
                <p>{item.detail}</p>
              </article>
            ))}
          </div>

          <div>
            <h2 className="resume-title">Professional Experience</h2>
            {experience.map((item) => (
              <article className="resume-item" key={item.title}>
                <h3>{item.title}</h3>
                <p className="resume-meta">{item.years}</p>
                <p><em>{item.place}</em></p>
                <ul>
                  {item.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
