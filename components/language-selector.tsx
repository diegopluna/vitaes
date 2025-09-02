'use client'

import { IconLanguage } from '@tabler/icons-react'
import { useLocale, useTranslations } from 'next-intl'
import { useState, useTransition } from 'react'
import { type Locale, locales } from '@/i18n/config'
import { setUserLocale } from '@/i18n/locale-service'
import { cn } from '@/lib/utils'
import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { SidebarMenuButton } from './ui/sidebar'

const LANGUAGE_NAMES: Record<Locale, string> = {
  en: 'English',
  de: 'Deutsch',
  es: 'Español',
  fr: 'Français',
  ja: '日本語',
  pt: 'Português',
  zh: '中文',
}

interface LanguageSelectorProps {
  inSidebar?: boolean
}
export function LanguageSelector({ inSidebar = false }: LanguageSelectorProps) {
  const t = useTranslations('language-selector')
  const locale = useLocale() as Locale
  const [isPending, startTransition] = useTransition()
  const [isOpen, setIsOpen] = useState(false)

  function onChange(value: string) {
    const locale = value as Locale
    startTransition(() => {
      setUserLocale(locale)
    })
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        {inSidebar ? (
          <SidebarMenuButton
            className={cn(isPending ? 'pointer-events-none opacity-60' : '')}
            tooltip={t('select-language')}
          >
            <IconLanguage className="h-[1.2rem] w-[1.2rem]" />
            <span>{t('select-language')}</span>
          </SidebarMenuButton>
        ) : (
          <Button
            size="sm"
            variant="ghost"
            className={cn(isPending ? 'pointer-events-none opacity-60' : '')}
          >
            <div className="flex gap-2 items-center">
              <IconLanguage className="size-5" />
              <span className="block lg:hidden">{LANGUAGE_NAMES[locale]}</span>
            </div>
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {locales.map((locale) => (
          <DropdownMenuItem key={locale} onClick={() => onChange(locale)}>
            {LANGUAGE_NAMES[locale]}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
