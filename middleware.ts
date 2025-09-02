import { getSessionCookie } from 'better-auth/cookies'
import { type NextRequest, NextResponse } from 'next/server'

const signInRoutes = ['/sign-in']

export default async function middleware(request: NextRequest) {
  const sessionCookie = getSessionCookie(request)

  const isSignInRoute = signInRoutes.includes(request.nextUrl.pathname)

  if (isSignInRoute && !sessionCookie) {
    return NextResponse.next()
  }

  if (!isSignInRoute && !sessionCookie) {
    return NextResponse.redirect(new URL('/sign-in', request.url))
  }

  if (isSignInRoute || request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  // Run middleware on all routes except static assets and api routes
  matcher: ['/((?!.*\\..*|_next|api/auth).*)', '/', '/trpc(.*)'],
}
