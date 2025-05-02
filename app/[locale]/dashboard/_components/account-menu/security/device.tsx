'use client'

import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { authClient } from '@/lib/auth-client'
import { api } from '@/trpc/react'
import {
  IconDeviceLaptop,
  IconDeviceMobile,
  IconHelpCircle,
} from '@tabler/icons-react'
import { useMutation } from '@tanstack/react-query'
import { useTranslations } from 'next-intl'
import { useEffect, useRef, useState } from 'react'

type SessionExtended = {
  operatingSystem: string
  browser: string
  deviceType: 'Mobile' | 'Desktop' | 'Unknown Device'
  expiresAt: string
  ipAddress: string
  id: string
  isCurrent: boolean
  token: string
}

export const Device = (session: SessionExtended) => {
  const t = useTranslations('AccountMenu.security-page')
  const [confirmRevoke, setConfirmRevoke] = useState(false)

  const buttonRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node) &&
        confirmRevoke
      ) {
        setConfirmRevoke(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [confirmRevoke])

  const apiUtils = api.useUtils()
  const revokeSessionMutation = useMutation({
    mutationFn: async (sessionToken: string) => {
      await authClient.revokeSession({
        token: sessionToken,
      })
      apiUtils.auth.getSessions.invalidate()
    },
  })

  async function revokeSession(sessionToken: string) {
    if (confirmRevoke) {
      await revokeSessionMutation.mutateAsync(sessionToken)
      setConfirmRevoke(false)
    } else {
      setConfirmRevoke(true)
    }
  }

  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center gap-2">
        {session.deviceType === 'Mobile' && <IconDeviceMobile size={20} />}
        {session.deviceType === 'Desktop' && <IconDeviceLaptop size={20} />}
        {session.deviceType === 'Unknown Device' && (
          <IconHelpCircle size={20} />
        )}
        <span>{session.operatingSystem.split(';')[0]}</span>
        {session.isCurrent && <Badge>{t('this-device')}</Badge>}
      </div>
      <div className="flex flex-col justify-left">
        <span className="text-muted-foreground text-sm">{session.browser}</span>
        <span className="text-muted-foreground text-sm">
          {session.ipAddress}
        </span>
        <span className="text-muted-foreground text-xs">
          {t('expires-at')}: {session.expiresAt}
        </span>
        <span
          ref={buttonRef}
          className="text-red-500 hover:underline hover:cursor-pointer text-xs"
          onClick={() => revokeSession(session.token)}
        >
          {revokeSessionMutation.isPending
            ? t('signing-out')
            : confirmRevoke
              ? t('are-you-sure')
              : t('sign-out-device')}
        </span>
      </div>
    </div>
  )
}

export const DeviceSkeleton = () => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center gap-2">
        <Skeleton className="h-4 w-4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
      <div className="flex flex-col justify-left">
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  )
}
