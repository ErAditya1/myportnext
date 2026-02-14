import { readBlogs, readProjects } from "@/lib/content-store";

export default async function sitemap() {
  const baseUrl = "https://your-portfolio-domain.com";
  const projects = await readProjects();
  const blogs = await readBlogs();

  const projectUrls = projects
    .filter((item) => item.status === "published")
    .map((item) => ({
      url: `${baseUrl}/projects/${item.slug || item.id}`,
      changeFrequency: "monthly",
      priority: 0.8,
    }));

  const blogUrls = blogs
    .filter((item) => item.status === "published")
    .map((item) => ({
      url: `${baseUrl}/blog/${item.slug}`,
      changeFrequency: "monthly",
      priority: 0.7,
    }));

  return [
    { url: `${baseUrl}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/about`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/project`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/blog`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/contact`, changeFrequency: "monthly", priority: 0.8 },
    ...projectUrls,
    ...blogUrls,
  ];
}
