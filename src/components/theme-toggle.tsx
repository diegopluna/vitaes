import { m } from '@/paraglide/messages'
import { IconMoon, IconSun } from '@tabler/icons-react'
import { useTheme } from './theme-provider'
import { Button } from './ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { SidebarMenuButton } from './ui/sidebar'

interface ThemeToggleProps {
	inSidebar?: boolean
}

export function ThemeToggle({ inSidebar }: ThemeToggleProps) {
	const { theme, setTheme } = useTheme()

	if (!inSidebar) {
		return (
			<Button
				variant="ghost"
				size="sm"
				onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
			>
				<div className="flex gap-2 dark:hidden items-center">
					<IconMoon className="size-5" />
					<span className="block lg:hidden">{m['theme-toggle.dark']()}</span>
				</div>

				<div className="dark:flex gap-2 hidden items-center">
					<IconSun className="size-5" />
					<span className="block lg:hidden">{m['theme-toggle.light']()}</span>
				</div>

				<span className="sr-only">{m['theme-toggle.toggle-theme']()}</span>
			</Button>
		)
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<SidebarMenuButton tooltip={m['theme-toggle.toggle-theme']()}>
					<IconSun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
					<IconMoon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
					<span>{m['theme-toggle.toggle-theme']()}</span>
				</SidebarMenuButton>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem onClick={() => setTheme('light')}>
					{m['theme-toggle.light']()}
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme('dark')}>
					{m['theme-toggle.dark']()}
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
