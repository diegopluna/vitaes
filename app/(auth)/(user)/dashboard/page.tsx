'use client'

import { useQuery } from 'convex/react'
import { useTranslations } from 'next-intl'
import { Navbar } from '@/components/navbar'
import { api } from '@/convex/_generated/api'
import { NewResumeCard } from './_components/new-resume-card'
import { ResumeCard } from './_components/resume-card'

export default function Page() {
  const t = useTranslations('dashboard')
  const resumes = useQuery(api.resume.functions.list)
  return (
    <>
      <Navbar showUserButton />
      <main className="container lg:w-[100%] py-24 px-12 sm:py-32 mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl text-center font-bold">
            {t('resumes')}
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <NewResumeCard />
          {resumes?.map((r) => (
            <ResumeCard
              key={r._id.toString()}
              resume={{
                data: r.data,
                id: r._id.toString(),
                name: r.name,
                createdAt: new Date(r._creationTime).toISOString(),
                updatedAt: new Date(r.updatedAt).toISOString(),
              }}
            />
          ))}
        </div>
      </main>
    </>
  )
}
