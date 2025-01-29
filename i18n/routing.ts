import { defineRouting } from 'next-intl/routing'
import { createNavigation } from 'next-intl/navigation'

export const routing = defineRouting({
  locales: ['de', 'en', 'es', 'fr', 'pt', 'zh'],
  defaultLocale: 'en',
  pathnames: {
    '/': '/',
    '/sign-in': {
      en: '/sign-in',
      de: '/einloggen',
      es: '/inicio-de-sesion',
      fr: '/connexion',
      pt: '/login',
      zh: '/denglu',
    },
    '/dashboard': {
      en: '/dashboard',
      de: '/uebersicht',
      es: '/panel-de-control',
      fr: '/tableau-de-bord',
      pt: '/painel-de-controle',
      zh: '/kongzhi-tai',
    },
  },
})

export type Pathnames = keyof typeof routing.pathnames
export type Locale = (typeof routing.locales)[number]
export const locales = routing.locales

export const { Link, getPathname, redirect, usePathname, useRouter } =
  createNavigation(routing)

export function getStandardPathname(localizedPathname: string): Pathnames {
  const pathnames = routing.pathnames
  for (const [standardPath, localizedPaths] of Object.entries(pathnames)) {
    if (typeof localizedPaths === 'string') {
      if (localizedPaths === localizedPathname) {
        return standardPath as Pathnames
      }
    } else {
      for (const path of Object.values(localizedPaths)) {
        if (path === localizedPathname) {
          return standardPath as Pathnames
        }
      }
    }
  }

  return localizedPathname as Pathnames
}
