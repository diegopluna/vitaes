'use client'

import { Badge } from '@/components/ui/badge'
import { client } from '@/lib/auth-client'
import {
  IconDeviceLaptop,
  IconDeviceMobile,
  IconHelpCircle,
} from '@tabler/icons-react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
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
  const [confirmRevoke, setConfirmRevoke] = useState(false)
  const queryClient = useQueryClient()

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

  const revokeSessionMutation = useMutation({
    mutationKey: ['sessions'],
    mutationFn: async (sessionToken: string) => {
      await client.revokeSession({
        token: sessionToken,
      })
      await queryClient.invalidateQueries({
        queryKey: ['sessions'],
      })
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
        {session.isCurrent && <Badge>This device</Badge>}
      </div>
      <div className="flex flex-col justify-left">
        <span className="text-muted-foreground text-sm">{session.browser}</span>
        <span className="text-muted-foreground text-sm">
          {session.ipAddress}
        </span>
        <span className="text-muted-foreground text-xs">
          Expires at: {session.expiresAt}
        </span>
        <span
          ref={buttonRef}
          className="text-red-500 hover:underline hover:cursor-pointer text-xs"
          onClick={() => revokeSession(session.token)}
        >
          {revokeSessionMutation.isPending
            ? 'Signing out...'
            : confirmRevoke
              ? 'Are you sure?'
              : 'Sign out from this device'}
        </span>
      </div>
    </div>
  )
}
