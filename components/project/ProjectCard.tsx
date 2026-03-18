"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { HiExternalLink, HiCode, HiArrowNarrowRight } from "react-icons/hi";

const ProjectCard = ({ project }: { project: any }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative flex flex-col glass rounded-[2.5rem] overflow-hidden border border-gray-100 dark:border-white/5 shadow-xl hover:shadow-2xl transition-all duration-500"
    >
      {/* IMAGE */}
      <div className="relative h-60 overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
          <div className="flex gap-3">
             {project.live && (
              <a href={project.live} target="_blank" className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                <HiExternalLink className="text-xl" />
              </a>
            )}
            {project.github && (
              <a href={project.github} target="_blank" className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform border border-white/10">
                <HiCode className="text-xl" />
              </a>
            )}
          </div>
        </div>
        
        {project.featured && (
          <div className="absolute top-4 left-4 glass px-3 py-1 rounded-full border border-emerald-500/30">
            <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">★ Featured</span>
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-8 flex flex-col flex-grow">
        <div className="mb-4">
          <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest mb-2 block">
            {project.category || "Project"}
          </span>
          <h3 className="text-2xl font-bold dark:text-white group-hover:text-emerald-500 transition-colors">
            {project.title}
          </h3>
        </div>

        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6 line-clamp-2">
          {project.description}
        </p>

        {/* TECH STACK */}
        <div className="flex flex-wrap gap-2 mb-8 mt-auto">
          {project.technologies.slice(0, 4).map((tech: string, index: number) => (
            <span
              key={index}
              className="text-[10px] font-bold px-3 py-1 rounded-lg bg-gray-50 dark:bg-gray-800/50 text-gray-500 dark:text-gray-400 border border-gray-100 dark:border-white/5 uppercase tracking-tighter"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="text-[10px] font-bold text-gray-400">+{project.technologies.length - 4} More</span>
          )}
        </div>

        <div className="pt-6 border-t border-gray-100 dark:border-white/5">
          <Link
            href={`/projects/${project.slug || project.id}`}
            className="inline-flex items-center gap-2 font-bold text-sm text-gray-900 dark:text-white hover:text-emerald-500 transition-colors group/link"
          >
            Explore Case Study
            <HiArrowNarrowRight className="group-hover/link:translate-x-2 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
