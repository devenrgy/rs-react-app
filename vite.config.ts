/// <reference types="vitest/config" />

import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
	test: {
		coverage: {
			include: ['src/**/*.{ts,tsx}'],
			exclude: ['src/**/*.test.{ts,tsx}', 'src/index.{ts,tsx}', 'src/setup-tests.ts', 'src/**/*.d.ts'],
			thresholds: {
				statements: 80,
				branches: 50,
				functions: 50,
				lines: 50
			}
		},
		clearMocks: true,
		globals: true,
		setupFiles: ['./src/setup-tests.ts'],
		environment: 'happy-dom',
		css: true
	},
	plugins: [react(), tailwindcss(), tsconfigPaths()]
})
