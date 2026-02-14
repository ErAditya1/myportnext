import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { requireAdminSession } from "@/lib/auth";
import { readSeoConfig } from "@/lib/content-store";

const seoFilePath = path.join(process.cwd(), "data", "seo.json");

export async function GET() {
  const isAdmin = await requireAdminSession();
  if (!isAdmin) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const seo = await readSeoConfig();
  return NextResponse.json(seo);
}

export async function PATCH(request) {
  const isAdmin = await requireAdminSession();
  if (!isAdmin) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const current = await readSeoConfig();
  const nextValue = { ...current, ...body };
  await fs.writeFile(seoFilePath, JSON.stringify(nextValue, null, 2), "utf8");
  return NextResponse.json(nextValue);
}
