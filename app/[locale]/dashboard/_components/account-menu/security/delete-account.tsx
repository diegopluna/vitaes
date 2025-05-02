'use client'

import { Button } from '@/components/ui/button'
import { useConfirm } from '@/hooks/use-confirm'
import { authClient } from '@/lib/auth-client'
import { useTranslations } from 'next-intl'

export const DeleteAccount = () => {
  const t = useTranslations('AccountMenu.security-page')
  const [DeleteDialog, deleteConfirm, setDeleteLoading] = useConfirm(
    t('delete-account-title'),
    t('delete-account-description'),
    t('cancel'),
    t('delete-account-confirmation'),
  )

  async function deleteUser() {
    const result = await deleteConfirm()
    if (result.confirmed) {
      setDeleteLoading(true)
      await authClient.deleteUser()
      setDeleteLoading(false)
    }
  }

  return (
    <div className="flex flex-row w-full items-center">
      <DeleteDialog />
      <div className="w-1/2 flex flex-col gap-2">
        <h3 className="text-lg font-semibold">{t('delete-account')}</h3>
      </div>
      <div className="w-1/2 flex flex-col gap-4">
        <Button
          size="sm"
          onClick={deleteUser}
          variant="ghost"
          className="hover:bg-red-200/30 text-red-500 hover:text-red-500"
        >
          {t('delete-account')}
        </Button>
      </div>
    </div>
  )
}
