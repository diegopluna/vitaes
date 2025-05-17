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
import { Skeleton } from '@/components/ui/skeleton'
import { useRouter } from '@/i18n/navigation'
import { authClient } from '@/lib/auth-client'
import { useAccountSettings } from '@/providers/account-settings-provider'
import { api } from '@/trpc/react'
import {
  IconLogout,
  IconRosetteDiscountCheck,
  IconSelector,
} from '@tabler/icons-react'
import { useTranslations } from 'next-intl'

export const UserButton = () => {
  const t = useTranslations('UserButton')
  const { setOpen } = useAccountSettings()
  const router = useRouter()

  const { data, isFetching } = api.auth.getSession.useQuery()
  const session = data?.session

  if (isFetching) {
    return <UserButtonSkeleton />
  }

  const signOut = async () => {
    await authClient.signOut()
    router.refresh()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <Avatar className="size-8 rounded-lg">
            <AvatarImage src={session?.user.image ?? undefined} alt="User" />
            <AvatarFallback className="rounded-lg">
              {session?.user.name ? session?.user.name[0].toUpperCase() : 'U'}
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
              <AvatarImage src={session?.user.image ?? undefined} alt="User" />
              <AvatarFallback className="rounded-lg">
                {session?.user.name ? session?.user.name[0].toUpperCase() : 'U'}
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
            {t('account')}
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={signOut}>
          <IconLogout />
          {t('LogOut')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export const UserButtonSkeleton = () => {
  return (
    <SidebarMenuButton
      size="lg"
      className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
      disabled
    >
      <Skeleton className="h-8 w-8 rounded-lg" />
      <div className="grid flex-1 text-left text-sm leading-tight">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-16" />
      </div>
      <Skeleton className="m-auto h-4 w-4" />
    </SidebarMenuButton>
  )
}
