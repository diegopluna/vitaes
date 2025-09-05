import { auth } from '@clerk/nextjs/server'
import { fetchQuery } from 'convex/nextjs'
import { redirect } from 'next/navigation'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { api } from '@/convex/_generated/api'
import type { Id } from '@/convex/_generated/dataModel'
import { BuilderTabProvider } from '@/providers/builder-tab-provider'
import { ResumeStoreProvider } from '@/providers/resume-store-provider'
import { SectionsProvider } from '@/providers/sections-provider'
import { Builder } from './_components/builder'
import { BuilderHeader } from './_components/builder-header'
import { BuilderSidebar } from './_components/builder-sidebar'

export default async function Page({
  params,
}: {
  params: Promise<{ resumeId: string }>
}) {
  const { resumeId } = await params
  const { getToken, redirectToSignIn } = await auth()
  const jwtToken = await getToken({ template: 'convex ' })
  if (jwtToken === null) return redirectToSignIn()

  const resume = await fetchQuery(
    api.resume.functions.get,
    {
      id: resumeId as Id<'resumes'>,
    },
    { token: jwtToken },
  ).catch(() => null)

  if (!resume) redirect('/dashboard')

  return (
    <BuilderTabProvider>
      <ResumeStoreProvider initialResume={resume.data}>
        <SectionsProvider>
          <SidebarProvider defaultOpen>
            <BuilderSidebar />
            <SidebarInset>
              <BuilderHeader id={resume._id} />
              <main>
                <Builder />
              </main>
            </SidebarInset>
          </SidebarProvider>
        </SectionsProvider>
      </ResumeStoreProvider>
    </BuilderTabProvider>
  )
}
