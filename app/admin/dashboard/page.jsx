import Link from "next/link";
import { redirect } from "next/navigation";
import { requireAdminSession } from "@/lib/auth";
import LogoutButton from "@/components/admin/LogoutButton";

const DashboardPage = async () => {
  const isAdmin = await requireAdminSession();
  if (!isAdmin) redirect("/admin/login");

  return (
    <main className="min-h-screen pt-24 px-4 bg-gradient-to-r from-blue-100 via-purple-100 to-pink-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
            Admin Dashboard
          </h1>
          <LogoutButton />
        </div>

        <div className="grid sm:grid-cols-2 gap-6 mt-8">
          <Link
            href="/admin/projects"
            className="p-6 rounded-xl bg-white dark:bg-gray-900 shadow-lg border border-gray-200 dark:border-gray-700"
          >
            <h2 className="font-semibold text-lg">Manage Projects</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
              Add, edit, publish/unpublish, and delete projects.
            </p>
          </Link>
          <Link
            href="/admin/blog"
            className="p-6 rounded-xl bg-white dark:bg-gray-900 shadow-lg border border-gray-200 dark:border-gray-700"
          >
            <h2 className="font-semibold text-lg">Manage Blog</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
              Create posts, save drafts, and publish articles.
            </p>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default DashboardPage;
