'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { UpdateUserProfileDialog } from './update-user-profile'
import { useSession } from '@/providers/session-provider'

export const UserProfile = () => {
  const { session } = useSession()

  return (
    <div className="flex flex-row w-full">
      <div className="w-1/2 flex flex-col gap-2">
        <h3 className="text-lg font-semibold">Profile</h3>
      </div>
      <div className="w-1/2 flex flex-row gap-2">
        <Avatar>
          <AvatarImage src={session?.user.image ?? undefined} />
          <AvatarFallback>{session?.user.name[0] ?? ''}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-1">
          <span className="text-sm font-semibold">
            {session?.user.name ?? 'No name defined'}
          </span>
          <span className="text-xs text-gray-500">{session?.user.email}</span>
        </div>
        <UpdateUserProfileDialog />
      </div>
    </div>
  )
}
