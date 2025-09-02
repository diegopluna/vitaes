'use client'
import { IconMoon, IconSun } from '@tabler/icons-react'
import { useTranslations } from 'next-intl'
import { useTheme } from 'next-themes'
import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { SidebarMenuButton } from './ui/sidebar'

interface ThemeToggleProps {
  inSidebar?: boolean
}

export function ThemeToggle({ inSidebar }: ThemeToggleProps) {
  const t = useTranslations('theme-toggle')
  const { theme, setTheme } = useTheme()

  if (!inSidebar) {
    return (
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      >
        <div className="flex gap-2 dark:hidden items-center">
          <IconMoon className="size-5" />
          <span className="block lg:hidden">{t('dark')}</span>
        </div>

        <div className="dark:flex gap-2 hidden items-center">
          <IconSun className="size-5" />
          <span className="block lg:hidden">{t('light')}</span>
        </div>

        <span className="sr-only">{t('toggle-theme')}</span>
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton tooltip={t('toggle-theme')}>
          <IconSun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <IconMoon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span>{t('toggle-theme')}</span>
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme('light')}>
          {t('light')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>
          {t('dark')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
