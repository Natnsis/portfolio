import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProjectsCut from "@/components/ProjectsCut";

const page = () => {
  return (
    <>
      <Header />
      <Hero />
      <ProjectsCut />
      <About />
      <Contact />
      <Footer />
    </>
  );
};

export default page;
