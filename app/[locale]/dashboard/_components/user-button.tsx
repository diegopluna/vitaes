'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useRouter } from '@/i18n/routing'
import { client } from '@/lib/auth-client'
import { useAccountSettings } from '@/providers/account-settings-provider'
import {
  IconBell,
  IconLogout,
  IconRosetteDiscountCheck,
} from '@tabler/icons-react'
import { User } from 'better-auth'

export const UserButton = ({ user }: { user: User }) => {
  const { setOpen } = useAccountSettings()
  const router = useRouter()

  const signOut = async () => {
    await client.signOut()
    router.refresh()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          asChild
          size="sm"
          variant="ghost"
          className="w-full justify-start hover:cursor-pointer"
        >
          <div className="flex gap-2 items-center hover:cursor-pointer">
            <Avatar className="size-5 rounded-md hover:cursor-pointer select-none">
              <AvatarImage src={user.image ?? undefined} alt="User" />
              <AvatarFallback className="size-5 rounded-md">
                {user.name[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span className="block lg:hidden">{user.name}</span>
          </div>
        </Button>
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
              <AvatarImage src={user.image ?? ''} alt="User" />
              <AvatarFallback className="rounded-lg">
                {user.name[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">{user.name}</span>
              <span className="truncate text-xs">{user.email}</span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <IconRosetteDiscountCheck />
            Account
          </DropdownMenuItem>
          <DropdownMenuItem>
            <IconBell />
            Notifications
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={signOut}>
          <IconLogout />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
