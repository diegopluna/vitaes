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
import {
  IconBrandGithubFilled,
  IconBrandGoogleFilled,
  IconDots,
  IconPlus,
} from '@tabler/icons-react'
import { useTranslations } from 'next-intl'

export const ConnectedAccounts = () => {
  const t = useTranslations('AccountMenu')
  const [UnlinkDialog, unlinkConfirmed, setUnlinkLoading] = useConfirm(
    t('profile-page.unlink-account'),
    t('profile-page.unlink-account-description'),
    t('profile-page.cancel'),
    t('profile-page.unlink'),
  )
  const apiUtils = api.useUtils()
  const { data: accounts, isFetching } = api.auth.getAccounts.useQuery()

  const linkAccount = async (provider: 'google' | 'github') => {
    await authClient.linkSocial({
      provider: provider,
    })
    apiUtils.auth.getAccounts.invalidate()
  }

  const unlinkAccount = async (provider: 'google' | 'github') => {
    const result = await unlinkConfirmed()
    if (result.confirmed) {
      setUnlinkLoading(true)
      await authClient.unlinkAccount({
        providerId: provider,
      })
      apiUtils.auth.getAccounts.invalidate()

      setUnlinkLoading(false)
    }
  }

  return (
    <div className="flex flex-row w-full">
      <UnlinkDialog />
      <div className="flex flex-col w-1/2 gap-2">
        <h3 className="text-lg font-semibold">
          {t('profile-page.connected-accounts')}
        </h3>
      </div>
      <div className="w-1/2 flex flex-col gap-2 mt-2">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row gap-2 items-center">
            <IconBrandGoogleFilled size={16} />
            <span className="text-xs font-semibold whitespace-nowrap">
              Google
            </span>
            {isFetching ? (
              <Skeleton className="h-4 w-16" />
            ) : (
              <>
                {accounts?.googleAccount ? (
                  <span className="text-xs text-green-400">
                    {t('profile-page.connected')}
                  </span>
                ) : (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => linkAccount('google')}
                  >
                    <IconPlus size={16} />
                    {t('profile-page.link')}
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
                        {t('profile-page.unlink')}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </>
            )}
          </div>
        </div>
        <div className="flex flex-row justify-between">
          <div className="flex flex-row gap-2 items-center">
            <IconBrandGithubFilled size={16} />
            <span className="text-xs font-semibold whitespace-nowrap">
              Github
            </span>
            {isFetching ? (
              <Skeleton className="h-4 w-16" />
            ) : (
              <>
                {accounts?.githubAccount ? (
                  <span className="text-xs text-green-400">
                    {t('profile-page.connected')}
                  </span>
                ) : (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => linkAccount('github')}
                  >
                    <IconPlus size={16} />
                    {t('profile-page.link')}
                  </Button>
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
                        {t('profile-page.unlink')}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
