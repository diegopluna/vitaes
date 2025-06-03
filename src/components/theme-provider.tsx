import { setThemeServerFn } from '@/lib/theme'
import { useRouter } from '@tanstack/react-router'
import { type PropsWithChildren, createContext, use } from 'react'

export type Theme = 'light' | 'dark'

type ThemeContextVal = {
	theme: Theme
	setTheme: (val: Theme) => void
}
type Props = PropsWithChildren<{
	theme: Theme
}>

const ThemeContext = createContext<ThemeContextVal | null>(null)

export function ThemeProvider({ children, theme }: Props) {
	const router = useRouter()

	function setTheme(val: Theme) {
		setThemeServerFn({ data: val })
		router.invalidate()
	}

	return <ThemeContext value={{ theme, setTheme }}>{children}</ThemeContext>
}

export function useTheme() {
	const val = use(ThemeContext)
	if (!val) {
		throw new Error('useTheme must be used within a ThemeProvider')
	}
	return val
}
