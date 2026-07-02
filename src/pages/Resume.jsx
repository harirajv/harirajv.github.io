import React from "react";
import { Download } from "react-bootstrap-icons";

const RESUME_FILE_ID = "1zMuTmlzUL0fHbagxCjJXbjIXN0-Wwb9U";
const RESUME_PREVIEW_URL = `https://drive.google.com/file/d/${RESUME_FILE_ID}/preview`;
const RESUME_DOWNLOAD_URL = `https://drive.google.com/uc?export=download&id=${RESUME_FILE_ID}`;

export default function Resume() {
  return (
    <main className="page-shell">
      <section id="resume" className="section-block">
        <div className="page-title-row">
          <div>
            <div className="section-kicker">Career record</div>
            <h1>Experience, roles, and impact.</h1>
          </div>
          <a
            className="icon-download-button"
            href={RESUME_DOWNLOAD_URL}
            target="_blank"
            rel="noreferrer"
            aria-label="Download resume"
            title="Download resume"
          >
            <Download aria-hidden="true" focusable="false" />
          </a>
        </div>
        <p className="section-lede">
          A current copy is embedded below, with a Google Drive download available from the icon button.
        </p>

        <div className="resume-preview-shell">
          <iframe
            className="resume-preview"
            src={RESUME_PREVIEW_URL}
            title="Embedded career document"
            loading="lazy"
            allow="autoplay"
          />
        </div>
      </section>
    </main>
  );
}
