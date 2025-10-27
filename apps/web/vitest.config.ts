import { defineConfig } from 'vitest/config'
import { sharedConfig } from '@vitaes/vitest-config'

export default defineConfig({
  ...sharedConfig,
  test: {
    ...sharedConfig.test,
    root: './src',
  },
})
