import ProjectCard from "./ProjectCard";
import { readProjects } from "@/lib/content-store";

const ProjectsSection = async () => {
  const projects = await readProjects();
  const publishedProjects = projects.filter((project) => project.status === "published");

  return (
    <section className="pt-24 md:pt-20 min-h-screen p-5 bg-gradient-to-r from-blue-100 via-purple-100 to-pink-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 text-gray-800 dark:text-white">
      <h1 className="text-3xl font-bold mb-8 text-center font-palyWrite">
        Our Projects
      </h1>

      <hr className="border-0 h-1 mb-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full animate-pulse w-1/2 md:w-1/3 mx-auto" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {publishedProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
