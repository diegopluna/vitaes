import { m } from '@/paraglide/messages'
import { useBuilderTab } from '@/providers/builder-tab-provider'
import { useSections } from '@/providers/section-provider'
import { IconBrandGithubFilled, IconSettings } from '@tabler/icons-react'
import { Link } from '@tanstack/react-router'
import type { User } from 'better-auth'
import { LanguageSelector } from '../language-selector'
import { ThemeToggle } from '../theme-toggle'
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '../ui/sidebar'
import { UserButton } from '../user-button'

interface BuilderSidebarProps {
	user: User
}

export function BuilderSidebar({ user }: BuilderSidebarProps) {
	const { sections, sectionRefs } = useSections()
	const { setActiveTab } = useBuilderTab()

	const scrollToSection = (sectionId: string) => {
		setActiveTab('resume')

		setTimeout(() => {
			const sectionElement = sectionRefs.current[sectionId]
			if (sectionElement) {
				const scrollAreaViewport = document.querySelector(
					'[data-radix-scroll-area-viewport]',
				)
				if (scrollAreaViewport) {
					const offset = 0
					const elementPosition = sectionElement.offsetTop
					const offsetPosition = elementPosition - offset

					scrollAreaViewport.scrollTo({
						top: offsetPosition,
						behavior: 'smooth',
					})
				}
			}
		}, 100)
	}

	return (
		<Sidebar collapsible="icon">
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton size="lg" asChild>
							<Link to="/dashboard">
								<div className="flex aspect-square size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground">
									<img src="/logo.svg" alt="Vitaes" width={32} height={32} />
								</div>
								<div className="flex-1 text-left text-sm leading-tight">
									<h3 className="truncate text-left leading-tight text-sm font-semibold">
										Vitaes
									</h3>
								</div>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>
						{m['builder-sidebar.resume-sections']()}
					</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{sections.map((section) => (
								<SidebarMenuItem key={section.id}>
									<SidebarMenuButton
										size="sm"
										tooltip={section.title}
										onClick={() => scrollToSection(section.id)}
									>
										<section.icon />
										<span>{section.title}</span>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
				<SidebarGroup>
					<SidebarMenu>
						<SidebarMenuItem>
							<SidebarMenuButton
								tooltip={m['builder-sidebar.settings']()}
								onClick={() => setActiveTab('settings')}
							>
								<IconSettings />
								<span>{m['builder-sidebar.settings']()}</span>
							</SidebarMenuButton>
						</SidebarMenuItem>
					</SidebarMenu>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton
							tooltip="Github"
							onClick={() =>
								window.open('https://github.com/diegopluna/vitaes', '_blank')
							}
						>
							<IconBrandGithubFilled />
							<span>Github</span>
						</SidebarMenuButton>
					</SidebarMenuItem>
					<SidebarMenuItem>
						<LanguageSelector inSidebar />
					</SidebarMenuItem>
					<SidebarMenuItem>
						<ThemeToggle inSidebar />
					</SidebarMenuItem>
					<SidebarMenuItem>
						<UserButton user={user} inSidebar />
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar>
	)
}
