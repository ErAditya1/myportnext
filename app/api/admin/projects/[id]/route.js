import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/auth";
import { readProjects, writeProjects } from "@/lib/content-store";
import { toSlug } from "@/lib/slug";

export async function PATCH(request, { params }) {
  const isAdmin = await requireAdminSession();
  if (!isAdmin) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = await request.json();
  const projects = await readProjects();
  const index = projects.findIndex((item) => item.id === id);

  if (index === -1) {
    return NextResponse.json({ message: "Project not found" }, { status: 404 });
  }

  const current = projects[index];
  const nextTitle = body.title || current.title;
  const updated = {
    ...current,
    ...body,
    slug: toSlug(nextTitle),
    updatedAt: new Date().toISOString(),
  };

  projects[index] = updated;
  await writeProjects(projects);
  return NextResponse.json(updated);
}

export async function DELETE(_, { params }) {
  const isAdmin = await requireAdminSession();
  if (!isAdmin) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const projects = await readProjects();
  const nextProjects = projects.filter((item) => item.id !== id);

  if (nextProjects.length === projects.length) {
    return NextResponse.json({ message: "Project not found" }, { status: 404 });
  }

  await writeProjects(nextProjects);
  return NextResponse.json({ message: "Project deleted" });
}
