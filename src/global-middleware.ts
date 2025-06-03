import { registerGlobalMiddleware } from '@tanstack/react-start'
import { localeMiddleware } from './lib/locale-middleware'

registerGlobalMiddleware({
	middleware: [localeMiddleware],
})
