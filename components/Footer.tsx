"use client";
import { DownloadSimpleIcon, EnvelopeIcon } from "@phosphor-icons/react";
import { Button } from "./ui/button";
import Link from "next/link";

const routes = [
  { name: "Home", path: "/" },
  { name: "Projects", path: "/projects" },
  { name: "About", path: "/#about" },
  { name: "Contact", path: "/#contact" },
];

const Footer = () => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-end p-5 mt-10 h-40">
        <div className="flex flex-col gap-6 ">
          <div className="flex gap-3">
            {routes.map((r, i) => (
              <Link
                key={i}
                href={r.path}
                className="text-lg md:text-xl hover:opacity-60 transition-opacity"
              >
                {r.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex justify-start md:justify-end">
          <a
            href="mailto:nsisay49@gmail.com"
            className="text-lg md:text-2xl hover:opacity-60 transition-opacity break-all flex items-center"
          >
            <EnvelopeIcon size={28} className="inline mb-1 md:mb-2 mr-2" />
            nsisay49@gmail.com
          </a>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <p>&copy; {new Date().getFullYear()}. Natnael Sisay</p>
      </div>
    </div>
  );
};

export default Footer;
