import dbConnect from "@/lib/mongodb";
import Blog from "@/models/Blog";
import BlogContent from "./BlogContent";

const BlogSection = async () => {
  await dbConnect();
  const dbBlogs = await Blog.find({}).sort({ createdAt: -1 }).limit(3).lean();
  
  // Serialize for client component
  const posts = dbBlogs.map((post: any) => ({
    ...post,
    _id: post._id.toString(),
    createdAt: post.createdAt.toISOString(),
    updatedAt: post.updatedAt ? post.updatedAt.toISOString() : null,
  }));

  return <BlogContent posts={posts} />;
};

export default BlogSection;
