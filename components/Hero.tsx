"use client";

import {
  AndroidLogoIcon,
  BooksIcon,
  BrainIcon,
  DesktopIcon,
  HardDrivesIcon,
  LightbulbFilamentIcon,
  LightningIcon,
  RobotIcon,
} from "@phosphor-icons/react";

const Hero = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="flex gap-5">
          <DesktopIcon size={32} />
          <BooksIcon size={32} />
          <HardDrivesIcon size={32} />
          <BrainIcon size={32} />
          <AndroidLogoIcon size={32} />
          <RobotIcon size={32} />
          <LightbulbFilamentIcon size={32} />
          <LightningIcon size={32} />
        </div>
        <h1 className="text-8xl">Natnael Sisay</h1>
        <p className="w-[75%] text-center">
          AN AWARD WINNING{" "}
          <span className="border px-2 border-black rounded-full">
            DIGITAL DESIGNER
          </span>{" "}
          WHO WORKS WITH A VARIETY OF CONSUMER FACING BRANDS FROM WORLDiCON
          AROUND THE WORDL
        </p>
      </div>
    </div>
  );
};

export default Hero;
