import { Card, CardContent } from "@/components/ui/card";

const skillCategories = [
  {
    title: "Frontend",
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "HTML",
      "CSS",
      "JavaScript",
    ],
  },
  {
    title: "Backend",
    skills: ["Node.js", "Express", "PHP", "REST APIs", "MySQL", "Laravel"],
  },
  {
    title: "Databases",
    skills: ["PostgreSQL", "MongoDB", "MySQL", "Firebase"],
  },
  {
    title: "Tools & DevOps",
    skills: ["Git", "Vercel", "GitHub Actions", "VS Code", "Postman"],
  },
];

export function Skills() {
  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold text-[#2a2a2a] tracking-tight">
            Skills & Technologies
          </h2>
          <p className="mt-4 text-lg text-[#2a2a2a]/70 max-w-2xl mx-auto">
            The tools I use to build efficient, maintainable, and user-focused
            applications.
          </p>
        </div>

        <div className="space-y-10">
          {skillCategories.map((category, index) => (
            <div key={index} className="group">
              <h3 className="text-xl font-semibold text-[#2a2a2a] mb-4 pl-1 border-l-2 border-[#2a2a2a]/20">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {category.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-3.5 py-1.5 text-sm font-medium text-[#2a2a2a]/90 bg-[#f5f5f5] rounded-full transition-colors hover:bg-[#eaeaea]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
