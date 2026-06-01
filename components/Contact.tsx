"use client";

import {
  EnvelopeIcon,
  TelegramLogoIcon,
  XLogoIcon,
} from "@phosphor-icons/react";
import { Button } from "./ui/button";

const Contact = () => {
  return (
    <div className="px-5">
      <div id="contact" className="md:py-20 px-4 md:px-10">
        <p className="text-lg md:text-xl mb-1 md:mb-2 text-center">
          Got a project idea?
        </p>
        <h1 className="text-4xl md:text-6xl lg:text-7xl mb-10 md:mb-10 leading-tight text-center">
          Let&apos;s bring it to life
        </h1>
        <div className="flex items-center gap-5 justify-center">
          <h1 className="text-lg">Get In Touch: </h1>
          <Button
            variant="outline"
            size="sm"
            className="border-black gap-2 rounded-full"
          >
            <TelegramLogoIcon size={32} />
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-black gap-2 rounded-full"
          >
            <XLogoIcon size={32} />
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-black gap-2 rounded-full"
          >
            <EnvelopeIcon size={32} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
