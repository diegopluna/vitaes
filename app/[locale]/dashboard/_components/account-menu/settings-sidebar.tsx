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
import { IconShieldCheck, IconUserCircle } from '@tabler/icons-react'
import { useTranslations } from 'next-intl'

export const SettingsSidebar = () => {
  const t = useTranslations('AccountMenu')
  const { tab, setTab } = useAccountSettings()

  return (
    <Sidebar collapsible="none" className="hidden md:flex">
      <SidebarHeader>
        <div className="flex flex-col items-center gap-2 justify-center p-3">
          <h1 className="text-lg font-semibold">{t('title')}</h1>
          <p className="text-sm text-muted-foreground">{t('subtitle')}</p>
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
                    <IconUserCircle />
                    <span>{t('profile')}</span>
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
                    <IconShieldCheck />
                    <span>{t('security')}</span>
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
