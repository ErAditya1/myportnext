'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { UploadCloud, X, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function CreateProject() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: '',
    description: '',
    githubLink: '',
    liveLink: '',
    technologies: '',
    tags: '',
  });

  const [files, setFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...selectedFiles]);
      
      const newUrls = selectedFiles.map(file => URL.createObjectURL(file));
      setPreviewUrls((prev) => [...prev, ...newUrls]);
    }
  };

  const removeFile = (index: number) => {
    URL.revokeObjectURL(previewUrls[index]);
    setFiles(files.filter((_, i) => i !== index));
    setPreviewUrls(previewUrls.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'technologies' || key === 'tags') {
          // split by comma and trim
          const arr = value.split(',').map((item) => item.trim()).filter(Boolean);
          arr.forEach((item) => data.append(key, item));
        } else {
          data.append(key, value);
        }
      });

      files.forEach(file => {
        data.append('images', file);
      });

      const res = await fetch('/api/projects', {
        method: 'POST',
        body: data,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to create project');
      }

      router.push('/admin/projects');
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-8">
        <Link href="/admin/projects" className="text-zinc-400 hover:text-white flex items-center gap-2 w-fit mb-4">
          <ArrowLeft size={16} /> Back to Projects
        </Link>
        <h1 className="text-3xl font-bold">Create New Project</h1>
      </div>

      {error && <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-4 rounded-xl mb-6">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-6 bg-zinc-900 border border-zinc-800 p-6 rounded-xl">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">Title *</label>
            <input required type="text" className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} placeholder="e.g. E-Commerce Platform" />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">Slug *</label>
            <input required type="text" className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} placeholder="e.g. e-commerce-platform" />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">Category</label>
            <input type="text" className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} placeholder="e.g. Fullstack Development" />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">Technologies (comma separated)</label>
            <input type="text" className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" value={formData.technologies} onChange={e => setFormData({...formData, technologies: e.target.value})} placeholder="React, Node.js, MongoDB" />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">Live Link</label>
            <input type="url" className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" value={formData.liveLink} onChange={e => setFormData({...formData, liveLink: e.target.value})} placeholder="https://..." />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">GitHub Link</label>
            <input type="url" className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" value={formData.githubLink} onChange={e => setFormData({...formData, githubLink: e.target.value})} placeholder="https://github.com/..." />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">Tags (comma separated)</label>
          <input type="text" className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" value={formData.tags} onChange={e => setFormData({...formData, tags: e.target.value})} placeholder="portfolio, nextjs" />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">Description *</label>
          <textarea required rows={5} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} placeholder="Describe your project..."></textarea>
        </div>

        <div>
           <label className="block text-sm font-medium text-zinc-300 mb-2">Project Images</label>
           <div className="border-2 border-dashed border-zinc-700 rounded-xl p-8 text-center bg-zinc-950/50 hover:bg-zinc-900 transition relative">
              <input type="file" multiple accept="image/*" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
              <UploadCloud className="mx-auto h-8 w-8 text-zinc-500 mb-3" />
              <p className="text-zinc-400 text-sm">Drag and drop images here, or click to select</p>
           </div>
           
           {previewUrls.length > 0 && (
             <div className="flex flex-wrap gap-4 mt-4">
               {previewUrls.map((url, i) => (
                 <div key={i} className="relative w-24 h-24 rounded-lg overflow-hidden border border-zinc-700">
                   <img src={url} alt={`Preview ${i}`} className="object-cover w-full h-full" />
                   <button type="button" onClick={() => removeFile(i)} className="absolute top-1 right-1 bg-black/50 hover:bg-red-500 p-1 rounded-full text-white transition">
                     <X size={14} />
                   </button>
                 </div>
               ))}
             </div>
           )}
        </div>

        <div className="pt-4 flex justify-end">
          <button disabled={loading} type="submit" className="bg-white text-black font-semibold rounded-lg px-6 py-3 hover:bg-zinc-200 transition disabled:opacity-50 flex items-center gap-2">
            {loading ? 'Creating...' : 'Create Project'}
          </button>
        </div>
      </form>
    </div>
  );
}
