'use client'

import { usePathname, useRouter } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'
import type { Locale } from 'next-intl'
import { useParams } from 'next/navigation'
import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { SidebarMenuButton } from './ui/sidebar'
import { IconLanguage } from '@tabler/icons-react'
import { Button } from './ui/button'

interface LanguageSelectorProps {
  inSidebar?: boolean
}

const localesList = routing.locales.reduce(
  (acc, item) => {
    switch (item as Locale) {
      case 'en':
        acc[item] = 'English'
        break
      case 'de':
        acc[item] = 'Deustch'
        break
      case 'es':
        acc[item] = 'Español'
        break
      case 'fr':
        acc[item] = 'Français'
        break
      case 'pt':
        acc[item] = 'Português'
        break
      case 'zh':
        acc[item] = '中国人'
        break
      case 'ja':
        acc[item] = '日本語'
        break
    }
    return acc
  },
  {} as Record<string, string>,
)

export function LanguageSelector({ inSidebar = false }: LanguageSelectorProps) {
  const router = useRouter()
  const [isPending, startTransition] = React.useTransition()
  const pathname = usePathname()
  const params = useParams()

  const currentLocale = params.locale as Locale
  const currentLocaleName = localesList[currentLocale]

  function handleChange(nextLocale: Locale) {
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- Typescript will validate that only known `params`
        // are used in combination with a give `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname, params },
        { locale: nextLocale },
      )
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {inSidebar ? (
          <SidebarMenuButton tooltip="Select language">
            <IconLanguage className="h-[1.2rem] w-[1.2rem]" />
            <span>Select language</span>
          </SidebarMenuButton>
        ) : (
          <Button size="sm" variant="ghost">
            <div className="flex gap-2 items-center">
              <IconLanguage className="size-5" />
              <span className="block lg:hidden">{currentLocaleName}</span>
            </div>
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {routing.locales.map(locale => (
          <DropdownMenuItem
            disabled={isPending}
            key={locale}
            onClick={() => handleChange(locale as Locale)}
          >
            {localesList[locale]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
