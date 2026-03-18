import dbConnect from "@/lib/mongodb";
import Project from "@/models/Project";
import ProjectCard from "./ProjectCard";
import { motion } from "framer-motion";

const ProjectsSection = async () => {
  await dbConnect();
  
  // Fetch from DB and sort by newest
  const dbProjects = await Project.find({}).sort({ createdAt: -1 }).lean();
  
  // Map MongoDB fields to the structure expected by the ProjectCard
  const projects = dbProjects.map((p: any) => ({
    id: p._id.toString(),
    title: p.title,
    slug: p.slug,
    description: p.description,
    image: p.images?.[0] || "https://res.cloudinary.com/durgeshkumar/image/upload/v1771091150/finalsecond_t21tkd.png",
    technologies: p.technologies || [],
    live: p.liveLink,
    github: p.githubLink,
    category: p.category,
    tags: p.tags,
    featured: p.isFeatured,
    metrics: p.highlights || []
  }));

  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-400 text-lg">
            A selection of my recent work, ranging from enterprise-grade backend systems 
            to interactive full-stack applications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
