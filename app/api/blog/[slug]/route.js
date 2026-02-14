import { NextResponse } from "next/server";
import { readBlogs } from "@/lib/content-store";

export async function GET(_, { params }) {
  const { slug } = await params;
  const blogs = await readBlogs();
  const post = blogs.find((item) => item.slug === slug || item.id === slug);

  if (!post || post.status !== "published") {
    return NextResponse.json({ message: "Blog not found" }, { status: 404 });
  }

  return NextResponse.json(post);
}
