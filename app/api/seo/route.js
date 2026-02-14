import { NextResponse } from "next/server";
import { readSeoConfig } from "@/lib/content-store";

export async function GET() {
  const seo = await readSeoConfig();
  return NextResponse.json(seo);
}
