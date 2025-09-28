import * as React from "react";

interface EmailTemplateProps {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export function EmailTemplate({
  name,
  email,
  subject,
  message,
}: EmailTemplateProps) {
  return (
    <div
      style={{
        fontFamily: "system-ui, sans-serif",
        lineHeight: 1.6,
        color: "#1a1a1a",
      }}
    >
      <h2
        style={{
          fontSize: "24px",
          fontWeight: 600,
          marginBottom: "16px",
          color: "#2a2a2a",
        }}
      >
        New Contact Form Submission
      </h2>

      <div style={{ marginBottom: "20px" }}>
        <p style={{ margin: "8px 0" }}>
          <strong style={{ color: "#2a2a2a" }}>Name:</strong> {name}
        </p>
        <p style={{ margin: "8px 0" }}>
          <strong style={{ color: "#2a2a2a" }}>Email:</strong>{" "}
          <a
            href={`mailto:${email}`}
            style={{ color: "#1a56db", textDecoration: "none" }}
          >
            {email}
          </a>
        </p>
        <p style={{ margin: "8px 0" }}>
          <strong style={{ color: "#2a2a2a" }}>Subject:</strong> {subject}
        </p>
      </div>

      <div>
        <p style={{ margin: "8px 0", fontWeight: 600, color: "#2a2a2a" }}>
          Message:
        </p>
        <div
          style={{
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
            marginTop: "8px",
            padding: "12px",
            backgroundColor: "#f9f9f9",
            borderLeft: "3px solid #e0e0e0",
            fontSize: "15px",
            color: "#333",
          }}
        >
          {message}
        </div>
      </div>
    </div>
  );
}
