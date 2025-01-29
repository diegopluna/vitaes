'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useConfirm } from '@/hooks/use-confirm'
import { client } from '@/lib/auth-client'
import { IconDots, IconPlus } from '@tabler/icons-react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { z } from 'zod'

export const Passkeys = () => {
  const queryClient = useQueryClient()
  const [AddPasskeyDialog, confirmAddPasskey, setLoadingAddPasskey] =
    useConfirm(
      'Are you sure you want yo add a passkey?',
      'This will add a new passkey to your account.',
      'Cancel',
      'Add passkey',
      [
        {
          id: 'name',
          label: 'Name',
          placeholder: 'Enter a name for the passkey',
          type: 'text',
        },
      ],
      z.object({
        name: z.string().nonempty('Name is required'),
      }),
    )
  const [DeletePasskeyDialog, confirmDeletePasskey, setLoadingDeletePasskey] =
    useConfirm(
      'Are you sure you want to delete this passkey?',
      'This action cannot be undone.',
      'Cancel',
      'Delete Passkey',
    )
  const [RenamePasskeyDialog, confirmRenamePasskey, setLoadingRenamePasskey] =
    useConfirm(
      'Are you sure you want to rename this passkey?',
      'This action cannot be undone.',
      'Cancel',
      'Rename Passkey',
      [
        {
          id: 'name',
          label: 'New name',
          placeholder: 'Enter a new name for the passkey',
          type: 'text',
        },
      ],
      z.object({
        name: z.string().nonempty('Name is required'),
      }),
    )

  const { data } = useQuery({
    queryKey: ['passkeys'],
    queryFn: async () => {
      const passkeys = await client.passkey.listUserPasskeys()
      return passkeys.data
    },
  })

  const addPasskeyMutation = useMutation({
    mutationKey: ['passkeys'],
    mutationFn: async (passkeyName: string) => {
      await client.passkey.addPasskey({
        name: passkeyName,
      })
      await queryClient.invalidateQueries({
        queryKey: ['passkeys'],
      })
    },
  })

  const deletePasskeyMutation = useMutation({
    mutationKey: ['passkeys'],
    mutationFn: async (passkeyId: string) => {
      await client.passkey.deletePasskey({
        id: passkeyId,
      })
      await queryClient.invalidateQueries({
        queryKey: ['passkeys'],
      })
    },
  })

  const renamePasskeyMutation = useMutation({
    mutationKey: ['passkeys'],
    mutationFn: async ({
      passkeyId,
      newName,
    }: {
      passkeyId: string
      newName: string
    }) => {
      await client.passkey.updatePasskey({
        id: passkeyId,
        name: newName,
      })
      await queryClient.invalidateQueries({
        queryKey: ['passkeys'],
      })
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
        <h3 className="text-lg font-semibold">Passkeys</h3>
      </div>
      <div className="w-1/2 flex flex-col gap-4">
        {data?.map((passkey, index) => (
          <div key={index} className="flex flex-col gap-1 items-center">
            <div className="flex flex-row justify-between w-full">
              <span className="text-sm font-semibold">
                {passkey.name || 'Unnamed Passkey'}
              </span>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <IconDots size={16} />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => renamePasskey(passkey.id)}>
                    Rename
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => deletePasskey(passkey.id)}>
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <span className="text-xs justify-start w-full text-gray-500">
              Created at: {new Date(passkey.createdAt).toLocaleDateString()}
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
          Add a passkey
        </Button>
      </div>
    </div>
  )
}
