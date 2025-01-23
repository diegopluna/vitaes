import { defineRouting } from 'next-intl/routing'
import { createNavigation } from 'next-intl/navigation'

export const routing = defineRouting({
  locales: ['de', 'en', 'es', 'fr', 'pt', 'zh'],
  defaultLocale: 'en',
})

export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing)
