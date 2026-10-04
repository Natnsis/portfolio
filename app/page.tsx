import About from "@/components/About";
import Contact from "@/components/Contact";
import Hero from "@/components/Hero";
import TechTicker from "@/components/TechTicker";
import Work from "@/components/Work";

const page = () => {
  return (
    <main>
      <Hero />
      <TechTicker />
      <Work />
      <About />
      <Contact />
    </main>
  );
};

export default page;
