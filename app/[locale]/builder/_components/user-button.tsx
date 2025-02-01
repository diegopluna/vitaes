'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { SidebarMenuButton } from '@/components/ui/sidebar'
import { useRouter } from '@/i18n/routing'
import { client } from '@/lib/auth-client'
import { useAccountSettings } from '@/providers/account-settings-provider'
import { useSession } from '@/providers/session-provider'
import {
  IconBell,
  IconLogout,
  IconRosetteDiscountCheck,
  IconSelector,
} from '@tabler/icons-react'
import { useQueryClient } from '@tanstack/react-query'

export const UserButton = () => {
  const { session } = useSession()
  const { setOpen } = useAccountSettings()
  const queryClient = useQueryClient()

  const signOut = async () => {
    await client.signOut()
    queryClient.invalidateQueries({
      queryKey: ['session'],
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <Avatar className="size-8 rounded-lg">
            <AvatarImage src={session?.user.image || undefined} alt="User" />
            <AvatarFallback className="rounded-lg">
              {session?.user.name[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">{session?.user.name}</span>
            <span className="truncate text-xs">{session?.user.email}</span>
          </div>
          <IconSelector className="m-auto size-4" />
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
        side="bottom"
        align="end"
        sideOffset={4}
      >
        <DropdownMenuLabel className="p-0 font normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <Avatar className="size-8 rounded-lg">
              <AvatarImage src={session?.user.image || undefined} alt="User" />
              <AvatarFallback className="rounded-lg">
                {session?.user.name[0].toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">
                {session?.user.name}
              </span>
              <span className="truncate text-xs">{session?.user.email}</span>
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
