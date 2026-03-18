import dbConnect from "@/lib/mongodb";
import Project from "@/models/Project";
import ProjectCard from "./ProjectCard";

const ProjectsSection = async () => {
  await dbConnect();
  
  // Fetch from DB and sort by newest
  const dbProjects = await Project.find({}).sort({ createdAt: -1 }).lean();
  
  // Map MongoDB fields to the structure expected by the ProjectCard
  const projects = dbProjects.map((p) => ({
    id: p._id.toString(),
    title: p.title,
    slug: p.slug,
    description: p.description,
    image: p.images?.[0] || "/placeholder.jpg",
    technologies: p.technologies || [],
    live: p.liveLink,
    github: p.githubLink,
    category: p.category,
    tags: p.tags,
  }));

  return (
    <section className="pt-24 md:pt-20 min-h-screen p-5 bg-gradient-to-r from-blue-100 via-purple-100 to-pink-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 text-gray-800 dark:text-white">
      <h1 className="text-3xl font-bold mb-8 text-center font-palyWrite">
        Our Projects
      </h1>

      <hr className="border-0 h-1 mb-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full animate-pulse w-1/2 md:w-1/3 mx-auto" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
