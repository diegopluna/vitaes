import {
	createStartAPIHandler,
	defaultAPIFileRouteHandler,
} from '@tanstack/react-start/api'
import { paraglideMiddleware } from './paraglide/server'

// export default createStartAPIHandler((ctx) =>
// 	paraglideMiddleware(ctx.request, () => defaultAPIFileRouteHandler(ctx)),
// )

export default createStartAPIHandler((ctx) => {
	// Skip paraglide middleware for API routes to prevent locale being appended
	const url = new URL(ctx.request.url)
	const isAPIRoute =
		url.pathname.startsWith('/api/auth') || url.pathname.startsWith('/api/pdf')

	if (isAPIRoute) {
		return defaultAPIFileRouteHandler(ctx)
	}

	return paraglideMiddleware(ctx.request, () => defaultAPIFileRouteHandler(ctx))
})
