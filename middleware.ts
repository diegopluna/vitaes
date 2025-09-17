import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/'])
export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth()

  if (isPublicRoute(req) && userId) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  if (isPublicRoute(req) && !userId) {
    return NextResponse.next()
  }

  if (!isPublicRoute(req) && !userId) {
    await auth.protect()
  }

  return NextResponse.next()
})

export const config = {
  // Run middleware on all routes except static assets and api routes
  matcher: ['/((?!.*\\..*|_next|api/auth).*)', '/', '/trpc(.*)'],
}
