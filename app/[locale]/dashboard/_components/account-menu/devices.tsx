'use client'

import { useConfirm } from '@/hooks/use-confirm'
import { useRouter } from '@/i18n/routing'
import { client } from '@/lib/auth-client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Device } from './device'

type Session = {
  operatingSystem: string
  browser: string
  deviceType: 'Mobile' | 'Desktop' | 'Unknown Device'
}

function parseSession(session: string): Session {
  const osMatch = /\((.*?)\)/.exec(session)
  const os = osMatch ? osMatch[1] : 'Unknown OS'

  let deviceType = 'Unkown Device'
  if (/Android|iPhone|iPad|iPod|Windows Phone|webOS|BlackBerry/i.test(os)) {
    deviceType = 'Mobile'
  } else if (/Macintosh|Windows|Linux|X11|CrOS/i.test(os)) {
    deviceType = 'Desktop'
  }
  const browserMatch = /(Chrome|Safari|Firefox|Edge|Opera|OPR)\/([\d.]+)/.exec(
    session,
  )
  const browserWithVersion = browserMatch
    ? `${browserMatch[1]} ${browserMatch[2]}`
    : 'Unknown Browser'
  return {
    operatingSystem: os,
    browser: browserWithVersion,
    deviceType: deviceType as Session['deviceType'],
  }
}

export const Devices = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  const [SignOutAllDialog, confirmSignOutAll, setLoadingSignOutAll] =
    useConfirm(
      'Are you sure you want to sign out of all devices?',
      'This will sign you out of all devices and you will need to sign in again.',
      'Cancel',
      'Sign Out',
    )

  const sessions = useQuery({
    queryKey: ['sessions'],
    queryFn: async () => {
      const [currentSession, allSessions] = await Promise.all([
        client.getSession(),
        client.listSessions(),
      ])

      const parsedSessions = allSessions.data
        ?.map((session) => ({
          ...parseSession(session.userAgent!),
          expiresAt: new Date(session.expiresAt),
          ipAddress: session.ipAddress,
          id: session.id,
          isCurrent: session.id === currentSession.data?.session.id,
          token: session.token,
        }))
        .sort((a, b) => {
          if (a.isCurrent) return -1
          if (b.isCurrent) return 1
          return a.expiresAt.getTime() - b.expiresAt.getTime()
        })
        .map((session) => ({
          ...session,
          expiresAt: session.expiresAt.toLocaleString(),
        }))

      return parsedSessions
    },
  })

  const signOutAllMutation = useMutation({
    mutationKey: ['sessions'],
    mutationFn: async () => {
      await client.revokeSessions()
      await queryClient.invalidateQueries({
        queryKey: ['sessions'],
      })
    },
  })

  async function signOutAllSessions() {
    const result = await confirmSignOutAll()
    if (result.confirmed) {
      setLoadingSignOutAll(true)
      await signOutAllMutation.mutateAsync()
      setLoadingSignOutAll(false)
      router.push('/sign-in')
    }
  }

  return (
    <div className="flex flex-row w-full">
      <SignOutAllDialog />
      <div className="w-1/2 flex flex-col gap-2">
        <h3 className="text-lg font-semibold">Active Devices</h3>
        <span
          onClick={signOutAllSessions}
          className="text-red-500 hover:underline hover:cursor-pointer text-xs"
        >
          Sign out of all devices
        </span>
      </div>
      <div className="w-1/2 flex flex-col gap-4">
        {sessions.data?.map((session, index) => (
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
      </div>
    </div>
  )
}
