'use client'

import { Separator } from '@/components/ui/separator'
import { UserProfile } from './user-profile'
export const Profile = () => {
  return (
    <div className="flex flex-col gap-4">
      <UserProfile />
      <Separator orientation="horizontal" />
    </div>
  )
}
