import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { SectionsProvider } from '@/providers/sections-provider'
import { BuilderSidebar } from './_components/builder-sidebar'
import { AccountSettingsProvider } from '@/providers/account-settings-provider'
import { AccountMenu } from '../dashboard/_components/account-menu'
import { BuilderHeader } from './_components/builder-header'
import { BuilderTabProvider } from '@/providers/builder-tab-provider'
import { ResumeStoreProvider } from '@/providers/resume-store-provider'

interface BuilderLayoutProps {
  children: React.ReactNode
}

export default async function BuilderLayout({ children }: BuilderLayoutProps) {
  return (
    <BuilderTabProvider>
      <ResumeStoreProvider>
        <SectionsProvider>
          <AccountSettingsProvider>
            <SidebarProvider>
              <BuilderSidebar />
              <SidebarInset>
                <BuilderHeader />
                <main>{children}</main>
                <AccountMenu />
              </SidebarInset>
            </SidebarProvider>
          </AccountSettingsProvider>
        </SectionsProvider>
      </ResumeStoreProvider>
    </BuilderTabProvider>
  )
}
