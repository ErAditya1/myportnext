"use client";

import { useState } from "react";

const emptyForm = {
  title: "",
  excerpt: "",
  content: "",
  tags: "",
  status: "draft",
};

const AdminBlogClient = ({ initialPosts }) => {
  const [posts, setPosts] = useState(initialPosts);
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");

  const submit = async (event) => {
    event.preventDefault();
    const payload = {
      ...form,
      tags: form.tags.split(",").map((item) => item.trim()).filter(Boolean),
    };

    const response = await fetch("/api/admin/blog", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      setError("Failed to save post.");
      return;
    }

    const created = await response.json();
    setPosts((prev) => [created, ...prev]);
    setForm(emptyForm);
    setError("");
  };

  const removePost = async (id) => {
    const response = await fetch(`/api/admin/blog/${id}`, { method: "DELETE" });
    if (!response.ok) {
      setError("Failed to delete post.");
      return;
    }
    setPosts((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <main className="min-h-screen pt-24 px-4 bg-gradient-to-r from-blue-100 via-purple-100 to-pink-50 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8">
        <section className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6">
          <h1 className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
            Create Blog Post
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
              placeholder="Excerpt"
              value={form.excerpt}
              onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
              required
            />
            <textarea
              className="w-full p-3 min-h-40 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
              placeholder="Content"
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              required
            />
            <input
              className="w-full p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
              placeholder="Tags (comma separated)"
              value={form.tags}
              onChange={(e) => setForm({ ...form, tags: e.target.value })}
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
              Save Blog
            </button>
          </form>
        </section>

        <section className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold">All Posts</h2>
          <div className="mt-4 space-y-3 max-h-[560px] overflow-auto pr-1">
            {posts.map((post) => (
              <div
                key={post.id}
                className="p-4 rounded-lg border border-gray-200 dark:border-gray-700"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold">{post.title}</p>
                    <p className="text-xs mt-1 uppercase tracking-wide text-gray-500">
                      {post.status}
                    </p>
                  </div>
                  <button
                    onClick={() => removePost(post.id)}
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

export default AdminBlogClient;
