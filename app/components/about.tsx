export function About() {
  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#2a2a2a] tracking-tight">
              About Me
            </h2>
            <p className="mt-4 text-lg text-[#2a2a2a]/70">
              Get to know the person behind the code
            </p>
          </div>

          <div className="space-y-8 text-[#2a2a2a]/80 leading-relaxed">
            <p className="text-lg">
              My journey into web and mobile development began with curiosity
              and has evolved into a passion for building digital tools that
              solve real problems — especially in student and local community
              spaces. I focus on writing clean, maintainable code and
              continuously improving my craft with modern technologies like
              React, Node.js, and Next.js.
            </p>
            <p className="text-lg">
              When I'm not coding, you'll find me experimenting with new
              frameworks, contributing to side projects, or sharing what I’ve
              learned. I'm always open to meaningful collaborations and building
              tools that make a difference.
            </p>

            <div>
              <h3 className="text-xl font-semibold text-[#2a2a2a] mb-3">
                Core Values
              </h3>
              <ul className="space-y-2">
                <li>• Clean, readable, and maintainable code</li>
                <li>• User-centered design and accessibility</li>
                <li>• Continuous learning and improvement</li>
                <li>• Collaboration and knowledge sharing</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
