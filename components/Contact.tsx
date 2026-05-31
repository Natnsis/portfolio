"use client";

import { EnvelopeIcon, DownloadSimpleIcon } from "@phosphor-icons/react";
import { Button } from "./ui/button";
import Link from "next/link";

const Contact = () => {
  return (
    <div className="px-5">
      <div
        id="contact"
        className="py-10 md:py-20 px-4 md:px-10 border border-black"
      >
        <p className="text-lg md:text-xl mb-1 md:mb-2 text-center">
          Got a project idea?
        </p>
        <h1 className="text-4xl md:text-6xl lg:text-7xl mb-10 md:mb-16 leading-tight text-center">
          Let&apos;s bring it to life
        </h1>
      </div>
    </div>
  );
};

export default Contact;
