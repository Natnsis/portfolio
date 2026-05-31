"use client";

import { ArrowRightIcon, GlobeIcon } from "@phosphor-icons/react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import Link from "next/link";

const projects = [
  { title: "E-Commerce Platform", desc: "Full-stack online store with payments and inventory management" },
  { title: "AI Chat Application", desc: "Real-time messaging with AI-powered responses and analytics" },
  { title: "Analytics Dashboard", desc: "Interactive dashboard for SaaS metrics and user insights" },
];

const LatestWork = () => {
  return (
    <div className="py-10 md:py-20 px-4 md:px-10 border-y border-black">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-4xl md:text-5xl">Latest Work</h1>
          <p className="text-base md:text-lg mt-2">Recent projects I have built</p>
        </div>
        <Link
          href="/projects"
          className="hidden md:flex items-center gap-2 text-lg"
        >
          View All <ArrowRightIcon size={24} />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {projects.map((p, i) => (
          <div
            key={i}
            className="border border-black p-5 flex flex-col justify-between min-h-[300px] bg-cover bg-center"
            style={{ backgroundImage: "url('/project.webp')" }}
          >
            <Badge variant="outline" className="rounded-full border-black text-sm">
              {p.title}
            </Badge>
            <div>
              <p className="text-sm mb-3 bg-[#F7F4EB]/80 inline-block px-2 py-1">{p.desc}</p>
              <div>
                <Button variant="outline" size="sm" className="border-black gap-2">
                  <GlobeIcon size={16} /> Visit
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Link
        href="/projects"
        className="flex md:hidden justify-center mt-6 items-center gap-2 text-lg"
      >
        View All Projects <ArrowRightIcon size={24} />
      </Link>
    </div>
  );
};

export default LatestWork;
