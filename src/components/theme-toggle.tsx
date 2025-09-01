import { IconMoon, IconSun } from '@tabler/icons-react'
import { useTheme } from './theme-provider'
import { Button } from './ui/button'

export function ThemeToggle() {
	const { theme, setTheme } = useTheme()

	return (
		<Button
			variant="ghost"
			size="sm"
			onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
		>
			<div className="flex gap-2 dark:hidden items-center">
				<IconMoon className="size-5" />
				<span className="block lg:hidden">Dark</span>
			</div>

			<div className="dark:flex gap-2 hidden items-center">
				<IconSun className="size-5" />
				<span className="block lg:hidden">Light</span>
			</div>

			<span className="sr-only">Toggle Theme</span>
		</Button>
	)
}
