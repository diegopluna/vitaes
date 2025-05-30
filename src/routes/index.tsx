import { Footer } from '@/components/footer'
import { Hero } from '@/components/hero'
import { Navbar } from '@/components/navbar'
import { createFileRoute, redirect } from '@tanstack/react-router'
export const Route = createFileRoute('/')({
	component: App,
	beforeLoad: ({ context }) => {
		if (context.user) {
			throw redirect({ to: '/dashboard' })
		}
	},
})

function App() {
	return (
		<>
			<Navbar />
			<Hero />
			<Footer />
		</>
	)
}
