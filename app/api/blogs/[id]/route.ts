import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Blog from '@/models/Blog';
import { uploadToCloudinary } from '@/lib/cloudinary';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  try {
    await dbConnect();
    const blog = await Blog.findById(id);
    if (!blog) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(blog);
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
      const content = formData.get('content') as string;
      const category = formData.get('category') as string;
      const metaTitle = formData.get('metaTitle') as string;
      const metaDescription = formData.get('metaDescription') as string;
      const tags = formData.getAll('tags') as string[];
      
      // Handle image
      let featuredImage = formData.get('existingImage') as string;
      const file = formData.get('featuredImage') as File;
      
      if (file && file.size > 0) {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const result = await uploadToCloudinary(buffer, 'portfolio/blogs');
        featuredImage = result.secure_url;
      }

      updateData = {
        title,
        slug,
        content,
        category,
        tags,
        metaTitle,
        metaDescription,
        featuredImage,
      };
    } else {
      updateData = await request.json();
    }

    const blog = await Blog.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
    if (!blog) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(blog);
  } catch (error: unknown) {
    console.error('Update blog error:', error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  try {
    await dbConnect();
    const blog = await Blog.findByIdAndDelete(id);
    if (!blog) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ message: 'Deleted successfully' });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
