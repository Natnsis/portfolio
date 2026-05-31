"use client";

import { GlobeIcon } from "@phosphor-icons/react";
import { Badge } from "./ui/badge";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

const About = () => {
  return (
    <div className="py-10 grid grid-cols-2">
      <div>
        <h1 className="text-4xl">About Me</h1>
        <p className="text-lg pr-3">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut hic
          voluptate, delectus sed, laborum, quis neque iure debitis soluta
          fugiat reiciendis voluptatibus enim praesentium quidem aliquam
          voluptatum eum natus ducimus!
        </p>
      </div>

      <div className="flex flex-col gap-5 bg-primary-foreground px-10 py-5">
        <div className="flex gap-5 items-center">
          <div className="border p-3 rounded-full w-fit">
            <GlobeIcon size={70} />
          </div>
          <h1 className="text-7xl">120%</h1>
        </div>

        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorem odio
          harum fugit amet, vel saepe molestiae voluptas magni, eos, nostrum
          velit impedit animi? Magnam reiciendis ipsam dicta animi, ea pariatur.
        </p>
      </div>

      <div className="px-5 mt-20 col-span-2">
        <div className="my-10">
          <h1 className="text-4xl">Experience</h1>
          <p className="text-lg pr-3">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ut hic
            voluptate, delectus sed, laborum, quis neque iure debitis soluta
            fugiat reiciendis voluptatibus enim praesentium quidem aliquam
            voluptatum eum natus ducimus!
          </p>
        </div>
        <div></div>
        <Carousel>
          <CarouselContent>
            <CarouselItem>
              <div className="flex flex-col gap-5">
                <h1 className="text-4xl">Experience</h1>
                <div>hehe1</div>
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="flex flex-col gap-5">
                <h1 className="text-4xl">Experience</h1>
                <div>hehe</div>
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="flex flex-col gap-5">
                <h1 className="text-4xl">Experience</h1>
                <div>hehe</div>
              </div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
};

export default About;
