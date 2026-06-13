"use client";

import { ListIcon, XIcon } from "@phosphor-icons/react";
import Link from "next/link";
import { useState } from "react";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const routes = [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: "About", path: "/#about" },
    { name: "Contact", path: "/#contact" },
  ];

  return (
    <header className="flex justify-between items-center p-5 md:px-10 md:py-8">
      <h1 className="text-lg md:text-xl">Full Stack - Software Developer</h1>

      <div className="hidden md:flex gap-10">
        {routes.map((r, index) => (
          <Link
            key={index}
            href={r.path}
            className="text-lg hover:opacity-60 transition-opacity"
          >
            {r.name}
          </Link>
        ))}
      </div>

      <button
        className="md:hidden"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle menu"
      >
        {mobileOpen ? <XIcon size={28} /> : <ListIcon size={28} />}
      </button>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-[#F7F4EB] flex flex-col items-center justify-center gap-10">
          {routes.map((r, index) => (
            <Link
              key={index}
              href={r.path}
              className="text-3xl"
              onClick={() => setMobileOpen(false)}
            >
              {r.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;
