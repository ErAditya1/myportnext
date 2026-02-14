import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { readProjects } from "@/lib/content-store";
import StructuredData from "@/components/seo/StructuredData";

const getProject = async (id) => {
  const projects = await readProjects();
  return projects.find((item) => item.id === id || item.slug === id);
};

export async function generateMetadata({ params }) {
  const { id } = await params;
  const project = await getProject(id);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: project.seoTitle || `${project.title} Case Study`,
    description: project.seoDescription || project.summary || project.description,
    openGraph: {
      title: project.seoTitle || project.title,
      description: project.seoDescription || project.summary || project.description,
      images: project.image ? [project.image] : [],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: project.seoTitle || project.title,
      description: project.seoDescription || project.summary || project.description,
      images: project.image ? [project.image] : [],
    },
  };
}

const ProjectDetailsPage = async ({ params }) => {
  const { id } = await params;
  const project = await getProject(id);

  if (!project || project.status !== "published") {
    notFound();
  }

return (
  <main
    id="main-content"
    className="min-h-screen bg-gradient-to-r 
    from-blue-100 via-purple-100 to-pink-50 
    dark:from-gray-800 dark:via-gray-900 dark:to-gray-800"
  >
    <StructuredData
      data={{
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        name: project.title,
        description: project.summary || project.description,
        image: project.image,
        author: {
          "@type": "Person",
          name: "Durgesh Kumar",
        },
      }}
    />

    {/* ================= HERO ================= */}

    <section className="max-w-6xl mx-auto px-6 pt-32 pb-20">

      <div className="grid md:grid-cols-2 gap-14 items-center">

        {/* LEFT — TEXT */}
        <div>
          <p className="uppercase tracking-widest text-sm text-gray-500 mb-3">
            Case Study
          </p>

          <h1 className="text-5xl font-bold leading-tight text-gray-900 dark:text-white">
            {project.title}
          </h1>

          {project.summary && (
            <p className="mt-6 text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              {project.summary}
            </p>
          )}

          {/* TECH */}
          <div className="flex flex-wrap gap-3 mt-8">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="
                  px-4 py-2
                  rounded-full
                  text-sm
                  font-semibold
                  bg-white/70 dark:bg-gray-900/70
                  backdrop-blur-md
                  border border-gray-200 dark:border-gray-700
                  shadow-sm
                "
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* RIGHT — IMAGE */}
        <div className="relative">
          <div className="
            absolute -inset-4 
            bg-gradient-to-r from-emerald-400 to-blue-500
            blur-3xl opacity-20
            rounded-3xl
          " />

          <Image
            src={project.image}
            alt={project.title}
            width={700}
            height={500}
            priority
            className="
              relative
              rounded-3xl
              shadow-[0_25px_80px_rgba(0,0,0,0.25)]
              object-cover
            "
          />
        </div>

      </div>
    </section>

    {/* ================= DESCRIPTION ================= */}

    <section className="max-w-4xl mx-auto px-6 pb-24">

      <div className="
        bg-white/60 dark:bg-gray-900/60
        backdrop-blur-xl
        border border-white/20
        shadow-[0_20px_80px_rgba(0,0,0,0.12)]
        rounded-3xl
        p-10
      ">

        <h2 className="text-3xl font-bold mb-6">
          Project Overview
        </h2>

        <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
          {project.description}
        </p>

        {/* BUTTON */}
        <Link
          href="/project"
          className="
            inline-block mt-12
            px-8 py-3
            rounded-xl
            bg-emerald-600
            hover:bg-emerald-700
            text-white
            font-semibold
            shadow-lg
            hover:-translate-y-1
            transition
          "
        >
          ← Back to Projects
        </Link>

      </div>
    </section>
  </main>
);



};

export default ProjectDetailsPage;
