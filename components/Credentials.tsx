"use client";

import Image from "next/image";
import { FileArrowDownIcon } from "@phosphor-icons/react";

const credentials = [
  {
    title: "B.Sc. in Computer Science",
    issuer: "Addis Ababa University",
    date: "2021 – 2025",
    description:
      "Four-year degree with a focus on software engineering, algorithms, data structures, and distributed systems. Graduated with a strong foundation in both theory and practical application.",
    image: "/asu.jpg",
    fileUrl: "#",
  },
  {
    title: "Full Stack Web Development",
    issuer: "FreeCodeCamp",
    date: "2024",
    description:
      "Comprehensive certification covering modern web development — React, Node.js, databases, and API design. Built multiple projects as part of the curriculum.",
    image: "/another.webp",
    fileUrl: "#",
  },
  {
    title: "Professional Resume",
    issuer: "Self",
    date: "2025",
    description:
      "Detailed resume outlining professional experience, technical skills, and a portfolio of shipped projects. Available in PDF format.",
    image: "/project.webp",
    fileUrl: "/resume.pdf",
  },
  {
    title: "AWS Cloud Practitioner",
    issuer: "Amazon Web Services",
    date: "2024",
    description:
      "Foundational certification validating knowledge of AWS cloud architecture, core services, pricing models, and best practices for building on the cloud.",
    image: "/another.webp",
    fileUrl: "#",
  },
];

const Credentials = () => {
  return (
    <section className="section" id="credentials">
      <p className="section-label">Credentials</p>
      <h1 className="text-3xl md:text-4xl font-medium mb-3">
        Education &amp; Documents
      </h1>
      <p className="text-muted-foreground text-sm mb-12 max-w-lg leading-relaxed">
        A collection of certificates, degrees, and professional documents.
        Each one represents a milestone I have worked toward.
      </p>

      <div className="space-y-0">
        {credentials.map((c, i) => (
          <div
            key={i}
            className="border-l-[3px] border-primary pl-5 md:pl-7 py-7 md:py-8 border-b border-border last:border-b-0"
          >
            <div className="flex items-start gap-3 mb-2">
              <span className="text-xs font-mono text-muted-foreground mt-0.5">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex-1 min-w-0">
                <div className="grid md:grid-cols-[200px_1fr] gap-5 md:gap-8">
                  <div className="order-2 md:order-1">
                    <div className="relative border border-border overflow-hidden aspect-[4/3]">
                      <Image
                        src={c.image}
                        alt={c.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div className="order-1 md:order-2">
                    <h2 className="text-base md:text-lg font-medium leading-snug">
                      {c.title}
                    </h2>
                    <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-1 text-xs text-muted-foreground">
                      <span>{c.issuer}</span>
                      <span className="hidden md:inline">&middot;</span>
                      <span>{c.date}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                      {c.description}
                    </p>
                    <div className="mt-3">
                      <a
                        href={c.fileUrl}
                        download
                        className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest border border-border px-3 py-1.5 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
                      >
                        <FileArrowDownIcon size={13} />
                        Download
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Credentials;
