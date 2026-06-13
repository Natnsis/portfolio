"use client";

import { EnvelopeIcon } from "@phosphor-icons/react";
import Link from "next/link";

const routes = [
  { name: "Home", path: "/" },
  { name: "Projects", path: "/projects" },
  { name: "About", path: "/#about" },
];

const Footer = () => {
  return (
    <footer className="border-t border-border py-8">
      <div className="grid md:grid-cols-2 gap-6 items-end">
        <div className="flex gap-6">
          {routes.map((r, i) => (
            <Link
              key={i}
              href={r.path}
              className="text-xs uppercase tracking-widest hover:underline underline-offset-4 decoration-1 transition-all"
            >
              {r.name}
            </Link>
          ))}
        </div>

        <div className="flex justify-start md:justify-end">
          <a
            href="mailto:nsisay49@gmail.com"
            className="text-xs uppercase tracking-widest hover:underline underline-offset-4 decoration-1 transition-all inline-flex items-center gap-2"
          >
            <EnvelopeIcon size={14} />
            nsisay49@gmail.com
          </a>
        </div>
      </div>
      <p className="text-xs text-muted-foreground text-center mt-6">
        &copy; {new Date().getFullYear()} Natnael Sisay
      </p>
    </footer>
  );
};

export default Footer;
