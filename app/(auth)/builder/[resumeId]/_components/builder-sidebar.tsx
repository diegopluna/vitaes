'use client'

import { UserButton } from '@clerk/nextjs'
import { IconBrandGithubFilled, IconSettings } from '@tabler/icons-react'
import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { LanguageSelector } from '@/components/language-selector'
import { ThemeToggle } from '@/components/theme-toggle'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { useBuilderTab } from '@/providers/builder-tab-provider'
import { useSections } from '@/providers/sections-provider'

export function BuilderSidebar() {
  const t = useTranslations('builder-sidebar')
  const { sections, sectionRefs } = useSections()
  const { setActiveTab } = useBuilderTab()

  const scrollToSection = (sectionId: string) => {
    setActiveTab('resume')

    setTimeout(() => {
      const sectionElement = sectionRefs.current[sectionId]
      if (sectionElement) {
        const scrollAreaViewport = document.querySelector(
          '[data-radix-scroll-area-viewport]',
        )
        if (scrollAreaViewport) {
          const offset = 0
          const elementPosition = sectionElement.offsetTop
          const offsetPosition = elementPosition - offset

          scrollAreaViewport.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          })
        }
      }
    }, 100)
  }

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/dashboard">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground">
                  <Image src="/logo.svg" alt="Vitaes" width={32} height={32} />
                </div>
                <div className="flex-1 text-left text-sm leading-tight">
                  <h3 className="truncate text-left leading-tight text-sm font-semibold">
                    Vitaes
                  </h3>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{t('resume-sections')}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {sections.map((section) => (
                <SidebarMenuItem key={section.id}>
                  <SidebarMenuButton
                    size="sm"
                    tooltip={section.title}
                    onClick={() => scrollToSection(section.id)}
                  >
                    <section.icon />
                    <span>{section.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                tooltip={t('settings')}
                onClick={() => setActiveTab('settings')}
              >
                <IconSettings />
                <span>{t('settings')}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Github"
              onClick={() =>
                window.open('https://github.com/diegopluna/vitaes', '_blank')
              }
            >
              <IconBrandGithubFilled />
              <span>Github</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <LanguageSelector inSidebar />
          </SidebarMenuItem>
          <SidebarMenuItem>
            <ThemeToggle inSidebar />
          </SidebarMenuItem>
          <SidebarMenuItem>
            <UserButton
              showName
              appearance={{
                elements: {
                  rootBox: 'w-full! h-8!',
                  userButtonTrigger:
                    'w-full! p-2! hover:bg-sidebar-accent! hover:text-sidebar-accent-foreground! group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2!',
                  userButtonBox:
                    'w-full! flex-row-reverse! justify-end! gap-2! group-data-[collapsible=icon]:justify-center! text-sidebar-foreground!',
                  userButtonOuterIdentifier:
                    'pl-0! group-data-[collapsible=icon]:hidden!',
                  avatarBox: 'size-4!',
                },
              }}
            />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
