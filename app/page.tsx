import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProjectsCut from "@/components/ProjectsCut";

const page = () => {
  return (
    <div className="p-5">
      <Header />
      <Hero />
      
      <ProjectsCut />
    </div>
  );
};

export default page;
