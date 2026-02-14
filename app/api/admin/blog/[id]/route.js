import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/auth";
import { readBlogs, writeBlogs } from "@/lib/content-store";
import { toSlug } from "@/lib/slug";

export async function PATCH(request, { params }) {
  const isAdmin = await requireAdminSession();
  if (!isAdmin) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = await request.json();
  const blogs = await readBlogs();
  const index = blogs.findIndex((item) => item.id === id);
  if (index === -1) {
    return NextResponse.json({ message: "Blog not found" }, { status: 404 });
  }

  const current = blogs[index];
  const updated = {
    ...current,
    ...body,
    slug: toSlug(body.title || current.title),
    updatedAt: new Date().toISOString(),
  };

  blogs[index] = updated;
  await writeBlogs(blogs);
  return NextResponse.json(updated);
}

export async function DELETE(_, { params }) {
  const isAdmin = await requireAdminSession();
  if (!isAdmin) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const blogs = await readBlogs();
  const nextBlogs = blogs.filter((item) => item.id !== id);

  if (nextBlogs.length === blogs.length) {
    return NextResponse.json({ message: "Blog not found" }, { status: 404 });
  }

  await writeBlogs(nextBlogs);
  return NextResponse.json({ message: "Blog deleted" });
}
