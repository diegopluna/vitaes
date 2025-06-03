import { defineConfig } from '@tanstack/react-start/config'
import { paraglideVitePlugin as paraglide } from '@inlang/paraglide-js'
import viteTsConfigPaths from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite'

const config = defineConfig({
  tsr: {
    appDirectory: 'src',
  },
  vite: {
    plugins: [
      // this is the plugin that enables path aliases
      viteTsConfigPaths({
        projects: ['./tsconfig.json'],
      }),
      paraglide({
        project: './project.inlang',
        outdir: './src/paraglide',
        outputStructure: 'message-modules',
        cookieName: "PARAGLIDE_LOCALE",
        strategy: ['cookie', 'url', 'preferredLanguage', 'baseLocale']
      }),
      tailwindcss(),
    ],
  },
  server: {
    preset: 'vercel',
    routeRules: {
      '/js/script.js': {
        proxy: {
          to: 'https://datafa.st/js/script.js',
        }
      },
      '/api/events': {
        proxy: {
          to: 'https://datafa.st/api/events',
        }
      },
      '/prx/ph/**': {
        proxy: {
          to: 'https://us.i.posthog.com/**',
        }
      }
    }
  }
})

export default config
