import { NextResponse } from "next/server";
import { readProjects } from "@/lib/content-store";

export async function GET(_, { params }) {
  const { id } = await params;
  const projects = await readProjects();
  const project = projects.find((item) => item.id === id || item.slug === id);

  if (!project || project.status !== "published") {
    return NextResponse.json({ message: "Project not found" }, { status: 404 });
  }

  return NextResponse.json(project);
}
