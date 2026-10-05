import Footer from "@/components/Footer";
import Projects from "@/components/Projects";
import SiteHeader from "@/components/SiteHeader";

const ProjectsPage = () => {
  return (
    <>
      <SiteHeader active="projects" />
      <main>
        <Projects />
      </main>
      <Footer onHome={false} />
    </>
  );
};

export default ProjectsPage;
