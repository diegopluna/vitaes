// import { authMiddleware } from 'better-auth/next-js'
import { NextRequest, NextResponse } from 'next/server'
import { client } from './lib/client'

// export default authMiddleware({
//   redirectTo: '/sign-in', // redirect to this path if the user is not authenticated
// })

export async function middleware(request: NextRequest) {
  const session = await client.getSession({
    fetchOptions: {
      headers: request.headers,
    },
  })

  const authRoutes = ['/dashboard']
  const publicRoutes = ['/sign-in', '/sign-up', '/']

  console.log(session.data)
  const sessionData = session.data

  if (!sessionData && authRoutes.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/sign-in', request.url))
  }

  if (sessionData && publicRoutes.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/dashboard', '/sign-in', '/sign-up'],
}
