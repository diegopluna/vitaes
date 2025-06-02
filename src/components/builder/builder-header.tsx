import { Separator } from '../ui/separator'
import { SidebarTrigger } from '../ui/sidebar'

export function BuilderHeader() {
	return (
		<header className="flex h-12 shrink-0 items-center gap-2 border-b px-4">
			<div className="flex items-center gap-2 px-4 flex-1">
				<SidebarTrigger />
				<Separator orientation="vertical" className="mr-2 h-4" />
			</div>
		</header>
	)
}
