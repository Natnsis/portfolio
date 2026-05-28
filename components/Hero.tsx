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
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { Badge } from "./ui/badge";

const Hero = () => {
  const HoverCards = [
    {
      icon: DesktopIcon,
      content: "The React Framework – created and maintained by @vercel.",
    },
    {
      icon: BooksIcon,
      content: "The React Framework – created and maintained by @vercel.",
    },
    {
      icon: HardDrivesIcon,
      content: "The React Framework – created and maintained by @vercel.",
    },
    {
      icon: BrainIcon,
      content: "The React Framework – created and maintained by @vercel.",
    },
    {
      icon: AndroidLogoIcon,
      content: "The React Framework – created and maintained by @vercel.",
    },
    {
      icon: RobotIcon,
      content: "The React Framework – created and maintained by @vercel.",
    },
    {
      icon: LightbulbFilamentIcon,
      content: "The React Framework – created and maintained by @vercel.",
    },
    {
      icon: LightningIcon,
      content: "The React Framework – created and maintained by @vercel.",
    },
  ];
  return (
    <div className="flex items-center justify-center mt-10">
      <div className="flex flex-col items-center gap-3">
        <div className="flex gap-5">
          {HoverCards.map((h, index) => (
            <div key={index}>
              <HoverCard openDelay={0.2} closeDelay={100}>
                <HoverCardTrigger>
                  <h.icon size={32} />
                </HoverCardTrigger>
                <HoverCardContent>{h.content}</HoverCardContent>
              </HoverCard>
            </div>
          ))}
        </div>
        <h1 className="text-9xl">Natnael Sisay</h1>
        <p className="w-[75%] text-center">
          AN AWARD WINNING{" "}
          <Badge
            variant="outline"
            className="text-lg rounded-full border-primary mx-1 pt-1"
          >
            DESIGNER
          </Badge>
          WHO WORKS WITH A VARIETY OF CONSUMER FACING BRANDS FROM WORLDiCON
          AROUND THE WORDL
        </p>
      </div>
    </div>
  );
};

export default Hero;
