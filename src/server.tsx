import * as Sentry from '@sentry/tanstackstart-react'
import {
	createStartHandler,
	defaultStreamHandler,
} from '@tanstack/react-start/server'
import { createRouter } from './router'

Sentry.init({
	dsn: 'https://88fe1b15922b48e03cf8f74144e817f3@o4508814275051520.ingest.us.sentry.io/4509947807596544',
	// Adds request headers and IP for users, for more info visit:
	// https://docs.sentry.io/platforms/javascript/guides/tanstackstart-react/configuration/options/#sendDefaultPii
	sendDefaultPii: true,
})

export default createStartHandler({
	createRouter,
})(Sentry.wrapStreamHandlerWithSentry(defaultStreamHandler))
