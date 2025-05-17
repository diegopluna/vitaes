'use client'

import { useConfirm } from '@/hooks/use-confirm'
import { useRouter } from '@/i18n/navigation'
import { authClient } from '@/lib/auth-client'
import { Device, DeviceSkeleton } from './device'
import { useTranslations } from 'next-intl'
import { api } from '@/trpc/react'

export const Devices = () => {
  const t = useTranslations('AccountMenu.security-page')
  const router = useRouter()

  const [SignOutAllDialog, confirmSignOutAll, setLoadingSignOutAll] =
    useConfirm(
      t('sign-out-all-dialog-title'),
      t('sign-out-all-dialog-description'),
      t('cancel'),
      t('sign-out'),
    )

  const apiUtils = api.useUtils()
  const { data: sessions, isFetching } = api.auth.getSessions.useQuery()

  async function signOutAllSessions() {
    const result = await confirmSignOutAll()
    if (result.confirmed) {
      setLoadingSignOutAll(true)
      await authClient.revokeSessions()
      apiUtils.auth.getSessions.invalidate()
      setLoadingSignOutAll(false)
      router.push('/sign-in')
    }
  }

  return (
    <div className="flex flex-row w-full">
      <SignOutAllDialog />
      <div className="w-1/2 flex flex-col gap-2">
        <h3 className="text-lg font-semibold">{t('active-devices')}</h3>
        <span
          onClick={signOutAllSessions}
          className="text-red-500 hover:underline hover:cursor-pointer text-xs"
        >
          {t('sign-out-all')}
        </span>
      </div>
      <div className="w-1/2 flex flex-col gap-4">
        {isFetching ? (
          <DeviceSkeleton />
        ) : (
          <>
            {sessions?.map((session, index) => (
              <Device
                key={index}
                deviceType={session.deviceType}
                isCurrent={session.isCurrent}
                operatingSystem={session.operatingSystem}
                browser={session.browser}
                ipAddress={session.ipAddress!}
                expiresAt={session.expiresAt}
                id={session.id}
                token={session.token}
              />
            ))}
          </>
        )}
      </div>
    </div>
  )
}
