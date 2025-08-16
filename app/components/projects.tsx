import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import Image from "next/image";

const projects = [
  {
    title: "Asu Students App",
    description:
      "A mobile app built with React Native to help university students manage their academic life more efficiently. The app is currently in beta and designed to solve everyday student problems like GPA tracking and class schedule organization.",
    image: "/asu_app.jpg",
    technologies: ["React Native", "TypeScript", "SQLite"],
    liveUrl: " https://uni-site-nu.vercel.app/",
    githubUrl: "https://github.com/Natnsis/asu_students_appV2.0",
    isLive: true,
  },
  {
    title: "E-commerce Platform",
    description:
      "An end-to-end ecommerce solution designed to support both web users. The platform features seamless product browsing, cart management, order placement, and admin controls",
    image: "/ecommerce.png",
    technologies: ["React.js", "Node.js", "express.js", "MySQL"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/Natnsis/Ecommerce",
    isLive: false,
  },
  {
    title: "E-commerce Platform (mobile app)",
    description:
      "A sleek, cross-platform client-side mobile app built with React Native, designed as the mobile front of our ecommerce platform. It allows users to browse products, manage carts, and simulate the checkout process — all with a responsive and intuitive UI.",
    image: "/ecom_app.jpg",
    technologies: ["React Native", "node.js", "express.js", "Tailwind CSS"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/Natnsis/ecommerce_mobile",
    isLive: false,
  },
  {
    title: "Portfolio Website",
    description:
      "A modern, responsive portfolio website built with Next.js and deployed on Vercel.",
    image: "/portfolio.png",
    technologies: ["Next.js", "Tailwind CSS", "Shadcn ui", "Vercel"],
    liveUrl: "https://portfolio-ochre-gamma-qo1o5kn8o5.vercel.app/",
    githubUrl: "https://github.com/Natnsis/portfolio",
    isLive: true,
  },
];

export function Projects() {
  return (
    <section id="projects" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Featured Projects
            </h2>
            <p className="text-lg text-muted-foreground">
              A showcase of my recent work and personal projects
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <Card
                key={index}
                className="rounded-2xl overflow-hidden group hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 hover:-translate-y-2 border-2 hover:border-primary/20"
              >
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                    <div className="flex gap-2">
                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="rounded-full bg-white/10 border-white/20 text-white hover:bg-white/20"
                      >
                        <a
                          href={
                            project.isLive ? project.liveUrl : project.githubUrl
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          {project.isLive ? "Live" : "Code"}
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
                <CardContent className="p-6 group-hover:bg-muted/50 transition-colors duration-300">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-semibold group-hover:text-primary transition-colors duration-300">
                      {project.title}
                    </h3>
                    {project.isLive && (
                      <Badge className="bg-green-500 text-white">
                        Now Live
                      </Badge>
                    )}
                  </div>
                  <p className="text-muted-foreground mb-4 group-hover:text-foreground/80 transition-colors duration-300">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <Badge
                        key={techIndex}
                        variant="outline"
                        className="rounded-full group-hover:border-primary/50 group-hover:text-primary transition-colors duration-300"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
