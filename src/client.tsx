import { StartClient } from '@tanstack/react-start'
import { hydrateRoot } from 'react-dom/client'
import { createRouter } from './router'

import * as Sentry from '@sentry/tanstackstart-react'

const router = createRouter()

Sentry.init({
	dsn: 'https://88fe1b15922b48e03cf8f74144e817f3@o4508814275051520.ingest.us.sentry.io/4509947807596544',
	// Adds request headers and IP for users, for more info visit:
	// https://docs.sentry.io/platforms/javascript/guides/tanstackstart-react/configuration/options/#sendDefaultPii
	sendDefaultPii: true,
	integrations: [],
})

hydrateRoot(document, <StartClient router={router} />)
