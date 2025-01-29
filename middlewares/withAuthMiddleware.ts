import { auth } from '@/lib/auth'
import { betterFetch } from '@better-fetch/fetch'
import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'
import { CustomMiddleware } from './chain'
import { getPathname, getStandardPathname } from '@/i18n/routing'

type Session = typeof auth.$Infer.Session

export function withAuthMiddleware(
  middleware: CustomMiddleware,
): CustomMiddleware {
  return async (
    request: NextRequest,
    event: NextFetchEvent,
    response: NextResponse,
  ) => {
    const { data: session } = await betterFetch<Session>(
      '/api/auth/get-session',
      {
        baseURL: request.nextUrl.origin,
        headers: {
          cookie: request.headers.get('cookie') || '',
        },
      },
    )

    const authRoutes = ['/dashboard']
    const publicRoutes = ['/sign-in', '/']

    // TODO: Remove this
    console.log(session)

    const pathnameWithoutLocale = request.nextUrl.pathname.replace(
      /^\/(en|pt|es|fr|de|zh)\/?/,
      '/',
    )
    const locale = request.nextUrl.pathname.match(
      /^\/(en|pt|es|fr|de|zh)\/?/,
    )?.[1]

    const pathname = getStandardPathname(pathnameWithoutLocale)

    if (!session && authRoutes.includes(pathname)) {
      console.log(locale)
      const signInpathname = getPathname({
        href: '/sign-in',
        locale: locale as string,
      })
      console.log(signInpathname)
      return NextResponse.redirect(new URL(signInpathname, request.url))
    }

    if (session && publicRoutes.includes(pathname)) {
      console.log(locale) // TODO: Fix redirect error that is being caused because the callback from the auth provider is not localized
      const dashboardPathname = getPathname({
        href: '/dashboard',
        locale: locale as string,
      })
      console.log(dashboardPathname)
      return NextResponse.redirect(new URL(dashboardPathname, request.url))
    }

    return middleware(request, event, response)
  }
}
