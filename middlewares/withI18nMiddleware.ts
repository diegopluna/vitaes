import { NextFetchEvent, NextRequest } from 'next/server'
import { CustomMiddleware } from './chain'
import createMiddleware from 'next-intl/middleware'
import { routing } from '@/i18n/routing'

export function withI18nMiddleware(
  middleware: CustomMiddleware,
): CustomMiddleware {
  const i18Middleware = createMiddleware(routing)
  return async (request: NextRequest, event: NextFetchEvent) => {
    const i18nResponse = i18Middleware(request)

    return middleware(request, event, i18nResponse)
  }
}
