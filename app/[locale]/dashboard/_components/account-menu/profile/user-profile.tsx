'use client'

import { useTranslations } from 'next-intl'
import { Skeleton } from '@/components/ui/skeleton'
import { UpdateUserProfileDialog } from './update-user-profile'
import { api } from '@/trpc/react'

export const UserProfile = () => {
  const t = useTranslations('AccountMenu')
  const { data, isFetching } = api.auth.getSession.useQuery()
  const session = data?.session

  return (
    <div className="flex flex-row w-full">
      <div className="w-1/2 flex flex-col gap-2">
        <h3 className="text-lg font-semibold">{t('profile')}</h3>
      </div>
      {isFetching ? (
        <UserProfileSkeleton />
      ) : (
        <div className="w-1/2 flex flex-row gap-2 items-center">
          <div className="flex flex-col gap-1">
            <span className="text-sm font-semibold">
              {session?.user.name ?? t('profile-page.no-name-defined')}
            </span>
            <span className="text-xs text-gray-500">{session?.user.email}</span>
          </div>
          <UpdateUserProfileDialog />
        </div>
      )}
    </div>
  )
}

function UserProfileSkeleton() {
  return (
    <div className="w-1/2 flex flex-row gap-2 items-center">
      <div className="flex flex-col gap-1">
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-3 w-1/3" />
      </div>
      <Skeleton className="h-8 w-24" />
    </div>
  )
}
