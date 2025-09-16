'use client'

import Link from "next/link"
import { Separator } from "./ui/separator"
import { useTranslations } from "next-intl"

export function Footer() {
  const t = useTranslations('landing')
	return (
		<footer id="footer" className="container mx-auto py-24 sm:py-32">
			<div className="p-10 bg-card border border-secondary rounded-xl">
				<div className="gap-6 items-center justify-between max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
					<div className="col-span-full xl:col-span-2">
						<Link href="/" className="flex font-bold items-center">
							<img src="/logo.svg" alt="Vitaes" className="size-9" />
							<span className="text-2xl">Vitaes</span>
						</Link>
					</div>
					<Separator className="my-6 col-span-full" />
					<section className="col-span-full">
						<h3>
							{t('footer')}
							<a
								href="https://github.com/diegopluna"
								target="_blank"
								rel="noopener noreferrer"
								className="text-primary transition-all border-primary hover:border-b-2 ml-1"
							>
								diegopluna
							</a>
						</h3>
					</section>
				</div>
			</div>
		</footer>
	)
}
