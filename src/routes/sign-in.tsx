import { Button } from '@/components/ui/button'
import { authClient } from '@/lib/auth-client'
import { m } from '@/paraglide/messages'
import {
	IconBrandGithubFilled,
	IconBrandGoogleFilled,
	IconLoader,
} from '@tabler/icons-react'
import { createFileRoute, redirect } from '@tanstack/react-router'
import { useTransition } from 'react'

export const Route = createFileRoute('/sign-in')({
	component: RouteComponent,
	beforeLoad: ({ context }) => {
		if (context.user) {
			throw redirect({ to: '/dashboard' })
		}
	},
})

function RouteComponent() {
	const [isGoogleLoading, startGoogleTransition] = useTransition()
	const [isGithubLoading, startGithubTransition] = useTransition()

	function socialSignIn(provider: 'google' | 'github') {
		if (provider === 'google') {
			startGoogleTransition(() => {
				authClient.signIn.social({
					provider,
				})
			})
			return
		}
		if (provider === 'github') {
			startGithubTransition(() => {
				authClient.signIn.social({
					provider,
				})
			})
			return
		}
		throw new Error('Invalid provider')
	}

	const isLoading = isGoogleLoading || isGithubLoading

	return (
		<div className="flex w-full justify-center items-center h-screen">
			<div className="w-[22rem]">
				<div className="flex flex-col items-center justify-center gap-4">
					<img
						src="/logo.svg"
						alt="Vitaes"
						className="size-12 bg-gradient-to-tr border border-secondary from-background via-muted/90 to-background rounded-lg mr-2"
					/>
					<h3 className="m-0 font-semibold text-lg text-wrap text-muted-foreground">
						{m['login.welcome']()}
					</h3>
					<Button
						variant="secondary"
						className="w-full"
						disabled={isLoading}
						onClick={() => socialSignIn('google')}
					>
						{isGoogleLoading ? (
							<IconLoader className="mr-2 size-4 animate-spin" />
						) : (
							<IconBrandGoogleFilled className="mr-2 size-4" />
						)}
						{m['login.google']()}
					</Button>
					<Button
						variant="secondary"
						className="w-full"
						disabled={isLoading}
						onClick={() => socialSignIn('github')}
					>
						{isGithubLoading ? (
							<IconLoader className="mr-2 size-4 animate-spin" />
						) : (
							<IconBrandGithubFilled className="mr-2 size-4" />
						)}
						{m['login.github']()}
					</Button>
				</div>
			</div>
		</div>
	)
}
