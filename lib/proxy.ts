import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const isProtectedPath = (pathname: string) =>
  pathname.startsWith("/admin") || pathname.startsWith("/api/admin");

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (!isProtectedPath(pathname) || pathname === "/admin/login") {
    return NextResponse.next();
  }

  const token = request.cookies.get("admin_session")?.value;
  if (!token) {
    const loginUrl = new URL("/admin/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
