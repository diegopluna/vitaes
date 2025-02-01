import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { BuilderTabProvider } from '@/providers/builder-tab-provider'
import { ResumeProvider } from '@/providers/resume-provider'
import { SectionsProvider } from '@/providers/sections-provider'
import { BuilderSidebar } from './_components/builder-sidebar'
import { AccountSettingsProvider } from '@/providers/account-settings-provider'
import { AccountMenu } from '../dashboard/_components/account-menu'
import { BuilderHeader } from './_components/builder-header'

interface BuilderLayoutProps {
  children: React.ReactNode
}

export default async function BuilderLayout({ children }: BuilderLayoutProps) {
  return (
    <BuilderTabProvider>
      <ResumeProvider>
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
      </ResumeProvider>
    </BuilderTabProvider>
  )
}
