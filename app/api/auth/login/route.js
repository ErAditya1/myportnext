import { NextResponse } from "next/server";
import { createAdminSession } from "@/lib/auth";

export async function POST(request) {
  const body = await request.json();
  const username = body?.username?.trim();
  const password = body?.password?.trim();

  console.log(username)
  console.log(password)

  if (
    username !== process.env.ADMIN_USERNAME ||
    password !== process.env.ADMIN_PASSWORD
  ) {
    return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
  }

  await createAdminSession();
  return NextResponse.json({ message: "Logged in" });
}
