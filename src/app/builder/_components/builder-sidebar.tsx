'use client'

import Link from 'next/link'
import Image from 'next/image'
import { GitHubLogoIcon } from '@radix-ui/react-icons'

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
import TypingAnimation from '@/components/ui/typing-animation'
import { ModeToggle } from '@/components/mode-toggle'

import { LogIn, Settings, WandSparkles } from 'lucide-react'
import { UserButton } from './user-button'
import { useBuilderTabStore } from '@/providers/builder-tab-store-provider'
import { useResumeSections } from '@/hooks/use-resume-sections'

type User = {
  id: string
  email: string
  emailVerified: boolean
  name: string
  createdAt: Date
  updatedAt: Date
  image?: string | undefined | undefined
}

export const BuilderSidebar = ({ user }: { user?: User }) => {
  const { sections, sectionRefs } = useResumeSections()
  const { setActiveTab } = useBuilderTabStore((state) => state)

  const scrollToSection = (sectionId: string) => {
    setActiveTab('resume')

    setTimeout(() => {
      const sectionElement = sectionRefs.current[sectionId]
      if (sectionElement) {
        const scrollAreaViewport = document.querySelector(
          '[data-radix-scroll-area-viewport]',
        )
        if (scrollAreaViewport) {
          const offset = 0 // Adjust this value as needed
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
                  <TypingAnimation
                    className="truncate text-left leading-tight text-sm font-semibold"
                    text="Vitaes"
                  />
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
                <Settings />
                <span>Settings</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                tooltip="Build with AI"
                onClick={() => setActiveTab('chat')}
              >
                <WandSparkles />
                <span>Build with AI</span>
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
              <GitHubLogoIcon />
              <span>Github</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <ModeToggle inSidebar />
          </SidebarMenuItem>
          <SidebarMenuItem>
            {user ? (
              <UserButton user={user} />
            ) : (
              <SidebarMenuButton tooltip="Login" size="default" asChild>
                <Link href="/sign-in">
                  <LogIn />
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
