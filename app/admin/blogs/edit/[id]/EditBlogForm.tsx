'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { UploadCloud, X, ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });
import 'react-quill-new/dist/quill.snow.css';

export default function EditBlogForm({ id }: { id: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: '',
    metaTitle: '',
    metaDescription: '',
    tags: '',
  });

  const [content, setContent] = useState('');
  const [existingImage, setExistingImage] = useState<string | null>(null);
  const [newFile, setNewFile] = useState<File | null>(null);
  const [newPreviewUrl, setNewPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`/api/blogs/${id}`);
        if (!res.ok) throw new Error('Failed to fetch blog post');
        const data = await res.json();
        
        setFormData({
          title: data.title || '',
          slug: data.slug || '',
          category: data.category || '',
          metaTitle: data.metaTitle || '',
          metaDescription: data.metaDescription || '',
          tags: data.tags?.join(', ') || '',
        });
        setContent(data.content || '');
        setExistingImage(data.featuredImage || null);
      } catch (err: unknown) {
        const errorMsg = err instanceof Error ? err.message : 'An error occurred';
        setError(errorMsg);
      } finally {
        setFetching(false);
      }
    };
    fetchBlog();
  }, [id]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setNewFile(selectedFile);
      setNewPreviewUrl(URL.createObjectURL(selectedFile));
    }
  };

  const removeNewFile = () => {
    if (newPreviewUrl) URL.revokeObjectURL(newPreviewUrl);
    setNewFile(null);
    setNewPreviewUrl(null);
  };

  const removeExistingImage = () => {
    setExistingImage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'tags') {
          const arr = value.split(',').map((item) => item.trim()).filter(Boolean);
          arr.forEach((item) => data.append(key, item));
        } else {
          data.append(key, value);
        }
      });

      data.append('content', content);

      if (newFile) {
        data.append('featuredImage', newFile);
      } else if (existingImage) {
        data.append('existingImage', existingImage);
      }

      const res = await fetch(`/api/blogs/${id}`, {
        method: 'PUT',
        body: data,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to update blog post');
      }

      router.push('/admin/blogs');
      router.refresh();
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <div className="p-8 text-center text-zinc-400">Loading blog post...</div>;

  return (
    <div className="p-8 max-w-5xl">
      <div className="mb-8">
        <Link href="/admin/blogs" className="text-zinc-400 hover:text-white flex items-center gap-2 w-fit mb-4">
          <ArrowLeft size={16} /> Back to Blogs
        </Link>
        <h1 className="text-3xl font-bold">Edit Blog Post: {formData.title}</h1>
      </div>

      {error && <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-4 rounded-xl mb-6">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-6 bg-zinc-900 border border-zinc-800 p-6 rounded-xl">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">Title *</label>
            <input required type="text" className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">Slug *</label>
            <input required type="text" className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">Category</label>
            <input type="text" className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">Tags (comma separated)</label>
            <input type="text" className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" value={formData.tags} onChange={e => setFormData({...formData, tags: e.target.value})} />
          </div>
        </div>

        <div>
           <label className="block text-sm font-medium text-zinc-300 mb-2">Featured Image</label>
           
           {(existingImage || newPreviewUrl) ? (
             <div className="relative w-64 h-40 rounded-lg overflow-hidden border border-zinc-700 mb-4">
               <img src={newPreviewUrl || existingImage!} alt="Preview" className="object-cover w-full h-full" />
               <button type="button" onClick={newPreviewUrl ? removeNewFile : removeExistingImage} className="absolute top-2 right-2 bg-black/50 hover:bg-red-500 p-2 rounded-full text-white transition">
                 <X size={16} />
               </button>
             </div>
           ) : (
             <div className="border-2 border-dashed border-zinc-700 rounded-xl p-8 text-center bg-zinc-950/50 hover:bg-zinc-900 transition relative">
                <input type="file" accept="image/*" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                <UploadCloud className="mx-auto h-8 w-8 text-zinc-500 mb-3" />
                <p className="text-zinc-400 text-sm">Upload new featured image</p>
             </div>
           )}
           
           {newPreviewUrl && existingImage && (
             <p className="text-xs text-amber-500 mt-2">Note: New image will replace the existing one.</p>
           )}
        </div>

        <div className="pt-2">
          <label className="block text-sm font-medium text-zinc-300 mb-2">Content *</label>
          <div className="bg-white text-black rounded-lg overflow-hidden">

            <ReactQuill 
              theme="snow" 
              value={content} 
              onChange={setContent} 
              className="h-96 pb-12"
            />
          </div>
        </div>

        <div className="pt-8 border-t border-zinc-800 space-y-6">
          <h3 className="text-lg font-medium text-white">SEO Optimization</h3>
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">Meta Title</label>
              <input type="text" className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" value={formData.metaTitle} onChange={e => setFormData({...formData, metaTitle: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-300 mb-2">Meta Description</label>
              <textarea className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" value={formData.metaDescription} onChange={e => setFormData({...formData, metaDescription: e.target.value})}></textarea>
            </div>
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <button disabled={loading} type="submit" className="bg-emerald-600 text-white font-semibold rounded-lg px-6 py-3 hover:bg-emerald-700 transition disabled:opacity-50 flex items-center gap-2">
            {loading ? 'Saving...' : <><Save size={18} /> Update Blog Post</>}
          </button>
        </div>
      </form>
    </div>
  );
}
