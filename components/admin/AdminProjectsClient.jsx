"use client";

import { useState } from "react";

const emptyForm = {
  title: "",
  summary: "",
  description: "",
  technologies: "",
  image: "",
  status: "draft",
};

const AdminProjectsClient = ({ initialProjects }) => {
  const [projects, setProjects] = useState(initialProjects);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");

  const submit = async (event) => {
    event.preventDefault();
    const payload = {
      ...form,
      technologies: form.technologies
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
    };

    const response = await fetch("/api/admin/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      setError("Failed to create project.");
      return;
    }

    const created = await response.json();
    setProjects((prev) => [created, ...prev]);
    setForm(emptyForm);
    setError("");
  };

  const removeProject = async (id) => {
    const response = await fetch(`/api/admin/projects/${id}`, { method: "DELETE" });
    if (!response.ok) {
      setError("Failed to delete project.");
      return;
    }
    setProjects((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <main className="min-h-screen pt-24 px-4 bg-gradient-to-r from-blue-100 via-purple-100 to-pink-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8">
        <section className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6">
          <h1 className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
            Create Project
          </h1>
          <form className="mt-4 space-y-3" onSubmit={submit}>
            <input
              className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />
            <textarea
              className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
              placeholder="Summary"
              value={form.summary}
              onChange={(e) => setForm({ ...form, summary: e.target.value })}
              required
            />
            <textarea
              className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
              placeholder="Description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              required
            />
            <input
              className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
              placeholder="Technologies (comma separated)"
              value={form.technologies}
              onChange={(e) => setForm({ ...form, technologies: e.target.value })}
              required
            />
            <input
              className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
              placeholder="Image URL"
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
            />
            <select
              className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
            {error ? <p className="text-sm text-red-600">{error}</p> : null}
            <button className="w-full p-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold">
              Save Project
            </button>
          </form>
        </section>

        <section className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold">All Projects</h2>
          <div className="mt-4 space-y-3 max-h-[560px] overflow-auto pr-1">
            {projects.map((project) => (
              <div
                key={project.id}
                className="p-4 rounded-lg border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold">{project.title}</p>
                    <p className="text-xs mt-1 uppercase tracking-wide text-gray-500">
                      {project.status}
                    </p>
                  </div>
                  <button
                    onClick={() => removeProject(project.id)}
                    className="px-3 py-1 rounded bg-red-600 text-white text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default AdminProjectsClient;
