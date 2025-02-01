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
import {
  IconBrandGithubFilled,
  IconBrandGoogleFilled,
  IconDots,
  IconPlus,
} from '@tabler/icons-react'
import { useQuery, useQueryClient } from '@tanstack/react-query'

export const ConnectedAccounts = () => {
  const [UnlinkDialog, unlinkConfirmed, setUnlinkLoading] = useConfirm(
    'Unlink Account',
    'Are you sure you want to unlink this account?',
    'Cancel',
    'Unlink',
  )
  const queryClient = useQueryClient()
  const { data: accounts } = useQuery({
    queryKey: ['accounts'],
    queryFn: async () => {
      const accounts = await client.listAccounts()
      const googleAccount = accounts.data?.find(
        (account) => account.provider === 'google',
      )
      const githubAccount = accounts.data?.find(
        (account) => account.provider === 'github',
      )
      return { googleAccount, githubAccount }
    },
  })

  const linkAccount = async (provider: 'google' | 'github') => {
    await client.linkSocial({
      provider: provider,
    })
    queryClient.invalidateQueries({
      queryKey: ['accounts'],
    })
  }

  const unlinkAccount = async (provider: 'google' | 'github') => {
    const result = await unlinkConfirmed()
    if (result.confirmed) {
      setUnlinkLoading(true)
      await client.unlinkAccount({
        providerId: provider,
      })
      queryClient.invalidateQueries({
        queryKey: ['accounts'],
      })
      setUnlinkLoading(false)
    }
  }

  console.log(JSON.stringify(accounts, null, 2))

  return (
    <div className="flex flex-row w-full">
      <UnlinkDialog />
      <div className="flex flex-col w-1/2 gap-2">
        <h3 className="text-lg font-semibold">Connected Accounts</h3>
      </div>
      <div className="w-1/2 flex flex-col gap-2 mt-2">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row gap-2 items-center">
            <IconBrandGoogleFilled size={16} />
            <span className="text-xs font-semibold whitespace-nowrap">
              Google
            </span>
            {accounts?.googleAccount ? (
              <span className="text-xs text-green-400">Connected</span>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => linkAccount('google')}
              >
                <IconPlus size={16} />
                Link
              </Button>
            )}
            {accounts?.googleAccount && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="icon" variant="ghost">
                    <IconDots size={16} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem
                    className="text-red-500"
                    onClick={() => unlinkAccount('google')}
                  >
                    Unlink
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
        <div className="flex flex-row justify-between">
          <div className="flex flex-row gap-2 items-center">
            <IconBrandGithubFilled size={16} />
            <span className="text-xs font-semibold whitespace-nowrap">
              Github
            </span>
            {accounts?.githubAccount ? (
              <span className="text-xs text-green-400">Connected</span>
            ) : (
              <span className="text-xs">Not Connected</span>
            )}
            {accounts?.githubAccount && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="icon" variant="ghost">
                    <IconDots size={16} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem
                    className="text-red-500"
                    onClick={() => unlinkAccount('github')}
                  >
                    Unlink
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
