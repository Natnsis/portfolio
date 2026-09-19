"use client";

import { ArrowRightIcon } from "@phosphor-icons/react";

const EMAIL = "nsisay49@gmail.com";

const Contact = () => {
  return (
    <section
      id="contact"
      className="py-[78px] pb-[88px] border-t grid md:grid-cols-2 gap-14 items-center"
      style={{ borderColor: "var(--line)" }}
    >
      <div>
        <p
          className="text-[11px] font-semibold tracking-[.02em] mb-3"
          style={{ color: "var(--ink-3)" }}
        >
          Contact
        </p>
        <h2
          className="font-extrabold tracking-[-0.045em] leading-[1.02] mb-4"
          style={{ fontSize: "clamp(30px,4.2vw,44px)", color: "var(--ink)" }}
        >
          Let&apos;s build{" "}
          <span
            style={{
              color: "transparent",
              WebkitTextStroke: "1.4px var(--ink)",
            }}
          >
            something together.
          </span>
        </h2>
        <p
          className="text-[15px] leading-[1.6] max-w-[38ch]"
          style={{ color: "var(--ink-2)" }}
        >
          Whether you have a project in mind or just want to say hi, I&apos;m
          always open to a conversation.
        </p>
      </div>

      <div className="flex flex-col gap-2.5">
        <a
          href={`mailto:${EMAIL}`}
          className="flex items-center justify-between text-[15px] font-semibold px-5.5 py-[17px] rounded-[10px] whitespace-nowrap transition-opacity hover:opacity-90"
          style={{ background: "var(--dark)", color: "var(--bg)" }}
        >
          {EMAIL} <ArrowRightIcon size={16} />
        </a>
        <div className="grid grid-cols-3 gap-2.5">
          <a
            href="https://github.com/Natnsis"
            target="_blank"
            rel="noopener noreferrer"
            className="text-center border text-[13px] font-semibold px-2.5 py-3.5 rounded-[10px] transition-colors hover:bg-[var(--card)]"
            style={{ borderColor: "var(--wire-2)", color: "var(--ink)" }}
          >
            GitHub
          </a>
          <a
            href="https://t.me/Flawless_22_4"
            target="_blank"
            rel="noopener noreferrer"
            className="text-center border text-[13px] font-semibold px-2.5 py-3.5 rounded-[10px] transition-colors hover:bg-[var(--card)]"
            style={{ borderColor: "var(--wire-2)", color: "var(--ink)" }}
          >
            Telegram
          </a>
          <a
            href="https://x.com/NatnaelSis24858"
            target="_blank"
            rel="noopener noreferrer"
            className="text-center border text-[13px] font-semibold px-2.5 py-3.5 rounded-[10px] transition-colors hover:bg-[var(--card)]"
            style={{ borderColor: "var(--wire-2)", color: "var(--ink)" }}
          >
            X
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
