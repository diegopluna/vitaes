import { authClient } from '@/lib/auth-client'
import { m } from '@/paraglide/messages'
import { IconLogout, IconSelector } from '@tabler/icons-react'
import { useRouter } from '@tanstack/react-router'
import type { User } from 'better-auth'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { SidebarMenuButton } from './ui/sidebar'

interface UserButtonProps {
	user: User
	inSidebar?: boolean
}

export const UserButton = ({ user, inSidebar = false }: UserButtonProps) => {
	const router = useRouter()

	const signOut = async () => {
		await authClient.signOut()
		router.invalidate()
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				{inSidebar ? (
					<SidebarMenuButton
						size="lg"
						className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
					>
						<Avatar className="size-8 rounded-lg">
							<AvatarImage src={user.image ?? undefined} alt="User avatar" />
							<AvatarFallback className="rounded-lg">
								{user.name ? user.name.charAt(0).toUpperCase() : 'U'}
							</AvatarFallback>
						</Avatar>
						<div className="grid flex-1 text-left text-sm leading-tight">
							<span className="truncate font-semibold">{user.name}</span>
							<span className="truncate text-xs">{user.email}</span>
						</div>
						<IconSelector className="m-auto size-4" />
					</SidebarMenuButton>
				) : (
					<Button asChild size="sm" variant="ghost">
						<div className="flex items-center hover:cursor-pointer select-none">
							<Avatar className="size-5 rounded-md hover:cursor-pointer select-none">
								<AvatarImage src={user.image ?? undefined} alt="User avatar" />
								<AvatarFallback className="size-5 rounded-none">
									{user.name ? user.name.charAt(0).toUpperCase() : 'U'}
								</AvatarFallback>
							</Avatar>
							<span className="block lg:hidden">{user.name}</span>
						</div>
					</Button>
				)}
			</DropdownMenuTrigger>
			<DropdownMenuContent
				className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
				side="bottom"
				align="end"
				sideOffset={4}
			>
				<DropdownMenuLabel className="p-0 font-normal">
					<div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
						<Avatar className="size-8 rounded-lg hover:cursor-default select-none">
							<AvatarImage src={user.image ?? undefined} alt="User avatar" />
							<AvatarFallback className="rounded-none">
								{user.name ? user.name.charAt(0).toUpperCase() : 'U'}
							</AvatarFallback>
						</Avatar>
						<div className="grid flex-1 text-left text-sm leading-tight">
							<span className="truncate font-semibold">{user.name}</span>
							<span className="truncate text-xs">{user.email}</span>
						</div>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={signOut}>
					<IconLogout />
					{m['user-button.logout']()}
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
