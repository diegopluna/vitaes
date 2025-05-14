'use client'

import { useTheme } from 'next-themes'
import { Button } from './ui/button'
import { IconMoon, IconSun } from '@tabler/icons-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { SidebarMenuButton } from './ui/sidebar'
import { useTranslations } from 'next-intl'

interface ModeToggleProps {
  inSidebar?: boolean
}

export function ModeToggle({ inSidebar = false }: ModeToggleProps) {
  const { theme, setTheme } = useTheme()
  const t = useTranslations('ModeToggle')

  if (!inSidebar) {
    return (
      <Button
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        size="sm"
        variant="ghost"
      >
        <div className="flex gap-2 dark:hidden items-center">
          <IconMoon className="size-5" />
          <span className="block lg:hidden">{t('dark')}</span>
        </div>

        <div className="dark:flex gap-2 hidden items-center">
          <IconSun className="size-5" />
          <span className="block lg:hidden">{t('light')}</span>
        </div>

        <span className="sr-only">{t('toggle')}</span>
      </Button>
    )
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton tooltip={t('toggle')}>
          <IconSun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <IconMoon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span>{t('toggle')}</span>
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme('light')}>
          {t('light')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>
          {t('dark')}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')}>
          {t('system')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
