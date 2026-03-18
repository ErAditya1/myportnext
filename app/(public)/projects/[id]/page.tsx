import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import dbConnect from "@/lib/mongodb";
import Project from "@/models/Project";
import StructuredData from "@/components/seo/StructuredData";
import mongoose from "mongoose";

const getProject = async (id: string) => {
  await dbConnect();
  // id could be _id or slug
  let query: Record<string, unknown> = { slug: id };
  if (mongoose.Types.ObjectId.isValid(id)) {
    query = { _id: id };
  }
  const project = await Project.findOne(query).lean();
  return project;
};

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await getProject(id);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} Case Study`,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: project.images?.[0] ? [project.images[0]] : [],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.description,
      images: project.images?.[0] ? [project.images[0]] : [],
    },
  };
}

const ProjectDetailsPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const project = await getProject(id);

  if (!project) {
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
          name: project.title as string,
          description: project.description as string,
          image: (project.images as string[])?.[0],
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

            <p className="mt-6 text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              {project.description}
            </p>

            {/* TECH */}
            <div className="flex flex-wrap gap-3 mt-8">
              {project.technologies?.map((tech: string) => (
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
            
            <div className="flex gap-4 mt-8">
              {project.liveLink && (
                <a href={project.liveLink} target="_blank" className="px-6 py-2 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition">
                  Live Preview
                </a>
              )}
              {project.githubLink && (
                <a href={project.githubLink} target="_blank" className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                  Source Code
                </a>
              )}
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
              src={project.images?.[0] || "/placeholder.jpg"}
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

      {/* ================= GALLERY OR MORE ================= */}
      {project.images && project.images.length > 1 && (
        <section className="max-w-6xl mx-auto px-6 pb-24">
          <h2 className="text-3xl font-bold mb-8">Project Gallery</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {project.images.slice(1).map((img: string, i: number) => (
              <img key={i} src={img} alt={`Gallery image ${i+1}`} className="rounded-xl shadow-lg w-full h-64 object-cover" />
            ))}
          </div>
        </section>
      )}

      {/* BACK BUTTON */}
      <section className="max-w-4xl mx-auto px-6 pb-24 text-center">
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
      </section>
    </main>
  );
};

export default ProjectDetailsPage;
