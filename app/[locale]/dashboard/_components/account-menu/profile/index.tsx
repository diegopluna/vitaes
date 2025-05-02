'use client'

import { Separator } from '@/components/ui/separator'
import { UserProfile } from './user-profile'
import { ConnectedAccounts } from './connected-accounts'

export const Profile = () => {
  return (
    <div className="flex flex-col gap-4">
      <UserProfile />
      <Separator orientation="horizontal" />
      <ConnectedAccounts />
    </div>
  )
}
