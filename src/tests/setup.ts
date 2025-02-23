// src/tests/setup.ts
import '@testing-library/jest-dom'
import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'

// Configure les tests pour nettoyer après chaque test
afterEach(() => {
  cleanup()
})