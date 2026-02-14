"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const ProjectCard = ({ project }) => {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.25 }}
      className="group relative rounded-2xl overflow-hidden bg-white/70 dark:bg-gray-900/60 backdrop-blur-xl border border-gray-200 dark:border-gray-700 shadow-xl hover:shadow-2xl"
    >
      {/* FEATURED TAG */}
      {project.featured && (
        <span className="absolute top-3 left-3 z-20 bg-emerald-600 text-white text-xs px-3 py-1 rounded-full shadow-md">
          ★ Featured
        </span>
      )}

      {/* IMAGE */}
      <div className="relative overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          width={500}
          height={260}
          className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      {/* CONTENT */}
      <div className="p-5">

        {/* TITLE */}
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
          {project.title}
        </h2>

        {/* PROBLEM / DESCRIPTION */}
        <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">
          {project.description}
        </p>

        {/* METRICS — FAANG STYLE */}
        {project.metrics && (
          <div className="mt-3 flex flex-wrap gap-2">
            {project.metrics.map((metric, i) => (
              <span
                key={i}
                className="text-xs bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-md font-semibold"
              >
                {metric}
              </span>
            ))}
          </div>
        )}

        {/* TECH STACK */}
        <div className="flex flex-wrap gap-2 mt-4">
          {project.technologies.map((tech, index) => (
            <span
              key={index}
              className="text-xs bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 px-2 py-1 rounded-md font-semibold"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* BUTTONS */}
        <div className="flex gap-3 mt-5">

          {project.live && (
            <a
              href={project.live}
              target="_blank"
              className="flex-1 text-center bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-lg text-sm font-semibold transition"
            >
              Live Demo
            </a>
          )}

          {project.github && (
            <a
              href={project.github}
              target="_blank"
              className="flex-1 text-center border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 py-2 rounded-lg text-sm font-semibold transition"
            >
              Code
            </a>
          )}
        </div>

        {/* DETAILS LINK */}
        <Link
          href={`/projects/${project.slug || project.id}`}
          className="block text-center mt-4 text-sm font-semibold text-sky-600 hover:underline"
        >
          View Case Study →
        </Link>

      </div>
    </motion.div>
  );
};

export default ProjectCard;
