import { auth } from '@/lib/auth'
import { createMiddleware } from '@tanstack/react-start'
import { getWebRequest } from '@tanstack/react-start/server'

export const loggingMiddleware = createMiddleware().server(
	async ({ next, data }) => {
		console.log('Request received: ', data)
		const result = await next()
		console.log('Request completed: ', result)
		return result
	},
)

export const authMiddleware = createMiddleware().server(async ({ next }) => {
	const { headers } = getWebRequest()!
	const session = await auth.api.getSession({ headers })
	if (!session?.user) {
		throw new Error('Unauthorized')
	}
	return next({
		context: {
			user: session.user,
		},
	})
})
