"use client";

import { ArrowRightIcon, GlobeIcon } from "@phosphor-icons/react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import Link from "next/link";

const projects = [
  {
    title: "Snippet And Boilerplate Manager",
    live: "#",
    url: "/sbm.png",
    visit: "visit site",
  },
  {
    title: "Rate My Portfolio",
    live: "#",
    url: "/rmp(1).png",
    visit: "visit site",
  },
  {
    title: "Asu Students App",
    live: "#",
    url: "/asu.jpg",
    visit: "visit site",
  },
  {
    title: "Fimple NVIM Config",
    live: "#",
    url: "fimple.png",
    visit: "visit site",
  },
  {
    title: "Poster Boi",
    live: "#",
    url: "/tg.jpg",
    visit: "visit site",
  },
  {
    title: "Ecommerce Web App",
    live: "#",
    url: "/ecom-site.png",
    visit: "visit site",
  },
];

const ProjectsCut = () => {
  return (
    <div id="projects" className="py-10 md:py-20 px-4 md:px-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {projects.map((p, index) => {
          let className =
            "p-5 bg-cover bg-center flex flex-col justify-between min-h-[30vh] border border-black";
          if (index === 0) className += " md:col-span-2 md:row-span-1";
          else if (index === 1) className += " md:col-span-1 md:row-span-2";
          else if (index === 5) className += " md:col-span-2 md:row-span-1";

          return (
            <div
              key={index}
              className={className}
              style={{ backgroundImage: `url("${p.url}")` }}
            >
              <Badge className="text-sm md:text-lg rounded-full py-2 md:py-3 px-3 border-black">
                {p.title}
              </Badge>
              <div className="flex justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-black gap-2"
                >
                  <GlobeIcon size={20} />
                  Visit Site
                </Button>
              </div>
            </div>
          );
        })}
      </div>
      <Link
        href="/projects"
        className="flex justify-center mt-10 items-center gap-2 text-lg md:text-xl"
      >
        View All Projects <ArrowRightIcon size={24} className="md:w-8 md:h-8" />
      </Link>
    </div>
  );
};

export default ProjectsCut;
