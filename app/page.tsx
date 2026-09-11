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
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage:
            "linear-gradient(var(--grid) 1px,transparent 1px),linear-gradient(90deg,var(--grid) 1px,transparent 1px)",
          backgroundSize: "26px 26px",
          backgroundPosition: "-1px -1px",
          WebkitMaskImage:
            "radial-gradient(58% 30% at 78% 13%,#000 0%,transparent 100%),radial-gradient(46% 16% at 14% 44%,#000 0%,transparent 100%),radial-gradient(70% 22% at 50% 76%,#000 0%,transparent 100%),radial-gradient(40% 12% at 88% 95%,#000 0%,transparent 100%)",
          maskImage:
            "radial-gradient(58% 30% at 78% 13%,#000 0%,transparent 100%),radial-gradient(46% 16% at 14% 44%,#000 0%,transparent 100%),radial-gradient(70% 22% at 50% 76%,#000 0%,transparent 100%),radial-gradient(40% 12% at 88% 95%,#000 0%,transparent 100%)",
        }}
      />

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
