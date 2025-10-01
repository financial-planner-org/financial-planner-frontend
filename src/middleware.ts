import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Redirecionar página inicial para /alocacoes
  if (request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/alocacoes', request.url));
  }
}

export const config = {
  matcher: ['/'],
};
