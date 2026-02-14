import { redirect } from "next/navigation";
import { requireAdminSession } from "@/lib/auth";
import { readProjects } from "@/lib/content-store";
import AdminProjectsClient from "@/components/admin/AdminProjectsClient";

const AdminProjectsPage = async () => {
  const isAdmin = await requireAdminSession();
  if (!isAdmin) redirect("/admin/login");

  const projects = await readProjects();
  return <AdminProjectsClient initialProjects={projects} />;
};

export default AdminProjectsPage;
