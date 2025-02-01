'use client'

import { LanguageSelector } from '@/components/language-select'
import { ModeToggle } from '@/components/mode-toggle'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from '@/components/ui/sidebar'
import { Link } from '@/i18n/routing'
import { useBuilderTab } from '@/providers/builder-tab-provider'
import { useSections } from '@/providers/sections-provider'
import { useSession } from '@/providers/session-provider'
import {
  IconBrandGithubFilled,
  IconLogin,
  IconSettings,
} from '@tabler/icons-react'
import Image from 'next/image'
import { UserButton } from './user-button'

export const BuilderSidebar = () => {
  const { session } = useSession()
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
    <Sidebar collapsible="icon" variant="floating">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground">
                  <Image
                    src="/vitaes.svg"
                    alt="Vitaes"
                    width={32}
                    height={32}
                  />
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
          <SidebarGroupLabel>Resume Sections</SidebarGroupLabel>
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
        </SidebarGroup>
        <SidebarSeparator />
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                tooltip="Settings"
                onClick={() => setActiveTab('settings')}
              >
                <IconSettings />
                <span>Settings</span>
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
            <ModeToggle inSidebar />
          </SidebarMenuItem>
          <SidebarMenuItem>
            {session?.user ? (
              <UserButton />
            ) : (
              <SidebarMenuButton tooltip="Login" size="default" asChild>
                <Link href="/sign-in">
                  <IconLogin />
                  <span>Login</span>
                </Link>
              </SidebarMenuButton>
            )}
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
