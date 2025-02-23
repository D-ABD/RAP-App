// vitest.config.ts
/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true, // Permet d'utiliser les API globales de Vitest
    environment: 'jsdom', // Utilise jsdom pour simuler un environnement DOM
    setupFiles: './src/setupTests.ts', // Fichier de configuration des tests
  },
});