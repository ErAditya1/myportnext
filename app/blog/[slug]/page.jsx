import { notFound } from "next/navigation";
import { readBlogs } from "@/lib/content-store";
import StructuredData from "@/components/seo/StructuredData";

const getPost = async (slug) => {
  const blogs = await readBlogs();
  return blogs.find((item) => item.slug === slug);
};

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) return { title: "Article Not Found" };

  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      images: post.coverImage ? [post.coverImage] : [],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      images: post.coverImage ? [post.coverImage] : [],
    },
  };
}

const BlogDetailsPage = async ({ params }) => {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post || post.status !== "published") notFound();

  return (
    <main
      id="main-content"
      className="min-h-screen pt-24 px-4 pb-12 bg-gradient-to-r from-blue-100 via-purple-100 to-pink-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800"
    >
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: post.title,
          description: post.excerpt,
          author: {
            "@type": "Person",
            name: "Durgesh Kumar",
          },
          datePublished: post.publishedAt || post.createdAt,
        }}
      />
      <article className="max-w-3xl mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
        <p className="text-xs uppercase tracking-wide text-emerald-600 dark:text-emerald-400">
          Article
        </p>
        <h1 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
          {post.title}
        </h1>
        <p className="mt-5 text-gray-700 dark:text-gray-300 leading-7">{post.content}</p>
      </article>
    </main>
  );
};

export default BlogDetailsPage;
