import { paraglideVitePlugin } from '@inlang/paraglide-js'
import { defineConfig } from 'vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import viteTsConfigPaths from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite'

const config = defineConfig({
  plugins: [
    // this is the plugin that enables path aliases
    viteTsConfigPaths({
      projects: ['./tsconfig.json'],
    }),
    paraglideVitePlugin({ 
      project: './project.inlang', 
      outdir: './src/paraglide', 
      outputStructure: "message-modules", 
      cookieName: "PARAGLIDE_LOCALE", 
      strategy: ["url", "cookie", "preferredLanguage", "baseLocale"],
      urlPatterns: [
        {
          pattern: "/:path(.*)?",
          localized: [
            ["en", "/en/:path(.*)?"],
            ["de", "/de/:path(.*)?"],
          ],
        },
      ],
    }),
    tailwindcss(),
    tanstackStart({
      customViteReactPlugin: true,
    }),
    viteReact(),
  ],
  server: {
    proxy: {
      '/js/script.js': {
        target: "https://plausible.dpeter.dev/js/script.file-downloads.hash.outbound-links.js",
        changeOrigin: true
      }
    }
  }
})

export default config
