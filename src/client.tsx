import { StartClient } from '@tanstack/react-start'
import { hydrateRoot } from 'react-dom/client'

import { readLanguageFromHtmlLangAttribute } from './lib/i18n'
import { setLocale } from './paraglide/runtime'
import { createRouter } from './router'

const router = createRouter()

setLocale(readLanguageFromHtmlLangAttribute())

hydrateRoot(document, <StartClient router={router} />)
