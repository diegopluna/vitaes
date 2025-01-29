'use client'
import { useRouter, Locale, usePathname, locales } from '@/i18n/routing'
import { useParams } from 'next/navigation'
import { useTransition } from 'react'
import { Button } from './ui/button'
import { IconLanguage } from '@tabler/icons-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { SidebarMenuButton } from './ui/sidebar'

interface LanguageSelectorProps {
  inSidebar?: boolean
}

const localesList = locales.reduce(
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
    }
    return acc
  },
  {} as Record<string, string>,
)

export function LanguageSelector({ inSidebar = false }: LanguageSelectorProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const pathname = usePathname()
  const params = useParams()

  function onSelectChange(nextLocale: Locale) {
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
          <SidebarMenuButton tooltip="Change language">
            <IconLanguage className="h-[1.2rem] w-[1.2.rem]" />
            <span> Change language</span>
          </SidebarMenuButton>
        ) : (
          <Button size="sm" variant="ghost">
            <IconLanguage className="size-5" />
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {locales.map((locale) => (
          <DropdownMenuItem
            disabled={isPending}
            key={locale}
            onClick={() => onSelectChange(locale)}
          >
            {localesList[locale]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
