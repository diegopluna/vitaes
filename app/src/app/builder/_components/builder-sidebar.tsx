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

import { LogIn, Settings } from 'lucide-react'
import { useResumeSections } from '@/hooks/use-resume-sections'
import { UserButton } from './user-button'

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
  const sectionsContext = useResumeSections()

  if (!sectionsContext) {
    return null
  }

  const { sections, sectionRefs } = sectionsContext

  const scrollToSection = (sectionId: string) => {
    sectionRefs.current[sectionId]?.scrollIntoView({
      behavior: 'smooth',
    })
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
              <SidebarMenuButton tooltip="Settings">
                <Settings />
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
