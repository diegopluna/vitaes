import { intlayer } from 'vite-intlayer'
import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import { sentryTanstackStart } from '@sentry/tanstackstart-react/vite'

import { tanstackStart } from '@tanstack/react-start/plugin/vite'

import viteReact from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const config = defineConfig({
  plugins: [
    devtools(),
    tsconfigPaths({ projects: ['./tsconfig.json'] }),
    intlayer(),
    tailwindcss(),
    tanstackStart(),
    viteReact({
      babel: {
        plugins: ['babel-plugin-react-compiler'],
      },
    }),
    sentryTanstackStart({
      org: 'dpeter',
      project: 'vitaes',
      authToken: process.env.SENTRY_AUTH_TOKEN,
    }),
  ],
  ssr: {
    noExternal: ['@convex-dev/better-auth'],
  },
})

export default config
