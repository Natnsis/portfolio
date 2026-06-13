"use client";

import { EnvelopeIcon, TelegramLogoIcon, XLogoIcon } from "@phosphor-icons/react";

const Contact = () => {
  return (
    <section className="section text-center" id="contact">
      <p className="section-label">Contact</p>
      <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium leading-[0.9] tracking-tight mb-8">
        Let&apos;s work
        <br />
        together
      </h2>
      <div className="flex items-center justify-center gap-5">
        <a
          href="mailto:nsisay49@gmail.com"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest hover:underline underline-offset-4 decoration-1 transition-all"
        >
          <EnvelopeIcon size={18} />
          Email
        </a>
        <a
          href="#"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest hover:underline underline-offset-4 decoration-1 transition-all"
        >
          <TelegramLogoIcon size={18} />
          Telegram
        </a>
        <a
          href="#"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest hover:underline underline-offset-4 decoration-1 transition-all"
        >
          <XLogoIcon size={18} />
          Twitter
        </a>
      </div>
    </section>
  );
};

export default Contact;
