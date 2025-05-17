'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Skeleton } from '@/components/ui/skeleton'
import { useConfirm } from '@/hooks/use-confirm'
import { authClient } from '@/lib/auth-client'
import { api } from '@/trpc/react'
import { IconDots, IconPlus } from '@tabler/icons-react'
import { useMutation } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import { z } from 'zod'

export const Passkeys = () => {
  const t = useTranslations('AccountMenu.security-page')

  const passkeySchema = z.object({
    name: z.string().nonempty(t('name-required')),
  })

  const [AddPasskeyDialog, confirmAddPasskey, setLoadingAddPasskey] =
    useConfirm<z.infer<typeof passkeySchema>>(
      t('add-passkey-title'),
      t('add-passkey-description'),
      t('cancel'),
      t('add-passkey'),
      [
        {
          id: 'name',
          label: t('name-label'),
          placeholder: t('name-placeholder'),
          type: 'text',
        },
      ],
      passkeySchema,
    )
  const [DeletePasskeyDialog, confirmDeletePasskey, setLoadingDeletePasskey] =
    useConfirm(
      t('delete-passkey-title'),
      t('cannot-be-undone'),
      t('cancel'),
      t('delete-passkey'),
    )
  const [RenamePasskeyDialog, confirmRenamePasskey, setLoadingRenamePasskey] =
    useConfirm<z.infer<typeof passkeySchema>>(
      t('rename-passkey-title'),
      t('cannot-be-undone'),
      t('cancel'),
      t('rename-passkey'),
      [
        {
          id: 'name',
          label: t('new-name'),
          placeholder: t('new-name-placeholder'),
          type: 'text',
        },
      ],
      passkeySchema,
    )

  const apiUtils = api.useUtils()
  const { data, isFetching } = api.auth.getPasskeys.useQuery()

  const addPasskeyMutation = useMutation({
    mutationFn: async (passkeyName: string) => {
      await authClient.passkey.addPasskey({
        name: passkeyName,
      })
      apiUtils.auth.getPasskeys.invalidate()
    },
  })

  const deletePasskeyMutation = useMutation({
    mutationFn: async (passkeyId: string) => {
      await authClient.passkey.deletePasskey({
        id: passkeyId,
      })
      apiUtils.auth.getPasskeys.invalidate()
    },
  })

  const renamePasskeyMutation = useMutation({
    mutationFn: async ({
      passkeyId,
      newName,
    }: {
      passkeyId: string
      newName: string
    }) => {
      await authClient.passkey.updatePasskey({
        id: passkeyId,
        name: newName,
      })
      apiUtils.auth.getPasskeys.invalidate()
    },
  })

  async function renamePasskey(passkeyId: string) {
    const result = await confirmRenamePasskey()
    if (result.confirmed) {
      setLoadingRenamePasskey(true)
      await renamePasskeyMutation.mutateAsync({
        passkeyId,
        newName: result.values?.name as string,
      })
      setLoadingRenamePasskey(false)
    }
  }

  async function addPasskey() {
    const result = await confirmAddPasskey()
    if (result.confirmed) {
      setLoadingAddPasskey(true)
      await addPasskeyMutation.mutateAsync(result.values?.name as string)
      setLoadingAddPasskey(false)
    }
  }

  async function deletePasskey(passkeyId: string) {
    const result = await confirmDeletePasskey()
    if (result.confirmed) {
      setLoadingDeletePasskey(true)
      await deletePasskeyMutation.mutateAsync(passkeyId)
      setLoadingDeletePasskey(false)
    }
  }

  return (
    <div className="flex flex-row w-full">
      <AddPasskeyDialog />
      <DeletePasskeyDialog />
      <RenamePasskeyDialog />
      <div className="w-1/2 flex flex-col gap-2">
        <h3 className="text-lg font-semibold">{t('passkeys')}</h3>
      </div>
      <div className="w-1/2 flex flex-col gap-4">
        {isFetching ? (
          <PasskeysSkeleton />
        ) : (
          <>
            {data?.map((passkey, index) => (
              <div key={index} className="flex flex-col gap-1 items-center">
                <div className="flex flex-row justify-between w-full">
                  <span className="text-sm font-semibold">
                    {passkey.name || t('unnamed-passkey')}
                  </span>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <IconDots size={16} />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem
                        onClick={() => renamePasskey(passkey.id)}
                      >
                        {t('rename')}
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => deletePasskey(passkey.id)}
                      >
                        {t('delete')}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <span className="text-xs justify-start w-full text-gray-500">
                  {t('created-at')}:{' '}
                  {new Date(passkey.createdAt).toLocaleDateString()}
                </span>
              </div>
            ))}
            <Button
              onClick={addPasskey}
              size="sm"
              variant="ghost"
              className="gap-2"
            >
              <IconPlus size={16} />
              {t('add-a-passkey')}
            </Button>
          </>
        )}
      </div>
    </div>
  )
}

function PasskeysSkeleton() {
  return (
    <Button disabled size="sm" variant="ghost" className="gap-2">
      <Skeleton className="h-4 w-4" />
      <Skeleton className="h-4 w-24" />
    </Button>
  )
}
