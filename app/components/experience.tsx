import { Briefcase, GraduationCap } from "lucide-react";

const experiences = [
  {
    title: "Internship",
    company: "Commercial Bank of Ethiopia",
    period: "2022 – Present",
    description:
      "Gained hands-on experience in a structured enterprise environment, learning about team workflows, documentation, and software development standards. While not directly contributing to production code, I engaged with internal systems and real-world processes.",
    achievements: [
      "Identified and reported bugs in internal software systems",
      "Created onboarding documentation and system walkthroughs",
      "Participated in code reviews and team discussions",
    ],
  },
  {
    title: "Full Stack Developer (Student)",
    company: "Final Year Project – ASU",
    period: "2024",
    description:
      "Led the development of a full-featured e-commerce platform as my capstone project, delivering both web and mobile experiences with a focus on clean, scalable architecture.",
    achievements: [
      "Led a team and implemented most of the frontend and backend",
      "Built web (React + Node.js) and mobile (React Native) versions with SQL",
      "Awarded 'Best Final Year Project' for innovation and impact",
    ],
  },
  {
    title: "Independent Full Stack Developer",
    company: "Self-Initiated Projects",
    period: "2024 – Present",
    description:
      "Building practical web and mobile applications to sharpen full-stack skills, with a focus on real-world utility and cross-platform consistency.",
    achievements: [
      "Launched ASU Student App (GPA calculator, schedule planner) in beta",
      "Implemented Next.js Server Components and TypeScript best practices",
      "Refined API design and UI/UX patterns across projects",
    ],
  },
];

const education = [
  {
    degree: "BSc in Computer Science",
    institution: "Assosa University",
    period: "2021 – 2025",
    description:
      "Focused on software engineering, algorithms, and web development. Graduated with honors.",
    coursework: [
      "Data Structures",
      "Web Development",
      "Database Systems",
      "Software Engineering",
    ],
  },
  {
    degree: "Networking Essentials Certification",
    institution: "Cisco Networking Academy",
    period: "2023",
    description:
      "Foundational training in networking protocols, infrastructure, and data flow across wired and wireless systems.",
    coursework: [
      "IP Addressing",
      "Routing & Switching",
      "Network Security",
      "OSI/TCP/IP Models",
    ],
  },
  {
    degree: "Foundations in AI, Data Analysis & Android Dev",
    institution: "Udacity",
    period: "Feb 2025",
    description:
      "Hands-on courses in AI concepts, data analysis, and Android development with Kotlin.",
    coursework: [
      "AI & Ethics",
      "Data Wrangling",
      "Visualization",
      "Android UI & Lifecycle",
    ],
  },
];

export function Experience() {
  return (
    <section id="experience" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#2a2a2a] tracking-tight">
              Experience & Education
            </h2>
            <p className="mt-4 text-lg text-[#2a2a2a]/70">
              My professional journey and academic background
            </p>
          </div>

          <div className="space-y-14">
            {/* Experience */}
            <section>
              <div className="flex items-center gap-3 mb-8">
                <Briefcase className="h-5 w-5 text-[#2a2a2a]" />
                <h3 className="text-xl font-semibold text-[#2a2a2a]">
                  Professional Experience
                </h3>
              </div>
              <div className="space-y-8">
                {experiences.map((exp, i) => (
                  <div key={i} className="group">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-3">
                      <div>
                        <h4 className="text-lg font-semibold text-[#2a2a2a]">
                          {exp.title}
                        </h4>
                        <p className="text-[#2a2a2a]/80">{exp.company}</p>
                      </div>
                      <time className="text-sm text-[#2a2a2a]/60 font-medium">
                        {exp.period}
                      </time>
                    </div>
                    <p className="text-[#2a2a2a]/70 mb-3 leading-relaxed">
                      {exp.description}
                    </p>
                    <ul className="space-y-1.5">
                      {exp.achievements.map((ach, j) => (
                        <li
                          key={j}
                          className="text-[#2a2a2a]/80 flex items-start"
                        >
                          <span className="mr-2">•</span>
                          {ach}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* Education */}
            <section>
              <div className="flex items-center gap-3 mb-8">
                <GraduationCap className="h-5 w-5 text-[#2a2a2a]" />
                <h3 className="text-xl font-semibold text-[#2a2a2a]">
                  Education
                </h3>
              </div>
              <div className="space-y-8">
                {education.map((edu, i) => (
                  <div key={i} className="group">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-3">
                      <div>
                        <h4 className="text-lg font-semibold text-[#2a2a2a]">
                          {edu.degree}
                        </h4>
                        <p className="text-[#2a2a2a]/80">{edu.institution}</p>
                      </div>
                      <time className="text-sm text-[#2a2a2a]/60 font-medium">
                        {edu.period}
                      </time>
                    </div>
                    <p className="text-[#2a2a2a]/70 mb-3 leading-relaxed">
                      {edu.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {edu.coursework.map((course, j) => (
                        <span
                          key={j}
                          className="px-2.5 py-1 text-xs font-medium text-[#2a2a2a]/70 bg-[#f5f5f5] rounded-full"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </section>
  );
}
