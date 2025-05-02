import { auth } from '@/server/auth'
import { createTRPCRouter, protectedProcedure } from '../trpc'

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

export const authRouter = createTRPCRouter({
  getSession: protectedProcedure.query(async ({ ctx }) => {
    return {
      session: ctx.session,
    }
  }),
  getAccounts: protectedProcedure.query(async ({ ctx }) => {
    try {
      const accounts = await auth.api.listUserAccounts({
        headers: ctx.headers,
      })

      const googleAccount = accounts.find(
        account => account.provider === 'google',
      )
      const githubAccount = accounts.find(
        account => account.provider === 'github',
      )

      return { googleAccount, githubAccount }
    } catch (error) {
      console.error('Error fetching accounts:', error)
      throw new Error('Failed to fetch accounts')
    }
  }),
  getPasskeys: protectedProcedure.query(async ({ ctx }) => {
    const passkeys = await auth.api.listPasskeys({
      headers: ctx.headers,
    })

    return passkeys
  }),
  getSessions: protectedProcedure.query(async ({ ctx }) => {
    const sessions = await auth.api.listSessions({
      headers: ctx.headers,
    })

    const parsedSessions = sessions
      .map(session => ({
        ...parseSession(session.userAgent!),
        expiresAt: new Date(session.expiresAt),
        ipAddress: session.ipAddress,
        id: session.id,
        isCurrent: session.id === ctx.session.session.id,
        token: session.token,
      }))
      .sort((a, b) => {
        if (a.isCurrent) return -1
        if (b.isCurrent) return 1
        return a.expiresAt.getTime() - b.expiresAt.getTime()
      })
      .map(session => ({
        ...session,
        expiresAt: session.expiresAt.toLocaleString(),
      }))

    return parsedSessions
  }),
})
