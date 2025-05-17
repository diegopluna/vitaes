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
import { Skeleton } from '@/components/ui/skeleton'
import { useRouter } from '@/i18n/navigation'
import { authClient } from '@/lib/auth-client'
import { useAccountSettings } from '@/providers/account-settings-provider'
import { api } from '@/trpc/react'
import { IconLogout, IconRosetteDiscountCheck } from '@tabler/icons-react'
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
        <Button asChild size="sm" variant="ghost">
          <div className="flex items-center hover:cursor-pointer">
            <Avatar className="size-5 rounded-md hover:cursor-pointer select-none">
              <AvatarImage src={session?.user.image ?? undefined} alt="User" />
              <AvatarFallback className="size-5 rounded-none">
                {session?.user.name ? session?.user.name[0].toUpperCase() : 'U'}
              </AvatarFallback>
            </Avatar>
            <span className="block lg:hidden">{session?.user.name}</span>
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
              <AvatarImage src={session?.user.image ?? ''} alt="User" />
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
    <Button asChild size="sm" variant="ghost" disabled>
      <div className="flex items-center">
        <Avatar className="size-5 rounded-md hover:cursor-pointer select-none">
          <AvatarFallback className="size-5 rounded-none">
            <Skeleton className="h-5 w-5 rounded-full" />
          </AvatarFallback>
        </Avatar>
      </div>
    </Button>
  )
}
