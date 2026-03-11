import {
  IconFlask,
  IconFileText,
  IconLayoutDashboard,
  IconPencilMinus,
  IconTemplate,
} from '@tabler/icons-react'
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
} from '@vitaes/ui/components/sidebar'
import { useLocation } from '@tanstack/react-router'
import { getPathWithoutLocale } from 'intlayer'
import { LocalizedLink } from './localized-link'
import { cn } from '@vitaes/ui/lib/utils'
import { useIntlayer } from 'react-intlayer'

export const DashboardSidebar = () => {
  const content = useIntlayer('dashboard-sidebar')
  const { pathname } = useLocation()
  const pathWithoutLocale = getPathWithoutLocale(pathname)

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="w-full flex flex-row gap-2.5 items-center">
          <img src="/logo.svg" alt="Logo" className="h-9" />
          <span className="font-heading font-bold text-xl text-white">
            Vitaes
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="font-medium text-[11px] tracking-widest text-[#444444]">
            {content.workspace}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="flex flex-col gap-0.5">
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={pathWithoutLocale === '/dashboard'}
                  render={<LocalizedLink to="/dashboard" />}
                >
                  <IconLayoutDashboard
                    className={cn(
                      pathWithoutLocale === '/dashboard' && 'text-primary',
                    )}
                  />
                  {content.dashboard}
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={pathWithoutLocale === '/dashboard/my-resumes'}
                  render={<LocalizedLink to="/dashboard/my-resumes" />}
                >
                  <IconFileText
                    className={cn(
                      pathWithoutLocale === '/dashboard/my-resumes' &&
                        'text-primary',
                    )}
                  />
                  {content.myResumes}
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={pathWithoutLocale === '/dashboard/templates'}
                  render={<LocalizedLink to="/dashboard/templates" />}
                >
                  <IconTemplate
                    className={cn(
                      pathWithoutLocale === '/dashboard/templates' &&
                        'text-primary',
                    )}
                  />
                  {content.templates}
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={pathWithoutLocale === '/dashboard/playground'}
                  render={<LocalizedLink to="/dashboard/playground" />}
                >
                  <IconFlask
                    className={cn(
                      pathWithoutLocale === '/dashboard/playground' &&
                        'text-primary',
                    )}
                  />
                  {content.playground}
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={pathWithoutLocale === '/dashboard/drafts'}
                  render={<LocalizedLink to="/dashboard/drafts" />}
                >
                  <IconPencilMinus
                    className={cn(
                      pathWithoutLocale === '/dashboard/drafts' &&
                        'text-primary',
                    )}
                  />
                  {content.drafts}
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}
