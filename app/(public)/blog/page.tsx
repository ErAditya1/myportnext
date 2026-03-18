import Link from "next/link";
import dbConnect from "@/lib/mongodb";
import Blog from "@/models/Blog";

export const metadata = {
  title: "Blog | Full Stack Developer Insights",
  description:
    "Engineering articles on Next.js, performance, SEO, and full stack development.",
};

const BlogPage = async () => {
  await dbConnect();
  
  // Fetch blogs from DB, sorted by newest
  const dbBlogs = await Blog.find({}).sort({ createdAt: -1 }).lean();

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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {dbBlogs.map((post: any) => {
            const plainTextContent = (post.content || '').replace(/<[^>]+>/g, '');
            const excerpt = plainTextContent.substring(0, 100) + (plainTextContent.length > 100 ? '...' : '');

            return (
              <article
                key={post._id.toString()}
                className="group relative flex flex-col h-full rounded-2xl bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm shadow-xl border border-gray-100 dark:border-gray-800 hover:border-emerald-500/50 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
                <div className="relative h-48 w-full overflow-hidden">
                  {post.featuredImage ? (
                    <img 
                      src={post.featuredImage} 
                      alt={post.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center text-gray-400">
                       No Image
                    </div>
                  )}
                  <div className="absolute top-4 left-4">
                    <span className="bg-emerald-500 text-white text-[10px] uppercase font-bold px-3 py-1 rounded-full shadow-lg">
                      {post.category || 'Tech'}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <p className="text-xs text-gray-500 mb-2">
                    {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </p>
                  
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-emerald-500 transition-colors line-clamp-2 mb-3">
                    {post.title}
                  </h2>
                  
                  <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3 mb-6 flex-grow">
                    {excerpt}
                  </p>
                  
                  <div className="mt-auto flex items-center justify-between">
                    <div className="flex gap-2">
                      {(post.tags as string[])?.slice(0, 2).map((tag: string, i: number) => (
                        <span key={i} className="text-[9px] text-gray-400 border border-gray-200 dark:border-gray-800 px-2 py-0.5 rounded-full">
                          #{tag.toLowerCase()}
                        </span>
                      ))}
                    </div>
                    
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-sm font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 hover:gap-2 transition-all"
                    >
                      Read Post <span className="text-lg">→</span>
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </main>
  );
};

export default BlogPage;
