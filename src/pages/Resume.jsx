import React from "react";

const RESUME_FILE_ID = "1zMuTmlzUL0fHbagxCjJXbjIXN0-Wwb9U";
const RESUME_PREVIEW_URL = `https://drive.google.com/file/d/${RESUME_FILE_ID}/preview`;
const RESUME_DOWNLOAD_URL = `https://drive.google.com/uc?export=download&id=${RESUME_FILE_ID}`;

export default function Resume() {
  return (
    <main className="page-shell">
      <section id="resume" className="section-block">
        <div className="section-kicker">Resume</div>
        <h1>Resume</h1>
        <p className="section-lede">
          View the latest resume below, or download a copy from Google Drive.
        </p>
        <a className="button primary" href={RESUME_DOWNLOAD_URL} target="_blank" rel="noreferrer">
          Download resume
        </a>

        <div className="resume-preview-shell">
          <iframe
            className="resume-preview"
            src={RESUME_PREVIEW_URL}
            title="Resume preview"
            loading="lazy"
            allow="autoplay"
          />
        </div>
      </section>
    </main>
  );
}
