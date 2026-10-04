import Footer from "@/components/Footer";
import Projects from "@/components/Projects";
import SiteNav from "@/components/SiteNav";

const ProjectsPage = () => {
  return (
    <main id="top" className="min-h-screen bg-navy">
      <SiteNav color="#fff" onHome={false} />
      <Projects />
      <div className="bg-navy pb-12 gutter-x">
        <Footer />
      </div>
    </main>
  );
};

export default ProjectsPage;
