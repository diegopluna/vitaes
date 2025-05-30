import { m } from '@/paraglide/messages'
import { getLocale, locales, setLocale } from '@/paraglide/runtime'
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

const localesList = locales.reduce(
	(acc, locale) => {
		switch (locale) {
			case 'en':
				acc[locale] = 'English'
				break
			case 'de':
				acc[locale] = 'Deutsch'
				break
			case 'es':
				acc[locale] = 'Español'
				break
			case 'fr':
				acc[locale] = 'Français'
				break
			case 'ja':
				acc[locale] = '日本語'
				break
			case 'pt':
				acc[locale] = 'Português'
				break
			case 'zh':
				acc[locale] = '中文'
				break
		}
		return acc
	},
	{} as Record<string, string>,
)

interface LanguageSelectorProps {
	inSidebar?: boolean
}

export function LanguageSelector({ inSidebar = false }: LanguageSelectorProps) {
	const [isOpen, setIsOpen] = useState(false)

	const currentLocale = getLocale()
	const currentLocaleName = localesList[currentLocale]

	return (
		<DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
			<DropdownMenuTrigger asChild>
				{inSidebar ? (
					<SidebarMenuButton tooltip={'Select Language'}>
						<IconLanguage className="h-[1.2rem] w-[1.2rem]" />
						<span>{m['language-selector.select-language']()}</span>
					</SidebarMenuButton>
				) : (
					<Button size="sm" variant="ghost">
						<div className="flex gap-2 items-center">
							<IconLanguage className="size-5" />
							<span className="block lg:hidden">{currentLocaleName}</span>
						</div>
					</Button>
				)}
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				{locales.map((locale) => (
					<DropdownMenuItem key={locale} onClick={() => setLocale(locale)}>
						{localesList[locale]}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
