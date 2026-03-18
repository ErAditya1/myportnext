"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { HiArrowNarrowRight, HiCalendar } from "react-icons/hi";

const BlogContent = ({ posts }: { posts: any[] }) => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-extrabold mb-4"
            >
              Latest <span className="text-gradient">Insights</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-gray-600 dark:text-gray-400 text-lg"
            >
              Sharing my thoughts on software architecture, modern development practices, 
              and the evolving tech landscape.
            </motion.p>
          </div>
          
          <motion.div
             initial={{ opacity: 0, x: 20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
          >
            <Link 
              href="/blog" 
              className="group inline-flex items-center gap-2 font-bold text-emerald-600 dark:text-emerald-400 hover:gap-4 transition-all duration-300"
            >
              View All Articles
              <HiArrowNarrowRight />
            </Link>
          </motion.div>
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((post: any, index: number) => (
            <motion.article
              key={post._id?.toString() || post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group flex flex-col glass p-8 rounded-[2.5rem] border border-gray-100 dark:border-white/5 shadow-xl transition-all duration-500"
            >
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-500 uppercase tracking-widest mb-4">
                <HiCalendar className="text-sm" />
                {post.createdAt ? new Date(post.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                }) : "Recent"}
              </div>

              <h3 className="text-xl font-bold dark:text-white group-hover:text-emerald-500 transition-colors line-clamp-2 mb-4">
                {post.title}
              </h3>

              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed line-clamp-3 mb-8">
                {(post.content || "").replace(/<[^>]+>/g, "").substring(0, 120)}...
              </p>

              <div className="mt-auto pt-6 border-t border-gray-100 dark:border-white/5">
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-2 font-bold text-sm text-gray-900 dark:text-white group/link"
                >
                  Read Full Article
                  <HiArrowNarrowRight className="group-hover/link:translate-x-2 transition-transform text-emerald-500" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogContent;
