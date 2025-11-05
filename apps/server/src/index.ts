import 'dotenv/config'
import { OpenAPIHandler } from '@orpc/openapi/fetch'
import { OpenAPIReferencePlugin } from '@orpc/openapi/plugins'
import { ZodToJsonSchemaConverter } from '@orpc/zod/zod4'
import { RPCHandler } from '@orpc/server/fetch'
import { onError } from '@orpc/server'
import { createContext } from '@vitaes/api/context'
import { appRouter } from '@vitaes/api/routers/index'
import { auth } from '@vitaes/auth'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { serve } from '@hono/node-server'

const app = new Hono()

app.use(logger())
app.use(
  '/*',
  cors({
    origin: process.env.CORS_ORIGIN || '',
    allowMethods: ['GET', 'POST', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  }),
)

app.on(['POST', 'GET'], '/api/auth/*', async (c) => auth.handler(c.req.raw))

const apiHandler = new OpenAPIHandler(appRouter, {
  plugins: [
    new OpenAPIReferencePlugin({
      schemaConverters: [new ZodToJsonSchemaConverter()],
    }),
  ],
  interceptors: [
    onError((error) => {
      console.error(error)
    }),
  ],
})

const rpcHandler = new RPCHandler(appRouter, {
  interceptors: [
    onError((error) => {
      console.error(error)
    }),
  ],
})

app.use('/*', async (c, next) => {
  const context = await createContext({ context: c })

  const rpcResult = await rpcHandler.handle(c.req.raw, {
    prefix: '/rpc',
    context: context,
  })

  if (rpcResult.matched) {
    return c.newResponse(rpcResult.response.body, rpcResult.response)
  }

  const apiResult = await apiHandler.handle(c.req.raw, {
    prefix: '/api-reference',
    context: context,
  })

  if (apiResult.matched) {
    return c.newResponse(apiResult.response.body, apiResult.response)
  }

  await next()
})

app.get('/', (c) => {
  return c.text('Vitaes Server is running 🚀')
})

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`)
  },
)
