import { useLocation } from '@tanstack/react-router'
import { getLocaleName, getPathWithoutLocale, getPrefix } from 'intlayer'
import { useLocale } from 'react-intlayer'
import { LocalizedLink } from './localized-link'
import type { To } from './localized-link'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@vitaes/ui/components/dropdown-menu'
import { Button } from '@vitaes/ui/components/button'
import { IconLanguage } from '@tabler/icons-react'

export const LocaleSwitcher = () => {
  const { pathname } = useLocation()

  const { availableLocales, locale, setLocale } = useLocale()
  const pathWithoutLocale = getPathWithoutLocale(pathname)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="outline" size="icon">
            <IconLanguage />
          </Button>
        }
      />
      <DropdownMenuContent className="w-40" align="start">
        {availableLocales.map((localeEl) => (
          <DropdownMenuItem
            key={localeEl}
            render={
              <LocalizedLink
                aria-current={localeEl === locale ? 'page' : undefined}
                onClick={() => setLocale(localeEl)}
                params={{ locale: getPrefix(localeEl).localePrefix }}
                to={pathWithoutLocale as To}
                className="capitalize"
              >
                {getLocaleName(localeEl, localeEl)}
              </LocalizedLink>
            }
          />
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
