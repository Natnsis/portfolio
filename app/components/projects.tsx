import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const projects = [
  {
    title: "Asu Students App",
    description:
      "A mobile app built with React Native to help university students manage academic life — GPA tracking, schedule organization, and more. Currently in beta.",
    image: "/asu_app.jpg",
    technologies: ["React Native", "TypeScript", "SQLite"],
    liveUrl: "https://uni-site-nu.vercel.app/",
    githubUrl: "https://github.com/Natnsis/asu_students_appV2.0",
    isLive: true,
  },
  {
    title: "E-commerce Platform",
    description:
      "Full-stack e-commerce solution with product browsing, cart management, and admin controls. Built with React, Node.js, and MySQL.",
    image: "/ecommerce.png",
    technologies: ["React", "Node.js", "Express", "MySQL"],
    githubUrl: "https://github.com/Natnsis/Ecommerce",
    isLive: false,
  },
  {
    title: "E-commerce Mobile App",
    description:
      "Cross-platform mobile client for the e-commerce platform, built with React Native and Tailwind CSS.",
    image: "/ecom_app.jpg",
    technologies: ["React Native", "Tailwind CSS"],
    githubUrl: "https://github.com/Natnsis/ecommerce_mobile",
    isLive: false,
  },
  {
    title: "HR Management System",
    description:
      "Angular-based HR dashboard with CRUD operations using in-memory web API.",
    image: "/angular_project.png",
    technologies: ["Angular", "Angular Material", "Tailwind CSS"],
    liveUrl: "https://portfolio-ochre-gamma-qo1o5kn8o5.vercel.app/",
    githubUrl: "https://github.com/Natnsis/Human-Resource",
    isLive: true,
  },
  {
    title: "Mini Chat App",
    description:
      "Real-time chat app with React, Node.js, Socket.IO, and Zustand for state management.",
    image: "/chat.png",
    technologies: ["React", "Node.js", "Socket.IO", "Tailwind CSS"],
    githubUrl: "https://github.com/Natnsis/chat-app.git",
    isLive: false,
  },
];

export function Projects() {
  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold text-[#2a2a2a] tracking-tight">
            Featured Projects
          </h2>
          <p className="mt-4 text-lg text-[#2a2a2a]/70">
            Practical solutions built with care — from student tools to
            full-stack platforms.
          </p>
        </div>

        <div className="space-y-12">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group flex flex-col md:flex-row gap-6 items-start"
            >
              {/* Image */}
              <div className="relative w-full md:w-1/3 aspect-video rounded-xl overflow-hidden bg-[#f0f0f0] border border-[#e0e0e0]">
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[#2a2a2a]/30">
                    {project.title}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="w-full md:w-2/3">
                <div className="flex flex-wrap items-baseline gap-2 mb-2">
                  <h3 className="text-xl font-semibold text-[#2a2a2a]">
                    {project.title}
                  </h3>
                  {project.isLive && (
                    <span className="text-sm font-medium text-green-600">
                      Live
                    </span>
                  )}
                </div>

                <p className="text-[#2a2a2a]/80 mb-4 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 text-xs font-medium text-[#2a2a2a]/70 bg-[#f5f5f5] rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3">
                  {project.liveUrl && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-full border-[#2a2a2a]/20 text-[#2a2a2a] hover:bg-[#f5f5f5]"
                      asChild
                    >
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="h-4 w-4 mr-1.5" />
                        Live Demo
                      </a>
                    </Button>
                  )}
                  {project.githubUrl && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-[#2a2a2a]/70 hover:text-[#2a2a2a] hover:bg-[#f5f5f5]"
                      asChild
                    >
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Code
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
