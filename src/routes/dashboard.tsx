import { Navbar } from '@/components/navbar'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard')({
	component: RouteComponent,
	beforeLoad: ({ context }) => {
		if (!context.user) {
			throw redirect({ to: '/sign-in' })
		}
	},
	loader: ({ context }) => {
		return {
			user: context.user!,
		}
	},
})

function RouteComponent() {
	const { user } = Route.useLoaderData()

	return (
		<>
			<Navbar user={user} />
			<h1>Dashboard</h1>
		</>
	)
}
