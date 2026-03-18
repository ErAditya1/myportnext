import { notFound } from "next/navigation";
import Link from "next/link";
import dbConnect from "@/lib/mongodb";
import Blog from "@/models/Blog";
import StructuredData from "@/components/seo/StructuredData";

const getPost = async (slug: string) => {
  await dbConnect();
  const post = await Blog.findOne({ slug }).lean();
  return post;
};

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) return { title: "Article Not Found" };

  const plainTextContent = (post.content || '').replace(/<[^>]+>/g, '');
  const excerpt = plainTextContent.substring(0, 150);

  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription || excerpt,
    openGraph: {
      title: post.metaTitle || post.title,
      description: post.metaDescription || excerpt,
      images: post.featuredImage ? [post.featuredImage] : [],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: post.metaTitle || post.title,
      description: post.metaDescription || excerpt,
      images: post.featuredImage ? [post.featuredImage] : [],
    },
  };
}

const BlogDetailsPage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) notFound();

  const plainTextContent = (post.content || '').replace(/<[^>]+>/g, '');
  const excerpt = plainTextContent.substring(0, 150);

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
          description: post.metaDescription || excerpt,
          image: [post.featuredImage],
          author: {
            "@type": "Person",
            name: "Durgesh Kumar",
          },
          datePublished: post.createdAt,
        }}
      />
      <div className="max-w-4xl mx-auto mb-8 flex items-center justify-between">
        <Link 
          href="/blog" 
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-emerald-500 transition-colors bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200 dark:border-gray-800"
        >
          <span className="text-xl">←</span> Back to Blog
        </Link>
        <div className="flex items-center gap-3 text-sm text-gray-500 font-medium">
           <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
           Reading Post
        </div>
      </div>

      <article className="max-w-4xl mx-auto bg-white/80 dark:bg-gray-950/80 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-900">
        
        {post.featuredImage && (
          <div className="w-full h-[300px] md:h-[500px] overflow-hidden relative">
            <img src={post.featuredImage} alt={post.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8 md:p-12">
               <div>
                  <span className="bg-emerald-500 text-white text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg mb-4 inline-block">
                    {post.category || 'Engineering'}
                  </span>
                  <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight drop-shadow-md">
                    {post.title}
                  </h1>
               </div>
            </div>
          </div>
        )}
        
        <div className="p-8 md:p-14 lg:p-20">
          {!post.featuredImage && (
            <div className="flex flex-col mb-10 pb-8 border-b border-gray-100 dark:border-gray-900">
               <span className="text-emerald-500 text-xs font-extrabold uppercase tracking-widest mb-4 inline-block">
                 {post.category || 'Article'}
               </span>
               <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight mb-8">
                 {post.title}
               </h1>
               
               <div className="flex items-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 font-bold">D</div>
                  <span>Durgesh Kumar</span>
                </div>
                <div className="flex items-center gap-2">
                   <span>•</span>
                   <span>{new Date(post.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
              </div>
            </div>
          )}

          {post.featuredImage && (
            <div className="flex items-center gap-6 mb-10 pb-8 border-b border-gray-100 dark:border-gray-900 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 font-bold">D</div>
                <span>Durgesh Kumar</span>
              </div>
              <div className="flex items-center gap-2">
                 <span>•</span>
                 <span>{new Date(post.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
              {post.tags?.length > 0 && (
                <div className="hidden md:flex gap-2">
                  <span>•</span>
                  {post.tags.slice(0, 2).map((tag: string, i: number) => (
                    <span key={i} className="text-xs text-gray-400">#{tag}</span>
                  ))}
                </div>
              )}
            </div>
          )}
          
          <div className="mt-6 flex flex-wrap gap-2 mb-8 border-b border-gray-200 dark:border-gray-800 pb-8">
            {post.tags?.map((tag: string, i: number) => (
              <span key={i} className="text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </div>
          
          <div 
            className="prose prose-lg max-w-none dark:prose-invert prose-emerald prose-headings:font-bold prose-a:text-emerald-600 text-gray-800 dark:text-gray-200"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </article>
    </main>
  );
};

export default BlogDetailsPage;
