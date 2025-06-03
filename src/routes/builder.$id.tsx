import { getResume } from '@/api/resume'
import { Builder } from '@/components/builder/builder'
import { BuilderHeader } from '@/components/builder/builder-header'
import { BuilderSidebar } from '@/components/builder/builder-sidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { m } from '@/paraglide/messages'
import { BuilderTabProvider } from '@/providers/builder-tab-provider'
import { ResumeMetaProvider } from '@/providers/resume-meta-provider'
import { ResumeStoreProvider } from '@/providers/resume-store-provider'
import { SectionsProvider } from '@/providers/section-provider'
import { createFileRoute, redirect } from '@tanstack/react-router'
import { toast } from 'sonner'

export const Route = createFileRoute('/builder/$id')({
	component: RouteComponent,
	beforeLoad: ({ context }) => {
		if (!context.user) {
			throw redirect({ to: '/sign-in' })
		}
	},
	loader: async ({ context, params }) => {
		const { id } = params
		const resume = await getResume({ data: { id } }).catch(() => {
			toast.error(m['builder.resume-not-found']())
			throw redirect({ to: '/dashboard' })
		})

		return {
			resume,
			user: context.user!,
		}
	},
})

function RouteComponent() {
	const { resume, user } = Route.useLoaderData()

	console.log(resume)

	return (
		<ResumeMetaProvider
			id={resume.id}
			name={resume.name}
			updatedAt={resume.updatedAt!.toString()}
		>
			<BuilderTabProvider>
				<ResumeStoreProvider initialResume={resume.data} resumeId={resume.id}>
					<SectionsProvider>
						<SidebarProvider defaultOpen={true}>
							<BuilderSidebar user={user} />
							<SidebarInset>
								<BuilderHeader />
								<main>
									<Builder />
								</main>
							</SidebarInset>
						</SidebarProvider>
					</SectionsProvider>
				</ResumeStoreProvider>
			</BuilderTabProvider>
		</ResumeMetaProvider>
	)
}
