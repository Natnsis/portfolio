import Footer from "@/components/Footer";
import Projects from "@/components/Projects";
import SideDock from "@/components/SideDock";

const ProjectsPage = () => {
  return (
    <div className="min-h-screen relative">
      <SideDock />
      <div className="relative">
        <div className="max-w-[1060px] mx-auto px-7">
          <Projects />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default ProjectsPage;
