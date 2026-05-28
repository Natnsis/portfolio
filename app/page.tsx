import About from "@/components/About";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Services from "@/components/Services";

const page = () => {
  return (
    <div className="p-5">
      <Header />
      <Hero />
      <Projects />
      <About />
      <Services />
    </div>
  );
};

export default page;
