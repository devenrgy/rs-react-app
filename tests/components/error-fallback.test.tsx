import { render, screen } from '@testing-library/react'
import { setup } from 'tests/vitest.setup'

import { ErrorFallback } from '@/components/error-fallback'

describe('ErrorFallback', () => {
	it('should render default error message', () => {
		const { container } = render(<ErrorFallback />)

		expect(container.firstChild).toMatchSnapshot()
	})

	it('should render custom message when provided', () => {
		const customMessage = 'Custom error message'

		render(<ErrorFallback message={customMessage} />)

		expect(screen.getByRole('paragraph')).toHaveTextContent(customMessage)
	})

	it('should render button when showRetryButton is true', () => {
		render(<ErrorFallback showRetryButton />)

		expect(screen.getByRole('button', { name: /try again/i })).toBeInTheDocument()
	})

	it('should call handleResetError when button is clicked', async () => {
		const handleResetError = vi.fn()

		const { user } = setup(<ErrorFallback showRetryButton handleResetError={handleResetError} />)

		const button = screen.getByRole('button', { name: /try again/i })
		await user.click(button)

		expect(handleResetError).toHaveBeenCalledTimes(1)
	})
})
