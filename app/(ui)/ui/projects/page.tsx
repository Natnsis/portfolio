import ProjectList from "@/components/site/ProjectList";
import { Contact, TopBar } from "@/components/site/Sections";

const ProjectsPage = () => (
  <>
    <TopBar home={false} />
    <main>
      <ProjectList />
    </main>
    <Contact />
  </>
);

export default ProjectsPage;
