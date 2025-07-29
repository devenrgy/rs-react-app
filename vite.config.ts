/// <reference types="vitest/config" />
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
	plugins: [react(), tailwindcss(), tsconfigPaths()],
	test: {
		// reporters: ['default', 'html'],
		coverage: {
			enabled: true,
			include: ['src/**/*.{ts,tsx}'],
			exclude: ['src/index.{ts,tsx}', 'src/**/*.d.ts', 'src/main.tsx', 'src/configs/**'],
			thresholds: {
				statements: 80,
				branches: 50,
				functions: 50,
				lines: 50
			}
		},
		clearMocks: true,
		globals: true,
		setupFiles: ['tests/vitest.setup.ts'],
		environment: 'happy-dom',
		css: true
	}
})
