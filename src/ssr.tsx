import { getRouterManifest } from '@tanstack/react-start/router-manifest'
import {
	createStartHandler,
	defaultStreamHandler,
	defineEventHandler,
	getWebRequest,
} from '@tanstack/react-start/server'

import { paraglideMiddleware } from './paraglide/server'
import { createRouter } from './router'

const streamHandler = defaultStreamHandler

export default defineEventHandler((event) =>
	paraglideMiddleware(getWebRequest(event) as Request, async () =>
		createStartHandler({
			createRouter: () => createRouter(event.path),
			getRouterManifest,
		})(streamHandler)(event),
	),
)

// export default createStartHandler({
// 	createRouter,
// 	getRouterManifest,
// })(streamHandler)
