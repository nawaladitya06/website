import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Define protected routes (strictly all /admin routes)
  if (pathname.startsWith('/admin')) {
    
    // 2. Allow access to /admin/login so users can actually log in
    if (pathname === '/admin/login') {
      return NextResponse.next();
    }

    // 3. Check for auth cookie
    // Note: ADMIN_PASSWORD should be set in environment variables
    const authCookie = request.cookies.get('auth');
    const expectedPassword = process.env.ADMIN_PASSWORD;

    if (!authCookie || authCookie.value !== expectedPassword) {
      // Strictly redirect to login if not authenticated
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/admin/:path*',
};
