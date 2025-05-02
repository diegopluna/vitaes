'use client'

import { Separator } from '@/components/ui/separator'
import { Passkeys } from './passkeys'
import { Devices } from './devices'
import { DeleteAccount } from './delete-account'

export const Security = () => {
  return (
    <div className="flex flex-col gap-4">
      <Passkeys />
      <Separator orientation="horizontal" />
      <Devices />
      <Separator orientation="horizontal" />
      <DeleteAccount />
    </div>
  )
}
