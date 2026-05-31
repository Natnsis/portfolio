"use client";

import { EnvelopeIcon, DownloadSimpleIcon } from "@phosphor-icons/react";
import { Button } from "./ui/button";
import Link from "next/link";

const routes = [
  { name: "Home", path: "/" },
  { name: "Projects", path: "/projects" },
  { name: "About", path: "/#about" },
  { name: "Contact", path: "/#contact" },
];

const Contact = () => {
  return (
    <div id="contact" className="py-10 md:py-20 px-4 md:px-10 border-t border-black">
      <p className="text-lg md:text-xl mb-1 md:mb-2">Got a project idea?</p>
      <h1 className="text-4xl md:text-6xl lg:text-7xl mb-10 md:mb-16 leading-tight">
        Let&apos;s bring it to life
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-end">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            {routes.map((r, i) => (
              <Link
                key={i}
                href={r.path}
                className="text-xl md:text-2xl hover:opacity-60 transition-opacity"
              >
                {r.name}
              </Link>
            ))}
          </div>
          <Button
            variant="outline"
            className="border-black rounded-none text-base gap-2 w-fit px-6 py-5"
          >
            <DownloadSimpleIcon size={20} />
            Download Resume
          </Button>
        </div>

        <div className="flex justify-start md:justify-end">
          <a
            href="mailto:nsisay49@gmail.com"
            className="text-2xl md:text-4xl lg:text-5xl hover:opacity-60 transition-opacity break-all"
          >
            <EnvelopeIcon size={28} className="inline mb-1 md:mb-2 mr-2" />
            nsisay49@gmail.com
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
