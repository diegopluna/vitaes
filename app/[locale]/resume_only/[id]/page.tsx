import { ResumeOnly } from './_components/resume-only'
import { api } from '@/trpc/server'
import { notFound } from 'next/navigation'

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const resume = await api.resume.getById({ id }).catch(() => {
    notFound()
  })
  console.log(resume)

  return <ResumeOnly resume={resume.data} />
}
