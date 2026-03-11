import tsconfigPaths from 'vite-tsconfig-paths'
import { configDefaults, defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [tsconfigPaths({ projects: ['./tsconfig.json'] })],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    include: [
      'src/**/*.{test,spec}.{ts,tsx}',
      'convex/**/*.{test,spec}.{ts,tsx}',
    ],
    exclude: [
      ...configDefaults.exclude,
      'dist/**',
      '.output/**',
      '.tanstack/**',
    ],
    passWithNoTests: true,
    css: true,
  },
})
