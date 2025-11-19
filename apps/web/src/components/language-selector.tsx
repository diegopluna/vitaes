import { Check, Globe } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Button } from './ui/button'
import { getLocale, locales, setLocale } from '@/paraglide/runtime'
import { setDefaultOptions } from 'date-fns'
import { enUS, de, ptBR, es, fr, ja, zhCN } from 'date-fns/locale'

export function LanguageSelector() {
  const localeMap = {
    en: 'English',
    de: 'Deutsch',
    es: 'Español',
    fr: 'Français',
    ja: '日本語',
    pt: 'Português',
    zh: '中文',
  }
  const dateLocaleMap = {
    en: enUS,
    de: de,
    es: es,
    fr: fr,
    ja: ja,
    pt: ptBR,
    zh: zhCN,
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Globe className="size-[1.2rem]" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {locales.map((locale) => (
          <DropdownMenuItem
            onClick={() => {
              setLocale(locale)
              setDefaultOptions({
                locale: dateLocaleMap[locale as keyof typeof dateLocaleMap],
              })
            }}
            key={locale}
          >
            {localeMap[locale as keyof typeof localeMap]}
            {locale === getLocale() ? (
              <Check className="size-[1.2rem]" />
            ) : null}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
