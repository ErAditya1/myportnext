import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Project from '@/models/Project';
import { uploadToCloudinary } from '@/lib/cloudinary';

export async function GET() {
  try {
    await dbConnect();
    const projects = await Project.find({}).sort({ createdAt: -1 });
    return NextResponse.json(projects);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const formData = await request.formData();
    
    // Extract text fields
    const title = formData.get('title') as string;
    const slug = formData.get('slug') as string;
    const description = formData.get('description') as string;
    const githubLink = formData.get('githubLink') as string;
    const liveLink = formData.get('liveLink') as string;
    const category = formData.get('category') as string;
    
    // Arrays need special handling
    const technologies = formData.getAll('technologies') as string[];
    const tags = formData.getAll('tags') as string[];
    
    // File handling
    const images: string[] = [];
    const files = formData.getAll('images') as File[];
    
    for (const file of files) {
      if (file && file.size > 0) {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const result = await uploadToCloudinary(buffer, 'portfolio/projects');
        images.push(result.secure_url);
      }
    }
    
    const project = await Project.create({
      title,
      slug,
      description,
      githubLink,
      liveLink,
      category,
      technologies,
      tags,
      images,
    });
    
    return NextResponse.json(project, { status: 201 });
  } catch (error: unknown) {
    console.error('Create project error:', error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message || 'Failed to create project' }, { status: 500 });
  }
}
