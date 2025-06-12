import { defineConfig } from 'vite'
import { paraglideVitePlugin as paraglide } from '@inlang/paraglide-js'
import viteTsConfigPaths from 'vite-tsconfig-paths'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    viteTsConfigPaths({
      projects: ['./tsconfig.json'],
    }),
    paraglide({
      project: './project.inlang',
      outdir: './src/paraglide',
      // outputStructure: 'message-modules',
      // cookieName: "PARAGLIDE_LOCALE",
      // strategy: ['cookie', 'url', 'preferredLanguage', 'baseLocale']
    }),
    tailwindcss(),
    tanstackStart({
      target: 'vercel',
    })
  ],
  server: {
    proxy: {
      '/js/script.js': {
        target: 'https://datafa.st/js/script.js',
        changeOrigin: true,
      },
      '/api/events': {
        target: 'https://datafa.st/api/events',
        changeOrigin: true,
      },
      '/prx/ph/**': {
        target: 'https://us.i.posthog.com/**',
        changeOrigin: true,
      }
    }
  }
})