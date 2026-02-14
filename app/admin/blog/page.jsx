import { redirect } from "next/navigation";
import { requireAdminSession } from "@/lib/auth";
import { readBlogs } from "@/lib/content-store";
import AdminBlogClient from "@/components/admin/AdminBlogClient";

const AdminBlogPage = async () => {
  const isAdmin = await requireAdminSession();
  if (!isAdmin) redirect("/admin/login");

  const blogs = await readBlogs();
  return <AdminBlogClient initialPosts={blogs} />;
};

export default AdminBlogPage;
