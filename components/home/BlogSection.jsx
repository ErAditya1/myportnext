import Link from "next/link";
import { readBlogs } from "@/lib/content-store";

const BlogSection = async () => {
  const blogs = await readBlogs();
  const posts = blogs.filter((item) => item.status === "published").slice(0, 3);

  return (
    <section className="py-20 px-4 bg-gradient-to-r from-blue-100 via-purple-100 to-pink-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Latest Articles
          </h2>
          <Link href="/blog" className="text-emerald-600 dark:text-emerald-400 font-semibold">
            View all
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          {posts.map((post) => (
            <article
              key={post.id}
              className="p-5 rounded-xl bg-white dark:bg-gray-900 shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {post.title}
              </h3>
              <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">{post.excerpt}</p>
              <Link
                href={`/blog/${post.slug}`}
                className="inline-block mt-4 text-emerald-600 dark:text-emerald-400 font-semibold"
              >
                Read more
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
