'use client'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { useAccountSettings } from '@/providers/account-settings-provider'
import { CircleUser, ShieldCheck } from 'lucide-react'

export const SettingsSidebar = () => {
  const { tab, setTab } = useAccountSettings()
  return (
    <Sidebar collapsible="none" className="hidden md:flex">
      <SidebarHeader>
        <div className="flex flex-col items-center gap-2 justify-center p-3">
          <h1 className="text-lg font-semibold">Account Settings</h1>
          <p className="text-sm text-muted-foreground">
            Manage your account info.
          </p>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={tab === 'profile'}
                  onClick={() => setTab('profile')}
                  asChild
                >
                  <div>
                    <CircleUser />
                    <span>Profile</span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={tab === 'security'}
                  onClick={() => setTab('security')}
                  asChild
                >
                  <div>
                    <ShieldCheck />
                    <span>Security</span>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
