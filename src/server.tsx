import {
	createStartHandler,
	defaultStreamHandler,
	getWebRequest,
} from '@tanstack/react-start/server'
import { overwriteGetLocale } from './paraglide/runtime'
import { paraglideMiddleware } from './paraglide/server'
import { createRouter } from './router'

export default createStartHandler({
	createRouter,
})((event) =>
	paraglideMiddleware(getWebRequest(), ({ locale }) => {
		overwriteGetLocale(() => locale)
		return defaultStreamHandler(event)
	}),
)
