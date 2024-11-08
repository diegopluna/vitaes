// import { authMiddleware } from 'better-auth/next-js'
import { NextRequest, NextResponse } from 'next/server'
import { client } from './lib/client'

// export default authMiddleware({
//   redirectTo: '/sign-in', // redirect to this path if the user is not authenticated
// })

export async function middleware(request: NextRequest) {
  const { data: session } = await client.getSession({
    fetchOptions: {
      headers: {
        cookie: request.headers.get('cookie') || '',
      },
    },
  })

  const authRoutes = ['/dashboard']
  const publicRoutes = ['/sign-in', '/']

  // TODO: Remove this console.log
  console.log(session)
  if (!session && authRoutes.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/sign-in', request.url))
  }

  if (session && publicRoutes.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/dashboard', '/sign-in'],
}
