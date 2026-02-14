import Link from "next/link";
import { readBlogs } from "@/lib/content-store";

export const metadata = {
  title: "Blog | Full Stack Developer Insights",
  description:
    "Engineering articles on Next.js, performance, SEO, and full stack development.",
};

const BlogPage = async () => {
  const blogs = await readBlogs();
  const publishedBlogs = blogs.filter((item) => item.status === "published");

  return (
    <main
      id="main-content"
      className="min-h-screen pt-24 px-4 pb-12 bg-gradient-to-r from-blue-100 via-purple-100 to-pink-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800"
    >
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center font-palyWrite text-gray-900 dark:text-white">
          Developer Blog
        </h1>
        <p className="text-center mt-3 text-gray-600 dark:text-gray-300">
          Practical insights on building scalable and high-performance web apps.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mt-10">
          {publishedBlogs.map((post) => (
            <article
              key={post.id}
              className="p-6 rounded-xl bg-white dark:bg-gray-900 shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <p className="text-xs uppercase tracking-wide text-emerald-600 dark:text-emerald-400">
                Blog
              </p>
              <h2 className="mt-2 text-xl font-bold text-gray-900 dark:text-white">
                {post.title}
              </h2>
              <p className="mt-3 text-gray-700 dark:text-gray-300">{post.excerpt}</p>
              <Link
                href={`/blog/${post.slug}`}
                className="inline-block mt-5 text-emerald-600 dark:text-emerald-400 font-semibold"
              >
                Read Article
              </Link>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
};

export default BlogPage;
