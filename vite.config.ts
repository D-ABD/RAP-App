// vite.config.ts
import { defineConfig } from 'vitest/config'
import type { UserConfig } from 'vite'
import type { InlineConfig } from 'vitest'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/setupTests.ts'], // optionnel
  }
} as UserConfig & { test: InlineConfig })