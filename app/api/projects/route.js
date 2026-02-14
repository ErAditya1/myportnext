import { NextResponse } from "next/server";
import { readProjects } from "@/lib/content-store";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const featured = searchParams.get("featured");
  const projects = await readProjects();

  const publishedProjects = projects.filter((item) => item.status === "published");
  const filtered =
    featured === "1"
      ? publishedProjects.filter((item) => item.featured)
      : publishedProjects;

  return NextResponse.json(filtered);
}
