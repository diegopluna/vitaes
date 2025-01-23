import { defineConfig } from 'languine'

export default defineConfig({
  version: '1.0.2',
  locale: {
    source: 'en',
    targets: ['pt', 'es', 'fr', 'de', 'zh'],
  },
  files: {
    ts: {
      include: ['locales/[locale].ts'],
    },
  },
  llm: {
    provider: 'openai',
    model: 'gpt-4-turbo',
  },
  extract: ['./app/**/*.{ts,tsx}'],
})

