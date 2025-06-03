import { getResume } from '@/api/resume'
import { ResumeOnly } from '@/components/resume/resume-only'
import { createFileRoute, notFound, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/resume_only/$id')({
	component: RouteComponent,
	beforeLoad: async ({ context }) => {
		if (!context.user) {
			throw redirect({ to: '/sign-in' })
		}
	},
	loader: async ({ params }) => {
		const { id } = params
		const resume = await getResume({ data: { id } }).catch(() => notFound())
		return { resume }
	},
})

function RouteComponent() {
	const { resume } = Route.useLoaderData()
	return <ResumeOnly resume={resume.data} />
}
