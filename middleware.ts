import { chain } from './middlewares/chain'
import { withAuthMiddleware } from './middlewares/withAuthMiddleware'
import { withI18nMiddleware } from './middlewares/withI18nMiddleware'

export default chain([withI18nMiddleware, withAuthMiddleware])

export const config = {
  matcher: ['/', '/(de|en|es|es|fr|pt|zh)/:path*'],
}
