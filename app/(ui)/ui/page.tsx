import About from "@/components/About";
import Contact from "@/components/Contact";
import Credentials from "@/components/Credentials";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import SiteHeader from "@/components/SiteHeader";
import Toolbox from "@/components/Toolbox";
import Work from "@/components/Work";

const page = () => {
  return (
    <>
      <SiteHeader active="home" />
      <main>
        <Hero />
        <About />
        <Work />
        <Toolbox />
        <Credentials />
        <Contact />
      </main>
      <Footer />
    </>
  );
};

export default page;
