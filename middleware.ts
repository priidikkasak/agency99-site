import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Set country cookie on first visit (readable by client JS)
  if (!request.cookies.get('ip_country')) {
    const country = request.headers.get('x-vercel-ip-country') ?? 'XX';
    response.cookies.set('ip_country', country, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365,
      sameSite: 'lax',
      httpOnly: false,
    });
  }

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon\\.ico).*)'],
};
