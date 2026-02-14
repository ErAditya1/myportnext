import { NextResponse } from "next/server";
import { readBlogs } from "@/lib/content-store";

export async function GET() {
  const blogs = await readBlogs();
  const publishedBlogs = blogs.filter((item) => item.status === "published");
  return NextResponse.json(publishedBlogs);
}
