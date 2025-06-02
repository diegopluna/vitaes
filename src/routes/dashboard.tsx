import { listResumes } from '@/api/resume'
import { Navbar } from '@/components/navbar'
import { NewResumeCard } from '@/components/new-resume- card'
import { m } from '@/paraglide/messages'
// import { useQuery } from '@tanstack/react-query'
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
		// await context.queryClient.prefetchQuery(
		// 	context.trpc.resume.list.queryOptions(),
		// )
		return {
			user: context.user!,
			resumes,
		}
	},
})

function RouteComponent() {
	// const trpc = useTRPC()

	// const { data: resumes } = useQuery(trpc.resume.list.queryOptions())
	const { user, resumes } = Route.useLoaderData()

	console.log(resumes)

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
				</div>
			</main>
		</>
	)
}
