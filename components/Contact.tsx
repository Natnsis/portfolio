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
    <section className="section border-t border-border" id="contact">
      <div className="max-w-2xl">
        <p className="section-label">Contact</p>
        <h2 className="text-3xl md:text-4xl font-medium leading-tight mb-3">
          Let&apos;s build something together.
        </h2>
        <p className="text-base text-muted-foreground mb-8">
          Whether you have a project in mind or just want to say hi,
          I&apos;m always open to a conversation.
        </p>
        <div className="flex flex-col gap-3">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="inline-flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors w-fit"
            >
              <l.icon size={18} />
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;
