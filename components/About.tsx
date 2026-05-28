"use client";

import { GlobeIcon } from "@phosphor-icons/react";
import { Badge } from "./ui/badge";
import Image from "next/image";

const About = () => {
  return (
    <div className="py-10 grid grid-cols-3">
      <div>
        <h1>About Me</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut hic
          voluptate, delectus sed, laborum, quis neque iure debitis soluta
          fugiat reiciendis voluptatibus enim praesentium quidem aliquam
          voluptatum eum natus ducimus!
        </p>
      </div>

      <div className="flex flex-col gap-5 bg-red-200 px-10 py-5">
        <Badge>
          <GlobeIcon size={20} />
        </Badge>
        <h1>120%</h1>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorem odio
          harum fugit amet, vel saepe molestiae voluptas magni, eos, nostrum
          velit impedit animi? Magnam reiciendis ipsam dicta animi, ea pariatur.
        </p>
        <Image alt="natnael" width={300} height={100} src="/project.webp" />
      </div>

      <div className="bg-blue-200 px-5">
        <div className="flex justify-center">
          <Image alt="natnael" width={200} height={200} src="/another.webp" />
        </div>
        <div className="flex flex-col gap-5">
          <h1>Experience</h1>
          <div>hehe</div>
        </div>
      </div>
    </div>
  );
};

export default About;
