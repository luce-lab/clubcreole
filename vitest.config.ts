
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/setup-tests.ts'],
    coverage: {
      reporter: ['text', 'json', 'html'],
    },
  },
});
