"use client";

import { ArrowRightIcon, GlobeIcon } from "@phosphor-icons/react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

const ProjectsCut = () => {
  return (
    <div className="py-20 px-20">
      <div className="grid grid-cols-3 grid-rows-3 gap-5">
        <div
          className="p-5 col-span-2 row-span-1 h-40 bg-cover bg-center flex flex-col justify-between"
          style={{ backgroundImage: "url('/project.webp')" }}
        >
          <Badge className="text-lg rounded-full py-3 px-3">
            Snippet And Boilerplate Manager
          </Badge>
          <div className="flex justify-end">
            <Button variant="outline" size="sm">
              <GlobeIcon size={20} />
              Visit Site
            </Button>
          </div>
        </div>
        <div
          className="col-span-1 row-span-2  bg-cover bg-center"
          style={{ backgroundImage: "url('/project.webp')" }}
        >
          hehe
        </div>
        <div
          className="bg-red-300 col-span-1 row-span-1 bg-cover bg-center"
          style={{ backgroundImage: "url('/project.webp')" }}
        ></div>
        <div
          className="bg-red-300 col-span-1 row-span-1 bg-cover bg-center"
          style={{ backgroundImage: "url('/project.webp')" }}
        ></div>
        <div
          className="bg-red-300 col-span-1 row-span-1 bg-cover bg-center"
          style={{ backgroundImage: "url('/project.webp')" }}
        ></div>
        <div
          className="bg-red-300 col-span-2 row-span-1 bg-cover bg-center"
          style={{ backgroundImage: "url('/project.webp')" }}
        ></div>
      </div>
      <div className="flex justify-center mt-10 items-center text-xl">
        View All Projects <ArrowRightIcon size={32} />
      </div>
    </div>
  );
};

export default ProjectsCut;
