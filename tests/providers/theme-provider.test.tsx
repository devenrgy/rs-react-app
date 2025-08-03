import { render, screen } from '@testing-library/react'
import { setup } from 'tests/vitest.setup'
import { describe, expect, it, vi } from 'vitest'

import * as useLS from '@/lib/hooks/use-ls'
import { ThemeProvider, useTheme } from '@/providers/theme-provider'

const mockMatchMedia = vi.fn().mockImplementation(query => ({
	matches: query === '(prefers-color-scheme: dark)',
	addEventListener: vi.fn(),
	removeEventListener: vi.fn()
}))

vi.stubGlobal('matchMedia', mockMatchMedia)

describe('ThemeProvider', () => {
	const matchMedia = {
		onchange: vi.fn(),
		addListener: vi.fn(),
		removeListener: vi.fn(),
		media: '',
		dispatchEvent: vi.fn(),
		addEventListener: vi.fn(),
		removeEventListener: vi.fn()
	}

	beforeAll(() => {
		Object.defineProperty(global.document, 'startViewTransition', {
			value: vi.fn().mockImplementation(callback => callback())
		})
	})

	vi.spyOn(window, 'matchMedia').mockImplementation(query => ({
		...matchMedia,
		matches: query === '(prefers-color-scheme: light)'
	}))

	const useLSMock = vi.spyOn(useLS, 'useLS').mockImplementation(() => ['dark', vi.fn(), vi.fn()])

	const TestComponent = () => {
		const { theme, handleUpdateTheme } = useTheme()

		return (
			<div>
				<span data-testid='theme'>{theme}</span>
				<button onClick={handleUpdateTheme}>Toggle Theme</button>
			</div>
		)
	}

	it('renders children with default dark theme', () => {
		render(
			<ThemeProvider>
				<div>Test Content</div>
			</ThemeProvider>
		)
		expect(screen.getByText('Test Content')).toBeInTheDocument()
		expect(screen.getByText('Test Content').parentElement).toHaveClass('dark')
	})

	it('provides theme context via useTheme', () => {
		render(
			<ThemeProvider>
				<TestComponent />
			</ThemeProvider>
		)
		expect(screen.getByTestId('theme')).toHaveTextContent('dark')
	})

	it('toggles theme when handleUpdateTheme is called', async () => {
		const mockSetTheme = vi.fn()
		useLSMock.mockReturnValueOnce(['dark', mockSetTheme, vi.fn()])

		const { user } = setup(
			<ThemeProvider>
				<TestComponent />
			</ThemeProvider>
		)

		const toggleButton = screen.getByText('Toggle Theme')
		await user.click(toggleButton)

		expect(mockSetTheme).toHaveBeenCalledWith('light')
	})

	it('applies custom storage key', () => {
		const customStorageKey = 'custom-theme-key'

		render(
			<ThemeProvider storageKey={customStorageKey}>
				<TestComponent />
			</ThemeProvider>
		)

		expect(useLSMock).toHaveBeenCalledWith(customStorageKey, 'light')
	})
})
