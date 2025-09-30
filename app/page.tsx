"use client";
import { useState } from "react";
import { experience, projects } from "./demos/arrays";
import Image from "next/image";
import { DownloadIcon, KeyIcon } from "lucide-react";
import { GithubIcon } from "@/components/ui/github";
import { LinkedinIcon } from "@/components/ui/linkedin";
import { GitPullRequestIcon } from "@/components/ui/git-pull-request";
import { RadioIcon } from "@/components/ui/radio";
import { LayersIcon } from "@/components/ui/layers";
import {
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiPostgresql,
  SiPrisma,
  SiNextdotjs,
  SiExpress,
  SiMysql,
  SiExpo,
} from "react-icons/si";
import { TbBrandReactNative } from "react-icons/tb";
import { DiNodejsSmall } from "react-icons/di";
import Link from "next/link";

const Page = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [expandedProject, setExpandedProject] = useState(null);
  const [aboutExpanded, setAboutExpanded] = useState(false);
  const MAX_LENGTH = 150;

  const toggleProject = (id:number) => {
    setExpandedProject((prev) => (prev === id ? null : id));
  };

  return (
    <div className="text-primary min-h-screen w-full">
      {/* Header */}
      <div className=" bg-shades p-5 border-b-2 border-[#787878] ">
        <p className="text-2xl sm:text-3xl font-bold text-center mb-5 font-heading">
          Natnael Sisay - Full Stack Dev
        </p>
        <div className="flex items-center justify-center">
          <a
            href="/natnael-sisay-cv.pdf"
            download="natnael-sisay-cv.pdf"
            className="border-[#00202E] border px-2 rounded-sm font-bold flex gap-2 py-1 cursor-pointer"
          >
            <DownloadIcon /> <p>Download CV</p>
          </a>
        </div>
      </div>

      {/* Layout */}
      <div className="bg-cards min-h-screen flex flex-col">
        {/* Navigation */}
        <header className="flex justify-center items-center py-5">
          <nav className="flex flex-wrap gap-5 text-primary font-bold text-lg font-titles">
            <button
              className={`cursor-pointer ${
                activeTab === "home" && "underline"
              }`}
              onClick={() => setActiveTab("home")}
            >
              Home
            </button>
            <button
              className={`cursor-pointer ${
                activeTab === "skills" && "underline"
              }`}
              onClick={() => setActiveTab("skills")}
            >
              Tech Stack
            </button>
            <button
              className={`cursor-pointer ${
                activeTab === "experience" && "underline"
              }`}
              onClick={() => setActiveTab("experience")}
            >
              Experience
            </button>
          </nav>
        </header>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 border-t-2 border-[#787878] flex-1">
          {/* Left Sidebar */}
          <div className="col-span-1 border-r-0 lg:border-r-2 border-[#787878] p-5">
            <h1 className="font-bold border-b-2 border-[#787878] font-titles text-lg sm:text-xl pb-2">
              Core Values
            </h1>
            <div className="py-5">
              <ul className="list-disc list-inside flex flex-col gap-2 font-tags text-sm sm:text-base">
                <li>Continuous learning and improvement</li>
                <li>User-centered design and accessibility</li>
                <li>Collaboration and knowledge sharing</li>
                <li>Building impactful and practical solutions</li>
                <li>Resilience and persistence in problem-solving</li>
              </ul>
            </div>
            <div className="flex justify-center items-center">
              <a
                href="mailto:nsisay49@gmail.com"
                className="border-2 border-[#787878] px-3 rounded-lg font-bold flex gap-2 py-1 text-sm sm:text-base cursor-pointer"
              >
                <KeyIcon />
                Contact Me!
              </a>
            </div>
          </div>

          {/* Middle Section (Dynamic) */}
          <div className="col-span-2 border-r-0 lg:border-r-2 border-[#787878] p-5 min-h-[70vh] flex flex-col">
            {/* Home */}
            {activeTab === "home" && (
              <>
                <h1 className="text-2xl sm:text-4xl font-heading">
                  Featured Projects
                </h1>
                <div className="w-full overflow-y-auto max-h-[70vh]">
                  {projects.map((p) => {
                    const isExpanded = expandedProject === p.id;
                    const text =
                      p.description.length > MAX_LENGTH && !isExpanded
                        ? p.description.slice(0, MAX_LENGTH) + "..."
                        : p.description;

                    return (
                      <div key={p.id} className="py-5 flex flex-col gap-2">
                        <h1 className="font-titles capitalize text-lg sm:text-xl">
                          {p.title}
                        </h1>
                        <div className="relative w-full h-50 sm:h-64">
                          <Image
                            src={p.image}
                            alt="project image"
                            fill
                            className="object-fit rounded-lg"
                          />
                        </div>

                        <div>
                          <p>{text}</p>
                          {p.description.length > MAX_LENGTH && (
                            <button
                              className="font-bold cursor-pointer hover:underline"
                              onClick={() => toggleProject(p.id)}
                            >
                              {isExpanded ? "Read less" : "Read more"}
                            </button>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-2 mt-3">
                          {p.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 text-sm bg-shades font-bold rounded-full font-tags"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <div className="py-5 flex flex-wrap gap-5">
                          <Link
                            href={p.source}
                            className="border-2 border-[#787878] px-3 rounded-lg font-bold flex gap-2 py-1 text-center justify-center"
                          >
                            <GitPullRequestIcon />
                            Source
                          </Link>
                          {p.isLive && (
                            <Link
                              href={p.live}
                              className="border-2 border-[#787878] px-3 rounded-lg font-bold flex gap-2 py-1"
                            >
                              <RadioIcon />
                              Live
                            </Link>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}

            {/* Experience */}
            {activeTab === "experience" && (
              <div>
                <h1 className="text-2xl sm:text-4xl font-heading">
                  Experience & Education
                </h1>
                <div className="overflow-y-auto max-h-[70vh]">
                  {experience.map((e) => (
                    <div key={e.id} className="py-5 flex flex-col gap-2">
                      <h1 className="font-titles text-lg sm:text-xl flex gap-2 py-5">
                        <LayersIcon /> {e.title}
                      </h1>
                      <div className="bg-shades border-2 border-[#787878] rounded p-5">
                        <p>{e.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Skills */}
            {activeTab === "skills" && (
              <div>
                <h1 className="text-2xl sm:text-4xl font-heading">
                  Tech Stack
                </h1>
                <div className="flex flex-wrap p-5 gap-5 justify-center">
                  {[
                    { Icon: SiReact, label: "React.js" },
                    { Icon: SiTypescript, label: "TypeScript" },
                    { Icon: SiPostgresql, label: "PostgreSQL" },
                    { Icon: SiTailwindcss, label: "TailwindCSS" },
                    { Icon: SiNextdotjs, label: "Next.js" },
                    { Icon: DiNodejsSmall, label: "Node.js" },
                    { Icon: SiExpress, label: "Express.js" },
                    { Icon: SiPrisma, label: "Prisma ORM" },
                    { Icon: TbBrandReactNative, label: "React Native" },
                    { Icon: SiMysql, label: "MySQL" },
                    { Icon: SiExpo, label: "Expo" },
                  ].map(({ Icon, label }, idx) => (
                    <div key={idx} className="p-3">
                      <Icon className="w-16 sm:w-24 h-16 sm:h-24" />
                      <p className="text-center font-bold">{label}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          <div className="col-span-1 p-5 flex flex-col gap-5">
            <div className="bg-shades border-2 border-[#787878] rounded p-5">
              <h1 className="font-titles text-lg sm:text-xl">About Me</h1>
              <p className="text-sm sm:text-base">
                {aboutExpanded
                  ? "My journey into web and mobile development began with curiosity and has evolved into a passion for building digital tools that solve real problems — especially in student and local community spaces. I enjoy creating apps that blend functionality with clean design, while continuously learning and improving my skills."
                  : "My journey into web and mobile development began with curiosity and has evolved into a passion for building digital tools that solve real problems..."}
              </p>
              <button
                className="font-bold cursor-pointer hover:underline mt-2"
                onClick={() => setAboutExpanded((prev) => !prev)}
              >
                {aboutExpanded ? "Read less" : "Read more"}
              </button>

              <div className="flex flex-wrap gap-3">
                <div className="flex gap-2 py-5 items-center">
                  <Link href="https://github.com/Natnsis">
                    <GithubIcon />
                  </Link>
                  <span>Natnael Sisay</span>
                </div>
                <div className="flex gap-2 py-5 items-center">
                  <Link href="https://www.linkedin.com/in/natnael-sisay-orcadev/">
                    <LinkedinIcon />
                  </Link>
                  <span>Natnael Sisay</span>
                </div>
              </div>
            </div>
            <div className="bg-shades border-2 border-[#787878] rounded py-5 px-5 sm:px-10">
              <div className="flex justify-between items-center ">
                <p>Projects</p>
                <p>8</p>
              </div>
              <div className="flex justify-between items-center">
                <p>Certificates</p>
                <p>6</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
