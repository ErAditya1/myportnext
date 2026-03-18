'use client';

import { useState, useEffect } from 'react';
import { Plus, Trash2, Edit } from 'lucide-react';
import Link from 'next/link';

export default function BlogsAdmin() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = async () => {
    try {
      const res = await fetch('/api/blogs');
      const data = await res.json();
      setBlogs(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return;
    try {
      await fetch(`/api/blogs/${id}`, { method: 'DELETE' });
      fetchBlogs();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Blogs Management</h1>
        <Link href="/admin/blogs/create" className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-lg font-medium hover:bg-zinc-200 transition">
          <Plus size={18} /> Add Blog Post
        </Link>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-zinc-400">Loading blogs...</div>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-950 border-b border-zinc-800 text-sm text-zinc-400">
                <th className="p-4 font-medium">Title</th>
                <th className="p-4 font-medium">Category</th>
                <th className="p-4 font-medium">Date</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {blogs.map((blog: any) => (
                <tr key={blog._id} className="hover:bg-zinc-800/30 transition">
                  <td className="p-4 font-medium">{blog.title}</td>
                  <td className="p-4 text-zinc-400">{blog.category || 'N/A'}</td>
                  <td className="p-4 text-zinc-400">{new Date(blog.createdAt).toLocaleDateString()}</td>
                  <td className="p-4 flex gap-3 justify-end text-zinc-400">
                    <Link href={`/admin/blogs/edit/${blog._id}`} className="hover:text-white transition">
                      <Edit size={18} />
                    </Link>
                    <button onClick={() => handleDelete(blog._id)} className="hover:text-red-400 transition">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              {blogs.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-zinc-500">No blog posts found. Create one.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
