import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Project from '@/models/Project';
import { uploadToCloudinary } from '@/lib/cloudinary';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  try {
    await dbConnect();
    const project = await Project.findById(id);
    if (!project) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(project);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  try {
    await dbConnect();
    const contentType = request.headers.get('content-type') || '';
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let updateData: any = {};

    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      
      const title = formData.get('title') as string;
      const slug = formData.get('slug') as string;
      const description = formData.get('description') as string;
      const githubLink = formData.get('githubLink') as string;
      const liveLink = formData.get('liveLink') as string;
      const category = formData.get('category') as string;
      
      const technologies = formData.getAll('technologies') as string[];
      const tags = formData.getAll('tags') as string[];
      
      // Handle images
      const existingImages = formData.getAll('existingImages') as string[];
      const newFiles = formData.getAll('images') as File[];
      
      const images = [...existingImages];
      
      for (const file of newFiles) {
        if (file && file.size > 0) {
          const arrayBuffer = await file.arrayBuffer();
          const buffer = Buffer.from(arrayBuffer);
          const result = await uploadToCloudinary(buffer, 'portfolio/projects');
          images.push(result.secure_url);
        }
      }

      updateData = {
        title,
        slug,
        description,
        githubLink,
        liveLink,
        category,
        technologies,
        tags,
        images,
      };
    } else {
      updateData = await request.json();
    }

    const project = await Project.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
    if (!project) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(project);
  } catch (error: unknown) {
    console.error('Update project error:', error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  try {
    await dbConnect();
    const project = await Project.findByIdAndDelete(id);
    if (!project) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ message: 'Deleted successfully' });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
