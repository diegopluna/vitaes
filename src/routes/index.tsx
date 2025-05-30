import { Footer } from '@/components/footer'
import { Hero } from '@/components/hero'
import { Navbar } from '@/components/navbar'
import { createFileRoute } from '@tanstack/react-router'
export const Route = createFileRoute('/')({
	component: App,
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
