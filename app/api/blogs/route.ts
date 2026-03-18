import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Blog from '@/models/Blog';
import { uploadToCloudinary } from '@/lib/cloudinary';

export async function GET() {
  try {
    await dbConnect();
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    return NextResponse.json(blogs);
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
    const content = formData.get('content') as string;
    const category = formData.get('category') as string;
    const metaTitle = formData.get('metaTitle') as string;
    const metaDescription = formData.get('metaDescription') as string;
    const tags = formData.getAll('tags') as string[];
    
    // File handling
    let featuredImage = '';
    const file = formData.get('featuredImage') as File;
    
    if (file && file.size > 0) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const result = await uploadToCloudinary(buffer, 'portfolio/blogs');
      featuredImage = result.secure_url;
    }
    
    const blog = await Blog.create({
      title,
      slug,
      content,
      category,
      tags,
      metaTitle,
      metaDescription,
      ...(featuredImage && { featuredImage }),
    });
    
    return NextResponse.json(blog, { status: 201 });
  } catch (error: unknown) {
    console.error('Create blog error:', error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message || 'Failed to create blog' }, { status: 500 });
  }
}
