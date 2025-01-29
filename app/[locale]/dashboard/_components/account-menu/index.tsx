'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog'
import { SidebarProvider } from '@/components/ui/sidebar'
import { useAccountSettings } from '@/providers/account-settings-provider'
import { SettingsSidebar } from './settings-sidebar'
import { SettingsHeader } from './settings-header'
import { Security } from './security'
import { Profile } from './profile'

export const AccountMenu = () => {
  const { open, setOpen, tab } = useAccountSettings()

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="overflow-hidden p-0 md:max-h-[500px] md:max-w-[700px] lg:max-w-[800px]">
        <DialogTitle className="sr-only">Account Settings</DialogTitle>
        <DialogDescription className="sr-only">
          Customize your settings here.
        </DialogDescription>
        <SidebarProvider className="items-start">
          <SettingsSidebar />
          <main className="flex h-[480px] flex-1 flex-col overflow-hidden">
            <SettingsHeader />
            <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4 pt-0">
              {tab === 'profile' && <Profile />}
              {tab === 'security' && <Security />}
            </div>
          </main>
        </SidebarProvider>
      </DialogContent>
    </Dialog>
  )
}
