import { NewResumeCard } from './_components/new-resume-card'

export default function Dashboard() {
  return (
    <main className="container lg:w-[100%] py-24 px-12 sm:py-32">
      <div className="text-center mb-8">
        <h2 className="text-lg text-primary text-center mb-2 tracking-wider">
          Welcome to your darshboard. This is where you can manage your resumes.
        </h2>

        <h2 className="text-3xl md:text-4xl text-center font-bold">Resumes</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        <NewResumeCard />
      </div>
    </main>
  )
}
