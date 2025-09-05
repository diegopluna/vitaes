import { auth } from '@clerk/nextjs/server'
import { fetchQuery } from 'convex/nextjs'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { api } from '@/convex/_generated/api'
import type { Id } from '@/convex/_generated/dataModel'
import { BuilderTabProvider } from '@/providers/builder-tab-provider'
import { ResumeMetaProvider } from '@/providers/resume-meta-provider'
import { ResumeStoreProvider } from '@/providers/resume-store-provider'

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
  )

  return (
    <ResumeMetaProvider
      id={resume._id.toString()}
      name={resume.name}
      updatedAt={resume.updatedAt.toString()}
    >
      <BuilderTabProvider>
        <ResumeStoreProvider initialResume={resume.data} resumeId={resumeId}>
          <SidebarProvider defaultOpen>
            <SidebarInset>
              <main>Teste</main>
            </SidebarInset>
          </SidebarProvider>
        </ResumeStoreProvider>
      </BuilderTabProvider>
    </ResumeMetaProvider>
  )
}
