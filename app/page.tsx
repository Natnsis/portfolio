import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TechTicker from "@/components/TechTicker";
import Work from "@/components/Work";

const page = () => {
  return (
    <div className="min-h-screen relative">
      <div className="relative">
        <Header />
        <div className="max-w-[1060px] mx-auto px-7">
          <Hero />
          <TechTicker />
          <Work />
          <About />
          <Contact />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default page;
