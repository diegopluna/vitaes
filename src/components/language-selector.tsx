import { useLanguage } from '@/lib/i18n'
import { m } from '@/paraglide/messages'
import { type Locale, locales } from '@/paraglide/runtime'
import { IconLanguage } from '@tabler/icons-react'
import { useState } from 'react'
import { Button } from './ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { SidebarMenuButton } from './ui/sidebar'

const LANGUAGE_NAMES: Record<Locale, string> = {
	en: 'English',
	de: 'Deutsch',
	es: 'Español',
	fr: 'Français',
	ja: '日本語',
	pt: 'Português',
	zh: '中文',
}

interface LanguageSelectorProps {
	inSidebar?: boolean
}

export function LanguageSelector({ inSidebar = false }: LanguageSelectorProps) {
	const [isOpen, setIsOpen] = useState(false)
	const [currentLanguage, setLanguage] = useLanguage()

	return (
		<DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
			<DropdownMenuTrigger asChild>
				{inSidebar ? (
					<SidebarMenuButton tooltip={m['language-selector.select-language']()}>
						<IconLanguage className="h-[1.2rem] w-[1.2rem]" />
						<span>{m['language-selector.select-language']()}</span>
					</SidebarMenuButton>
				) : (
					<Button size="sm" variant="ghost">
						<div className="flex gap-2 items-center">
							<IconLanguage className="size-5" />
							<span className="block lg:hidden">
								{LANGUAGE_NAMES[currentLanguage]}
							</span>
						</div>
					</Button>
				)}
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				{locales.map((locale) => (
					<DropdownMenuItem key={locale} onClick={() => setLanguage(locale)}>
						{LANGUAGE_NAMES[locale]}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
