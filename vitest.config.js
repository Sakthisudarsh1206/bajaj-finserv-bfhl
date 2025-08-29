import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      exclude: ['node_modules/', 'test/', '**/*.config.js', 'express/', 'python/', 'scripts/'],
    },
    include: ['test/**/*.{test,spec}.js'],
    exclude: ['node_modules/', 'express/', 'python/'],
  },
});
