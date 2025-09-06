import { auth } from '@clerk/nextjs/server'
import { fetchQuery } from 'convex/nextjs'
import { notFound } from 'next/navigation'
import { A4Paper } from '@/components/resume/a4-paper'
import AwesomeCV from '@/components/resume/templates/awesome-cv'
import { api } from '@/convex/_generated/api'
import type { Id } from '@/convex/_generated/dataModel'

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

  if (!resume) notFound()

  return (
    <A4Paper fullPage>
      {resume.data.settings.model === 'awesome-cv' && (
        <AwesomeCV resume={resume.data} />
      )}
    </A4Paper>
  )
}
