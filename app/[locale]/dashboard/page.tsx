import { NewResumeCard } from './_components/new-resume-card'

import { getTranslations } from 'next-intl/server'

export default async function Dashboard() {
  const t = await getTranslations('Dashboard')
  return (
    <main className="container lg:w-[100%] py-24 px-12 sm:py-32 mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl text-center font-bold">
          {t('resumes')}
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        <NewResumeCard />
      </div>
    </main>
  )
}
