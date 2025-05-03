import type { Resume } from '@/@types/resume'
import { decode } from 'urlencode'
import { ResumeOnly } from './_components/resume-only'

export default async function Page({
  params,
}: {
  params: Promise<{ resumeData: string }>
}) {
  const { resumeData } = await params
  const resume = JSON.parse(decode(resumeData)) as Resume

  return <ResumeOnly resume={resume} />
}
