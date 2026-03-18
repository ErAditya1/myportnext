import dbConnect from "@/lib/mongodb";
import Project from "@/models/Project";
import Blog from "@/models/Blog";

export default async function sitemap() {
  const baseUrl = "https://officialdurgesh.vercel.app"; // Using the actual domain found in page.tsx SEO headers
  
  await dbConnect();

  // Fetch all slugs dynamically with only necessary fields to save memory
  const projects = await Project.find({}).select("slug updatedAt").lean();
  const blogs = await Blog.find({}).select("slug updatedAt").lean();

  const projectUrls = projects.map((item) => ({
    url: `${baseUrl}/projects/${item.slug}`,
    lastModified: item.updatedAt || new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const blogUrls = blogs.map((item) => ({
    url: `${baseUrl}/blog/${item.slug}`,
    lastModified: item.updatedAt || new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    { url: `${baseUrl}/`, changeFrequency: "weekly", priority: 1, lastModified: new Date() },
    { url: `${baseUrl}/about`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/project`, changeFrequency: "weekly", priority: 0.9, lastModified: new Date() },
    { url: `${baseUrl}/blog`, changeFrequency: "weekly", priority: 0.9, lastModified: new Date() },
    { url: `${baseUrl}/contact`, changeFrequency: "monthly", priority: 0.8 },
    ...projectUrls,
    ...blogUrls,
  ];
}
