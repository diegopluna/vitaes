import { protectedProcedure, publicProcedure } from '../index'
import type { RouterClient } from '@orpc/server'

export const appRouter = {
  healthCheck: publicProcedure.handler(() => {
    return 'OK'
  }),
  privateData: protectedProcedure.handler(({ context }) => {
    return {
      message: 'This is private',
      user: context.session?.user,
    }
  }),
  helloWorld: publicProcedure.handler(() => {
    return 'Hello World'
  }),
}
export type AppRouter = typeof appRouter
export type AppRouterClient = RouterClient<typeof appRouter>
