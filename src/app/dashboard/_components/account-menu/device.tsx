'use client'

import { Badge } from '@/components/ui/badge'
import { client } from '@/lib/client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { CircleHelp, Laptop, Smartphone } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

type SessionExtended = {
  operatingSystem: string
  browser: string
  deviceType: 'Mobile' | 'Desktop' | 'Unknown Device'
  expiresAt: string
  ipAddress: string
  id: string
  isCurrent: boolean
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
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [confirmRevoke])

  const revokeSessionMutation = useMutation({
    mutationKey: ['revokeSession'],
    mutationFn: async (sessionId: string) => {
      await client.revokeSession({
        id: sessionId,
      })
    },
    onMutate: async (sessionId: string) => {
      await queryClient.cancelQueries({ queryKey: ['sessions'] })
      const previousSessions = queryClient.getQueryData<SessionExtended[]>([
        'sessions',
      ])
      queryClient.setQueryData<SessionExtended[]>(
        ['sessions'],
        previousSessions?.filter((session) => session.id !== sessionId),
      )

      return { previousSessions }
    },
  })

  function revokeSession(sessionId: string) {
    if (confirmRevoke) {
      revokeSessionMutation.mutate(sessionId)
      setConfirmRevoke(false)
    } else {
      setConfirmRevoke(true)
    }
  }
  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center gap-2">
        {session.deviceType === 'Mobile' && <Smartphone size={20} />}
        {session.deviceType === 'Desktop' && <Laptop size={20} />}
        {session.deviceType === 'Unknown Device' && <CircleHelp size={20} />}
        <span>{session.operatingSystem.split(';')[0]}</span>
        {session.isCurrent && <Badge>This device</Badge>}
      </div>
      <div className="flex flex-col justify-left">
        <span className="text-muted-foreground text-sm">{session.browser}</span>
        <span className="text-muted-foreground text-sm">
          {session.ipAddress}
        </span>
        <span className="text-muted-foreground text-xs">
          Expirest at: {session.expiresAt}
        </span>
        <span
          ref={buttonRef}
          className="text-red-500 hover:underline hover:cursor-pointer text-xs"
          onClick={() => revokeSession(session.id)}
        >
          {revokeSessionMutation.isPending
            ? 'Signing Out...'
            : confirmRevoke
              ? 'Are you sure?'
              : 'Sign out from this device'}
        </span>
      </div>
    </div>
  )
}
