import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Projects from "@/components/Projects";

const ProjectsPage = () => {
  return (
    <div className="min-h-screen relative">
      <div className="relative">
        <Header />
        <div className="max-w-[1060px] mx-auto px-7">
          <Projects />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default ProjectsPage;
