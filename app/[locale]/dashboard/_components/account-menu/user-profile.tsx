'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { client } from '@/lib/auth-client'
import { useQuery } from '@tanstack/react-query'
import { UpdateUserProfileDialog } from './update-user-profile'

export const UserProfile = () => {
  const session = useQuery({
    queryKey: ['session'],
    queryFn: async () => {
      const session = await client.getSession()
      return session.data
    },
  })

  return (
    <div className="flex flex-row w-full">
      <div className="w-1/2 flex flex-col gap-2">
        <h3 className="text-lg font-semibold">Profile</h3>
      </div>
      <div className="w-1/2 flex flex-row gap-2">
        <Avatar>
          <AvatarImage src={session.data?.user.image ?? ''} />
          <AvatarFallback>{session.data?.user.name[0] ?? ''}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-1">
          <span className="text-sm font-semibold">
            {session.data?.user.name ?? 'No name defined'}
          </span>
          <span className="text-xs text-gray-500">
            {session.data?.user.email}
          </span>
        </div>
        <UpdateUserProfileDialog />
      </div>
    </div>
  )
}
