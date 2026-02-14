import { NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/auth";
import { readProjects, writeProjects } from "@/lib/content-store";
import { toSlug } from "@/lib/slug";

const validateProject = (payload) => {
  if (!payload?.title || !payload?.summary || !payload?.description) return false;
  if (!Array.isArray(payload?.technologies)) return false;
  return true;
};

export async function GET() {
  const isAdmin = await requireAdminSession();
  if (!isAdmin) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const projects = await readProjects();
  return NextResponse.json(projects);
}

export async function POST(request) {
  const isAdmin = await requireAdminSession();
  if (!isAdmin) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  if (!validateProject(body)) {
    return NextResponse.json({ message: "Invalid payload" }, { status: 400 });
  }

  const projects = await readProjects();
  const id = Date.now().toString();
  const slug = toSlug(body.title);

  const project = {
    id,
    title: body.title,
    slug,
    summary: body.summary,
    description: body.description,
    problem: body.problem || "",
    solution: body.solution || "",
    impact: body.impact || "",
    image: body.image || "",
    technologies: body.technologies,
    liveUrl: body.liveUrl || "",
    repoUrl: body.repoUrl || "",
    featured: Boolean(body.featured),
    status: body.status === "draft" ? "draft" : "published",
    seoTitle: body.seoTitle || "",
    seoDescription: body.seoDescription || "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  projects.unshift(project);
  await writeProjects(projects);
  return NextResponse.json(project, { status: 201 });
}
