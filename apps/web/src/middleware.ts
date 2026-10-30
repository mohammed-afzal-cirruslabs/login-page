/**
 * Next.js Edge Middleware — RBAC route protection.
 *
 * Reads the NextAuth JWT (via getToken) and enforces role requirements
 * on protected path prefixes. Returns 403 for insufficient permissions.
 * Unauthenticated requests to protected routes are redirected to /login.
 */
import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Map path prefix → minimum required role(s)
const PROTECTED_ROUTES: Array<{ prefix: string; roles: string[] }> = [
  { prefix: '/admin',   roles: ['ADMIN']           },
  { prefix: '/seller',  roles: ['SELLER', 'ADMIN']  },
  { prefix: '/account', roles: ['BUYER', 'SELLER', 'ADMIN'] },
  { prefix: '/orders',  roles: ['BUYER', 'SELLER', 'ADMIN'] },
]

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  const matched = PROTECTED_ROUTES.find((r) => pathname.startsWith(r.prefix))
  if (!matched) return NextResponse.next()

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

  // Not signed in → redirect to login
  if (!token) {
    const loginUrl = new URL('/login', req.url)
    loginUrl.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(loginUrl)
  }

  const userRole = (token['role'] as string | undefined) ?? 'BUYER'
  const hasPermission = matched.roles.includes(userRole)

  if (!hasPermission) {
    return new NextResponse(
      JSON.stringify({
        error: 'Forbidden',
        detail: `Required role: ${matched.roles.join(' | ')}`,
      }),
      { status: 403, headers: { 'Content-Type': 'application/json' } },
    )
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/seller/:path*', '/account/:path*', '/orders/:path*'],
}
