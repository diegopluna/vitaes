import type { User } from '@/lib/auth'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { DropdownMenu, DropdownMenuTrigger } from './ui/dropdown-menu'

interface UserButtonProps {
	user: User
}

export const UserButton = ({ user }: UserButtonProps) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
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
			</DropdownMenuTrigger>
		</DropdownMenu>
	)
}
