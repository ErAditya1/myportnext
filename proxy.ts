import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'fallback_secret_for_development_only'
);

// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Only protect the /admin routes
  if (path.startsWith('/admin')) {
    // Exclude login page itself so they can login
    if (path === '/admin/login') {
      return NextResponse.next();
    }

    const token = request.cookies.get('admin_token')?.value;

    if (!token) {
      // Redirect to login if no token
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    try {
      // Verify token
      await jwtVerify(token, JWT_SECRET);
      return NextResponse.next();
    } catch (error) {
      // Token is invalid or expired
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/admin/:path*',
};
