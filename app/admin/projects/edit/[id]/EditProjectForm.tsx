'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { UploadCloud, X, ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';

export default function EditProjectForm({ id }: { id: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
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

  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [newFiles, setNewFiles] = useState<File[]>([]);
  const [newPreviewUrls, setNewPreviewUrls] = useState<string[]>([]);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await fetch(`/api/projects/${id}`);
        if (!res.ok) throw new Error('Failed to fetch project');
        const data = await res.json();
        
        setFormData({
          title: data.title || '',
          slug: data.slug || '',
          category: data.category || '',
          description: data.description || '',
          githubLink: data.githubLink || '',
          liveLink: data.liveLink || '',
          technologies: data.technologies?.join(', ') || '',
          tags: data.tags?.join(', ') || '',
        });
        setExistingImages(data.images || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setFetching(false);
      }
    };
    fetchProject();
  }, [id]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setNewFiles((prev) => [...prev, ...selectedFiles]);
      
      const newUrls = selectedFiles.map(file => URL.createObjectURL(file));
      setNewPreviewUrls((prev) => [...prev, ...newUrls]);
    }
  };

  const removeNewFile = (index: number) => {
    URL.revokeObjectURL(newPreviewUrls[index]);
    setNewFiles(newFiles.filter((_, i) => i !== index));
    setNewPreviewUrls(newPreviewUrls.filter((_, i) => i !== index));
  };

  const removeExistingImage = (index: number) => {
    setExistingImages(existingImages.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'technologies' || key === 'tags') {
          const arr = value.split(',').map((item) => item.trim()).filter(Boolean);
          arr.forEach((item) => data.append(key, item));
        } else {
          data.append(key, value);
        }
      });

      existingImages.forEach(img => data.append('existingImages', img));
      newFiles.forEach(file => data.append('images', file));

      const res = await fetch(`/api/projects/${id}`, {
        method: 'PUT',
        body: data,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to update project');
      }

      router.push('/admin/projects');
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <div className="p-8 text-center text-zinc-400">Loading project data...</div>;

  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-8">
        <Link href="/admin/projects" className="text-zinc-400 hover:text-white flex items-center gap-2 w-fit mb-4">
          <ArrowLeft size={16} /> Back to Projects
        </Link>
        <h1 className="text-3xl font-bold">Edit Project: {formData.title}</h1>
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
            <label className="block text-sm font-medium text-zinc-300 mb-2">Technologies (comma separated)</label>
            <input type="text" className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" value={formData.technologies} onChange={e => setFormData({...formData, technologies: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">Live Link</label>
            <input type="url" className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" value={formData.liveLink} onChange={e => setFormData({...formData, liveLink: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-2">GitHub Link</label>
            <input type="url" className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" value={formData.githubLink} onChange={e => setFormData({...formData, githubLink: e.target.value})} />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">Tags (comma separated)</label>
          <input type="text" className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" value={formData.tags} onChange={e => setFormData({...formData, tags: e.target.value})} />
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">Description *</label>
          <textarea required rows={5} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-zinc-300 mb-2">Project Images</label>
          
          {/* Existing Images */}
          {existingImages.length > 0 && (
            <div className="mb-4">
              <p className="text-xs text-zinc-500 mb-2 uppercase tracking-wider">Current Images</p>
              <div className="flex flex-wrap gap-4">
                {existingImages.map((url, i) => (
                  <div key={i} className="relative w-24 h-24 rounded-lg overflow-hidden border border-zinc-700">
                    <img src={url} alt={`Existing ${i}`} className="object-cover w-full h-full" />
                    <button type="button" onClick={() => removeExistingImage(i)} className="absolute top-1 right-1 bg-black/50 hover:bg-red-500 p-1 rounded-full text-white transition">
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="border-2 border-dashed border-zinc-700 rounded-xl p-8 text-center bg-zinc-950/50 hover:bg-zinc-900 transition relative">
            <input type="file" multiple accept="image/*" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
            <UploadCloud className="mx-auto h-8 w-8 text-zinc-500 mb-3" />
            <p className="text-zinc-400 text-sm">Add more images</p>
          </div>
          
          {newPreviewUrls.length > 0 && (
            <div className="flex flex-wrap gap-4 mt-4">
              <p className="w-full text-xs text-zinc-500 uppercase tracking-wider">New Images to upload</p>
              {newPreviewUrls.map((url, i) => (
                <div key={i} className="relative w-24 h-24 rounded-lg overflow-hidden border border-emerald-500/50">
                  <img src={url} alt={`New Preview ${i}`} className="object-cover w-full h-full" />
                  <button type="button" onClick={() => removeNewFile(i)} className="absolute top-1 right-1 bg-black/50 hover:bg-red-500 p-1 rounded-full text-white transition">
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="pt-4 flex justify-end">
          <button disabled={loading} type="submit" className="bg-emerald-600 text-white font-semibold rounded-lg px-6 py-3 hover:bg-emerald-700 transition disabled:opacity-50 flex items-center gap-2">
            {loading ? 'Saving...' : <><Save size={18} /> Update Project</>}
          </button>
        </div>
      </form>
    </div>
  );
}
