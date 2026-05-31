"use client";

import {
  LightningIcon,
  TrendUpIcon,
  ArrowsLeftRightIcon,
  UsersThreeIcon,
  MagnifyingGlassIcon,
  LightbulbFilamentIcon,
  ChatCircleDotsIcon,
  PuzzlePieceIcon,
} from "@phosphor-icons/react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import { Badge } from "./ui/badge";

const Hero = () => {
  const HoverCards = [
    {
      icon: LightningIcon,
      label: "Fast Learner",
      content: "I pick up new technologies and concepts quickly, adapting to any stack or tool with ease.",
    },
    {
      icon: TrendUpIcon,
      label: "Continuous Growth",
      content: "Always leveling up — reading, building, and pushing my skills forward every day.",
    },
    {
      icon: ArrowsLeftRightIcon,
      label: "Adaptable",
      content: "Whether it's a new framework, role, or problem domain, I adjust fast and deliver.",
    },
    {
      icon: UsersThreeIcon,
      label: "Solo & Team Player",
      content: "I thrive working independently or collaborating closely with a team to ship great products.",
    },
    {
      icon: MagnifyingGlassIcon,
      label: "Researches Before Building",
      content: "I dig deep into how things work first — no blind vibecoding. Understanding before applying is my rule.",
    },
    {
      icon: LightbulbFilamentIcon,
      label: "Brilliant Ideas",
      content: "I bring creative, out-of-the-box solutions that elevate every project.",
    },
    {
      icon: ChatCircleDotsIcon,
      label: "Direct & Honest Feedback",
      content: "Not shy to speak up. Clear, honest feedback helps teams grow and products improve.",
    },
    {
      icon: PuzzlePieceIcon,
      label: "Problem Solver",
      content: "Complex challenges excite me. I break them down and build clean solutions.",
    },
  ];

  return (
    <div id="home" className="flex items-center justify-center mt-10 md:mt-20 px-4">
      <div className="flex flex-col items-center gap-6 md:gap-8 max-w-full">
        <div className="flex flex-wrap justify-center gap-4 md:gap-5">
          {HoverCards.map((h, index) => (
            <div key={index}>
              <HoverCard openDelay={0.2} closeDelay={100}>
                <HoverCardTrigger>
                  <h.icon size={24} className="md:w-8 md:h-8 w-6 h-6 hover:opacity-60 transition-opacity" />
                </HoverCardTrigger>
                <HoverCardContent className="text-sm max-w-[250px]">
                  <span className="font-bold">{h.label}:</span> {h.content}
                </HoverCardContent>
              </HoverCard>
            </div>
          ))}
        </div>
        <h1 className="text-5xl md:text-7xl lg:text-9xl text-center leading-tight">Natnael Sisay</h1>
        <p className="w-full md:w-[75%] text-center text-sm md:text-base leading-relaxed px-2">
          AN AWARD WINNING{" "}
          <Badge variant="outline" className="text-sm md:text-lg rounded-full border-black mx-1 pt-1">
            DEVELOPER
          </Badge>{" "}
          WHO WORKS WITH A VARIETY OF CONSUMER FACING BRANDS FROM AROUND THE WORLD
        </p>
      </div>
    </div>
  );
};

export default Hero;
