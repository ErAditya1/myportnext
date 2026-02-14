import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/auth";
import { readBlogs, writeBlogs } from "@/lib/content-store";
import { toSlug } from "@/lib/slug";

const validateBlog = (payload) => {
  if (!payload?.title || !payload?.excerpt || !payload?.content) return false;
  return true;
};

export async function GET() {
  const isAdmin = await requireAdminSession();
  if (!isAdmin) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const blogs = await readBlogs();
  return NextResponse.json(blogs);
}

export async function POST(request) {
  const isAdmin = await requireAdminSession();
  if (!isAdmin) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  if (!validateBlog(body)) {
    return NextResponse.json({ message: "Invalid payload" }, { status: 400 });
  }

  const blogs = await readBlogs();
  const status = body.status === "draft" ? "draft" : "published";
  const now = new Date().toISOString();

  const post = {
    id: Date.now().toString(),
    title: body.title,
    slug: toSlug(body.title),
    excerpt: body.excerpt,
    content: body.content,
    coverImage: body.coverImage || "",
    tags: Array.isArray(body.tags) ? body.tags : [],
    status,
    seoTitle: body.seoTitle || "",
    seoDescription: body.seoDescription || "",
    publishedAt: status === "published" ? now : null,
    createdAt: now,
    updatedAt: now,
  };

  blogs.unshift(post);
  await writeBlogs(blogs);
  return NextResponse.json(post, { status: 201 });
}
