import React from "react";
import { projects } from "./demos/arrays";
import { CalendarDaysIcon } from "@/components/ui/calendar-days";
import Image from "next/image";
import { KeyIcon } from "lucide-react";
import { GithubIcon } from "@/components/ui/github";
import { LinkedinIcon } from "@/components/ui/linkedin";

const Page = () => {
  return (
    <div className="text-primary h-screen flex flex-col">
      {/* Header */}
      <div className="bg-shades p-5 border-b-2 border-[#787878]">
        <p className="text-2xl font-bold text-center mb-5 font-heading">
          Natnael Sisay - Full Stack Dev
        </p>
        <div className="flex items-center justify-center">
          <button className="border-[#00202E] border-1 px-2 rounded-sm font-bold">
            Download CV
          </button>
        </div>
      </div>

      {/* Main Section */}
      <div className="bg-cards flex-1 flex flex-col">
        {/* Navbar */}
        <header className="flex justify-center items-center py-5">
          <nav className="flex gap-5 text-primary font-bold text-lg font-titles">
            <button>Home</button>
            <button>Skills</button>
            <button>Experience</button>
          </nav>
        </header>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 border-t-2 border-[#787878] flex-1 overflow-hidden">
          {/* Sidebar - Core Values */}
          <div className="md:col-span-1 border-r-2 border-[#787878] p-5 flex flex-col justify-between">
            <div>
              <h1 className="font-bold border-b-2 border-[#787878] font-titles text-xl pb-2">
                Core Values
              </h1>
              <ul className="list-disc list-inside flex flex-col gap-2 font-tags py-5">
                <li>Continuous learning and improvement</li>
                <li>User-centered design and accessibility</li>
                <li>Collaboration and knowledge sharing</li>
                <li>Building impactful and practical solutions</li>
                <li>Resilience and persistence in problem-solving</li>
              </ul>
            </div>
            <div className="flex justify-center items-center">
              <button className="border-2 border-[#787878] px-3 w-1/3 rounded-lg font-bold flex gap-2 py-1">
                <KeyIcon />
                Hire Me!
              </button>
            </div>
          </div>

          {/* Middle - Projects */}
          <div className="md:col-span-2 border-r-2 border-[#787878] p-5 overflow-y-auto">
            <h1 className="text-4xl font-heading">Featured Works</h1>
            <div className="w-full space-y-8 mt-5">
              {projects.map((p) => (
                <div key={p.id} className="flex flex-col gap-2">
                  <h1 className="font-titles capitalize text-xl">{p.title}</h1>
                  <div className="flex gap-3 items-center">
                    <CalendarDaysIcon />
                    <p>{p.date}</p>
                  </div>
                  <div className="relative w-full h-64">
                    <Image
                      src={p.image}
                      alt="Picture of the author"
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <p>{p.description}</p>
                  <button className="font-bold cursor-pointer hover:underline">
                    Read more
                  </button>
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
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar - About Me */}
          <div className="md:col-span-1 p-5 flex flex-col gap-5 overflow-y-auto">
            <div className="bg-shades border-2 border-[#787878] rounded p-5">
              <h1 className="font-titles text-xl">About Me</h1>
              <p>
                My journey into web and mobile development began with curiosity
                and has evolved into a passion for building digital tools that
                solve real problems — especially in student and local community
                spaces. I focus on writing clean, maintainable code and
                continuously improving my craft.
              </p>
              <div className="flex gap-3">
                <div className="flex gap-2 py-5 items-center">
                  <button>
                    <GithubIcon />
                  </button>
                  <span>Natnael Sisay</span>
                </div>
                <div className="flex gap-2 py-5 items-center">
                  <button>
                    <LinkedinIcon />
                  </button>
                  <span>Natnael Sisay</span>
                </div>
              </div>
            </div>
            <div className="bg-shades border-2 border-[#787878] rounded p-5">
              <div className="flex justify-between items-center">
                <p>Work</p>
                <p>12</p>
              </div>
              <div className="flex justify-between items-center">
                <p>Articles</p>
                <p>8</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
