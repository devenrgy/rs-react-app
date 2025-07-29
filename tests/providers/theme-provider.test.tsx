import { render, screen } from '@testing-library/react'
import { setup } from 'tests/vitest.setup'

import { ThemeProvider, useThemeContext } from '@/providers/theme-provider'

const TestComponent = () => {
	const { theme, toggleTheme } = useThemeContext()
	return (
		<div>
			<span data-testid='theme-value'>{theme}</span>
			<button type='button' onClick={toggleTheme}>
				Toggle Theme
			</button>
		</div>
	)
}

describe('ThemeContext', () => {
	it('should provide default light theme', () => {
		render(
			<ThemeProvider>
				<TestComponent />
			</ThemeProvider>
		)

		expect(screen.getByTestId('theme-value')).toHaveTextContent('light')
	})

	it('should toggle theme between light and dark', async () => {
		const { user } = setup(
			<ThemeProvider>
				<TestComponent />
			</ThemeProvider>
		)

		const button = screen.getByText('Toggle Theme')
		const themeDisplay = screen.getByTestId('theme-value')

		expect(themeDisplay).toHaveTextContent('light')

		await user.click(button)
		expect(themeDisplay).toHaveTextContent('dark')

		await user.click(button)
		expect(themeDisplay).toHaveTextContent('light')
	})

	it('should throw error when used outside provider', () => {
		const originalError = console.error
		console.error = vi.fn()

		expect(() => render(<TestComponent />)).toThrow('useThemeContext must be used within a ThemeProvider')

		console.error = originalError
	})

	it('should match snapshot', () => {
		const { asFragment } = render(
			<ThemeProvider>
				<div>Test Children</div>
			</ThemeProvider>
		)
		expect(asFragment()).toMatchSnapshot()
	})
})
