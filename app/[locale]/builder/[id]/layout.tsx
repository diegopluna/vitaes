import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { SectionsProvider } from '@/providers/sections-provider'
import { BuilderSidebar } from '../_components/builder-sidebar'
import { AccountSettingsProvider } from '@/providers/account-settings-provider'
import { AccountMenu } from '../../dashboard/_components/account-menu'
import { BuilderHeader } from '../_components/builder-header'
import { BuilderTabProvider } from '@/providers/builder-tab-provider'
import { ResumeStoreProvider } from '@/providers/resume-store-provider'
import { auth } from '@/server/auth'
import { headers } from 'next/headers'
import { redirect } from '@/i18n/navigation'
import { api } from '@/trpc/server'
import { notFound } from 'next/navigation'
import { ResumeMetaProvider } from '@/providers/resume-meta-provider'

interface BuilderLayoutProps {
  children: React.ReactNode
  params: Promise<{
    locale: string
    id: string
  }>
}

export default async function BuilderLayout({
  children,
  params,
}: BuilderLayoutProps) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  const { locale, id } = await params

  if (!session) {
    redirect({
      href: '/',
      locale,
    })
  }

  const resumeResult = await api.resume.getById({ id }).catch(() => {
    notFound()
  })

  const resume = resumeResult?.data
  const resumeId = resumeResult?.id ?? ''
  const resumeName = resumeResult?.name ?? ''
  const resumeUpdatedAt = resumeResult?.updatedAt
    ? resumeResult.updatedAt.toString()
    : ''

  return (
    <ResumeMetaProvider
      id={resumeId}
      name={resumeName}
      updatedAt={resumeUpdatedAt}
    >
      <BuilderTabProvider>
        <ResumeStoreProvider initialResume={resume}>
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
    </ResumeMetaProvider>
  )
}
