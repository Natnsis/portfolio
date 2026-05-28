"use client";

import { ArrowRightIcon } from "@phosphor-icons/react";

const ProjectsCut = () => {
  return (
    <div className="py-20">
      <div className="grid grid-cols-3 grid-rows-3 gap-5">
        <div
          className="col-span-2 row-span-1 h-48 bg-cover bg-center"
          style={{ backgroundImage: "url('/project.webp')" }}
        />
        <div className="p-20 bg-red-300 col-span-1 row-span-2"></div>
        <div className="p-20 bg-red-300 col-span-1 row-span-1"></div>
        <div className="p-20 bg-red-300 col-span-1 row-span-1"></div>
        <div className="p-20 bg-red-300 col-span-1 row-span-1"></div>
        <div className="p-20 bg-red-300 col-span-2 row-span-1"></div>
      </div>
      <div className="flex justify-center mt-10">
        View All Projects <ArrowRightIcon size={32} />
      </div>
    </div>
  );
};

export default ProjectsCut;
