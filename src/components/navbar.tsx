import { m } from '@/paraglide/messages'
import { IconBrandGithubFilled, IconMenu } from '@tabler/icons-react'
import { Link } from '@tanstack/react-router'
import { useState } from 'react'
import { LanguageSelector } from './language-selector'
import { ThemeToggle } from './theme-toggle'
import { Button } from './ui/button'
import { Separator } from './ui/separator'
import {
	Sheet,
	SheetContent,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from './ui/sheet'

export function Navbar() {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<header className="shadow-inner bg-opacity-15 w-[90%] md:w-[70%] lg:w-[75%] lg:max-screen-xl top-5 mx-auto sticky border border-secondary z-40 flex justify-between items-center p-2 bg-card">
			<Link to="/" className="font-bold text-lg flex items-center">
				<img src="/favicon.ico" alt="Vitaes" className="size-9" />
				Vitaes
			</Link>
			{/* <!-- Mobile Menu --> */}
			<div className="flex items-center lg:hidden">
				<Sheet open={isOpen} onOpenChange={setIsOpen}>
					<SheetTrigger>
						<IconMenu className="cursor-pointer lg:hidden" />
					</SheetTrigger>
					<SheetContent
						side="left"
						className="flex flex-col justify-between bg-card border-secondary"
					>
						<SheetHeader className="mb-4 ml-4">
							<SheetTitle className="flex items-center">
								<Link to="/" className="flex items-center">
									<img src="/favicon.ico" alt="Vitaes" className="size-9" />
									Vitaes
								</Link>
							</SheetTitle>
						</SheetHeader>
						<SheetFooter className="flex-col sm:flex-col justify-start items-start">
							<Separator className="mb-2" />
							<LanguageSelector />
							<ThemeToggle />
						</SheetFooter>
					</SheetContent>
				</Sheet>
			</div>

			<div className="hidden lg:flex">
				<LanguageSelector />
				<ThemeToggle />
				<Button
					asChild
					variant="ghost"
					size="sm"
					aria-label={m['navbar.github']()}
				>
					<a
						aria-label={m['navbar.github']()}
						href="https://github.com/diegopluna/vitaes"
						target="_blank"
						rel="noreferrer"
					>
						<IconBrandGithubFilled className="size-5" />
					</a>
				</Button>
			</div>
		</header>
	)
}
