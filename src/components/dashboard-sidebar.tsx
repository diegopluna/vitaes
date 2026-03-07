import { IconLayoutDashboard } from '@tabler/icons-react'
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
} from './ui/sidebar'
import { useLocation } from '@tanstack/react-router'
import { getPathWithoutLocale } from 'intlayer'
import { LocalizedLink } from './localized-link'
import { cn } from '#/lib/utils'
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
            <SidebarMenu>
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
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}
