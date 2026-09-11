"use client";

import { EnvelopeIcon, TelegramLogoIcon, XLogoIcon, GithubLogoIcon } from "@phosphor-icons/react";

const links = [
  { icon: EnvelopeIcon, label: "nsisay49@gmail.com", href: "mailto:nsisay49@gmail.com" },
  { icon: GithubLogoIcon, label: "GitHub", href: "#" },
  { icon: TelegramLogoIcon, label: "Telegram", href: "#" },
  { icon: XLogoIcon, label: "X / Twitter", href: "#" },
];

const Contact = () => {
  return (
    <section className="section" id="contact">
      <div className="rounded-3xl bg-secondary text-secondary-foreground p-8 md:p-12">
        <div className="flex items-center gap-2 mb-4">
          <span className="w-6 h-6 rounded-lg bg-secondary-foreground/10 text-primary flex items-center justify-center shrink-0">
            <EnvelopeIcon size={13} weight="bold" />
          </span>
          <p className="font-mono text-xs uppercase tracking-widest text-secondary-foreground/50">
            Contact
          </p>
        </div>
        <div className="max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-3">
            Let&apos;s build something together.
          </h2>
          <p className="text-base text-secondary-foreground/60 mb-8">
            Whether you have a project in mind or just want to say hi,
            I&apos;m always open to a conversation.
          </p>
          <div className="flex flex-wrap gap-3">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="inline-flex items-center gap-2 text-sm rounded-full border border-secondary-foreground/15 px-4 py-2.5 text-secondary-foreground/70 hover:text-secondary-foreground hover:border-secondary-foreground/40 transition-colors"
              >
                <l.icon size={16} />
                {l.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
