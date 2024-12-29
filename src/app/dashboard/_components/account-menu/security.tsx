'use client'

import { Separator } from '@/components/ui/separator'
import { client } from '@/lib/client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Device } from './device'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Ellipsis, Plus } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useConfirm } from '@/hooks/use-confirm'

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

export const Security = () => {
  const [SignOutAllDialog, confirmSignOutAll, setLoadingSignOutAll] =
    useConfirm(
      'Are you sure you want to sign out of all devices?',
      'This will sign you out of all devices and you will need to sign in again.',
      'Cancel',
      'Sign Out',
    )
  const [DeleteAccountDialog, confirmDeleteAccount, setLoadingDeleteAccount] =
    useConfirm(
      'Are you sure you want to delete your account?',
      'This action cannot be undone.',
      'Cancel',
      'Delete Account',
    )
  const [AddPasskeyDialog, confirmAddPasskey, setLoadingAddPasskey] =
    useConfirm(
      'Are you sure you want to add a passkey?',
      'This will add a new passkey to your account.',
      'Cancel',
      'Add Passkey',
    )
  const [DeletePasskeyDialog, confirmDeletePasskey, setLoadingDeletePasskey] =
    useConfirm(
      'Are you sure you want to delete this passkey?',
      'This action cannot be undone.',
      'Cancel',
      'Delete Passkey',
    )
  const queryClient = useQueryClient()
  const router = useRouter()

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
        }))
        .sort((a, b) => {
          if (a.isCurrent) return -1
          if (b.isCurrent) return 1
          return b.expiresAt.getTime() - a.expiresAt.getTime()
        })
        .map((session) => ({
          ...session,
          expiresAt: session.expiresAt.toLocaleString(),
        }))

      return parsedSessions
    },
  })

  const passkeys = useQuery({
    queryKey: ['passkeys'],
    queryFn: async () => {
      const passkeys = await client.passkey.listUserPasskeys()
      return passkeys.data
    },
  })
  const revokeAllSessionsMutation = useMutation({
    mutationKey: ['revokeAllSessions'],
    mutationFn: async () => {
      await client.revokeSessions()
    },
    onMutate: async () => {
      await queryClient.invalidateQueries({ queryKey: ['sessions'] })
      queryClient.setQueryData(['sessions'], [])
    },
  })

  const deletePasskeyMutation = useMutation({
    mutationKey: ['deletePasskey'],
    mutationFn: async (id: string) => {
      await client.passkey.deletePasskey({ id })
    },
    onMutate: async () => {
      await queryClient.invalidateQueries({ queryKey: ['passkeys'] })
      queryClient.setQueryData(['passkeys'], [])
    },
  })

  const addPasskeyMutation = useMutation({
    mutationKey: ['addPasskey'],
    mutationFn: async () => {
      await client.passkey.addPasskey()
    },
    onMutate: async () => {
      await queryClient.invalidateQueries({ queryKey: ['passkeys'] })
      queryClient.setQueryData(['passkeys'], [])
    },
  })

  if (sessions.isLoading) {
    return <div>Loading...</div>
  }

  if (sessions.isError) {
    return <div>Error</div>
  }

  async function revokeAllSessions() {
    const ok = await confirmSignOutAll()
    if (ok) {
      setLoadingSignOutAll(true)
      revokeAllSessionsMutation.mutate()
      setLoadingSignOutAll(false)
      router.push('/sign-in')
    }
  }

  async function deleteAccount() {
    await client.deleteUser({
      password: 'password',
    })
  }

  async function addPasskey() {
    const ok = await confirmAddPasskey()
    if (ok) {
      setLoadingAddPasskey(true)
      await client.passkey.addPasskey()
      setLoadingAddPasskey(false)
    }
  }

  async function deletePasskey(id: string) {
    const ok = await confirmDeletePasskey()
    if (ok) {
      setLoadingDeletePasskey(true)
      deletePasskeyMutation.mutate(id)
      setLoadingDeletePasskey(false)
    }
  }
  return (
    <>
      <SignOutAllDialog />
      <DeletePasskeyDialog />
      <AddPasskeyDialog />
      <div className="flex flex-col gap-4">
        <div className="flex flex-row w-full">
          <div className="w-1/2 flex flex-col gap-2">
            <h3 className="text-lg font-semibold">Passkeys</h3>
          </div>
          <div className="w-1/2 flex flex-col gap-4">
            {passkeys.data?.map((passkey, index) => (
              <div key={index} className="flex flex-col gap-1 items-center">
                <div className="flex flex-row justify-between w-full">
                  <span className="text-sm font-semibold">
                    {passkey.name || 'Unnamed Passkey'}
                  </span>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Ellipsis size={16} />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>Rename</DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => deletePasskey(passkey.id)}
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <span className="text-xs justify-start w-full text-gray-500">
                  Created at: {new Date(passkey.createdAt).toLocaleString()}
                </span>
              </div>
            ))}
            <Button
              size={'sm'}
              variant={'ghost'}
              className="gap-2"
              onClick={() => addPasskey()}
            >
              <Plus size={16} />
              Add a passkey
            </Button>
          </div>
        </div>
        <Separator orientation="horizontal" />
        <div className="flex flex-row w-full">
          <div className="w-1/2 flex flex-col gap-2">
            <h3 className="text-lg font-semibold">Active Devices</h3>
            <span
              className="text-red-500 hover:underline hover:cursor-pointer text-xs"
              onClick={() => revokeAllSessions()}
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
              />
            ))}
          </div>
        </div>
        <Separator orientation="horizontal" />
        <div className="flex flex-row w-full items-center">
          <div className="w-1/2 flex flex-col gap-2">
            <h3 className="text-lg font-semibold">Delete Account</h3>
          </div>
          <div className="w-1/2 flex flex-col gap-4">
            <Button
              size={'sm'}
              variant={'ghost'}
              className="hover:bg-red-200/30 text-red-500 hover:text-red-500"
            >
              Delete Account
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
