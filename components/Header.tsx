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
    <header className="flex justify-between items-center py-8">
      <Link href="/" className="text-sm font-medium tracking-tight">
        N. Sisay
      </Link>

      <div className="hidden md:flex gap-10">
        {routes.map((r, index) => (
          <Link
            key={index}
            href={r.path}
            className="text-xs uppercase tracking-widest hover:underline underline-offset-4 decoration-1 transition-all"
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
        {mobileOpen ? <XIcon size={22} /> : <ListIcon size={22} />}
      </button>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 bg-background flex flex-col items-center justify-center gap-12">
          {routes.map((r, index) => (
            <Link
              key={index}
              href={r.path}
              className="text-2xl uppercase tracking-widest"
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
