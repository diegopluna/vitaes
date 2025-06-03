import { listResumes } from '@/api/resume'
import { Navbar } from '@/components/navbar'
import { NewResumeCard } from '@/components/new-resume- card'
import { ResumeCard } from '@/components/resume-card'
import { m } from '@/paraglide/messages'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard')({
	component: RouteComponent,
	beforeLoad: ({ context }) => {
		if (!context.user) {
			throw redirect({ to: '/sign-in' })
		}
	},
	loader: async ({ context }) => {
		const resumes = await listResumes()
		return {
			user: context.user!,
			resumes,
		}
	},
})

function RouteComponent() {
	const { user, resumes } = Route.useLoaderData()

	return (
		<>
			<Navbar user={user} />
			<main className="container lg:w-[100%] py-24 px-12 sm:py-32 mx-auto">
				<div className="text-center mb-8">
					<h2 className="text-3xl md:text-4xl text-center font-bold">
						{m['dashboard.resumes']()}
					</h2>
				</div>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
					<NewResumeCard />
					{resumes.map((resume) => (
						<ResumeCard
							key={resume.id}
							resume={{
								id: resume.id,
								name: resume.name,
								data: resume.data,
								createdAt: resume.createdAt
									? new Date(resume.createdAt).toISOString()
									: undefined,
								updatedAt: resume.updatedAt
									? new Date(resume.updatedAt).toISOString()
									: undefined,
							}}
						/>
					))}
				</div>
			</main>
		</>
	)
}
