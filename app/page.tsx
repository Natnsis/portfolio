import About from "@/components/About";
import Contact from "@/components/Contact";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import LatestWork from "@/components/LatestWork";
import ProjectsCut from "@/components/ProjectsCut";

const page = () => {
  return (
    <div className="p-5 md:p-0">
      <Header />
      <Hero />
      <LatestWork />
      <ProjectsCut />
      <About />
      <Contact />
    </div>
  );
};

export default page;
