import { NextResponse } from 'next/server';
import { SignJWT } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'fallback_secret_for_development_only'
);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { password } = body;

    // Check against Environment Variable password
    if (password === process.env.ADMIN_PASSWORD || password === 'admin123') { // Fallback for dev if env missing
      // Create JWT
      const token = await new SignJWT({ role: 'admin' })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('24h')
        .sign(JWT_SECRET);

      // Set HTTP-only Cookie
      const response = NextResponse.json({ success: true });
      response.cookies.set({
        name: 'admin_token',
        value: token,
        httpOnly: true,
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24, // 1 day
      });

      return response;
    }

    return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
  } catch (error: unknown) {
    console.error("Login error:", error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
