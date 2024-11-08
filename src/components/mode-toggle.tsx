'use client'

import * as React from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { SidebarMenuButton } from './ui/sidebar'

interface ModeToggleProps {
  inSidebar?: boolean
}

export function ModeToggle({ inSidebar = false }: ModeToggleProps) {
  const { theme, setTheme } = useTheme()

  if (!inSidebar) {
    return (
      <Button
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        size="sm"
        variant="ghost"
        className="w-full justify-start"
      >
        <div className="flex gap-2 dark:hidden items-center">
          <Moon className="size-5" />
          <span className="block lg:hidden"> Dark </span>
        </div>

        <div className="dark:flex gap-2 hidden items-center">
          <Sun className="size-5" />
          <span className="block lg:hidden">Light</span>
        </div>

        <span className="sr-only">Toggle theme</span>
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton tooltip="Toggle theme">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span>Toggle theme</span>
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme('light')}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
