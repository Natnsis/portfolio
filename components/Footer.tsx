"use client";

import { ArrowUpIcon } from "@phosphor-icons/react";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="max-w-[1060px] mx-auto px-7">
      <footer
        className="flex items-center justify-between gap-6 flex-wrap py-5.5 pb-[34px] border-t"
        style={{ borderColor: "var(--line)" }}
      >
        <span className="text-[13px]" style={{ color: "var(--ink-2)" }}>
          © {new Date().getFullYear()} Natnael Sisay
        </span>
        <Link
          href="/#top"
          className="inline-flex items-center gap-2.5 text-[13px] font-semibold transition-colors hover:text-[var(--ink)]"
          style={{ color: "var(--ink-2)" }}
        >
          <span
            className="w-7 h-7 rounded-full border grid place-items-center"
            style={{ borderColor: "var(--wire-2)" }}
          >
            <ArrowUpIcon size={13} />
          </span>
          Back to top
        </Link>
      </footer>
    </div>
  );
};

export default Footer;
