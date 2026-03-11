import { Locales } from 'intlayer'
import type { IntlayerConfig } from 'intlayer'

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.FRENCH,
      Locales.SPANISH,
      Locales.GERMAN,
      Locales.PORTUGUESE,
    ],
    defaultLocale: Locales.ENGLISH,
  },
}

export default config
