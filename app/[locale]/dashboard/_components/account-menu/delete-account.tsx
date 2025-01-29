'use client'

import { Button } from '@/components/ui/button'
import { useConfirm } from '@/hooks/use-confirm'
import { client } from '@/lib/auth-client'

export const DeleteAccount = () => {
  const [DeleteDialog, deleteConfirm, setDeleteLoading] = useConfirm(
    'Are you sure you want to delete your account?',
    'This will send you an email with a link to delete your account.',
    'Cancel',
    'Send Email',
  )

  async function deleteUser() {
    const result = await deleteConfirm()
    if (result.confirmed) {
      setDeleteLoading(true)
      await client.deleteUser()
      setDeleteLoading(false)
    }
  }

  return (
    <div className="flex flex-row w-full items-center">
      <DeleteDialog />
      <div className="w-1/2 flex flex-col gap-2">
        <h3 className="text-lg font-semibold">Delete Account</h3>
      </div>
      <div className="w-1/2 flex flex-col gap-4">
        <Button
          size="sm"
          onClick={deleteUser}
          variant="ghost"
          className="hover:bg-red-200/30 text-red-500 hover:text-red-500"
        >
          Delete Account
        </Button>
      </div>
    </div>
  )
}
