import { render, screen } from '@testing-library/react'
import { setup } from 'tests/vitest.setup'

import { ErrorFallback } from '@/components/error-fallback'

describe('ErrorFallback', () => {
	it('should render default error message', () => {
		const { container } = render(<ErrorFallback />)

		expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Something went wrong!')
		expect(screen.queryByText(/custom message/i)).not.toBeInTheDocument()
		expect(screen.queryByRole('button')).not.toBeInTheDocument()
		expect(container).toMatchSnapshot()
	})

	it('should render custom message when provided', () => {
		const customMessage = 'Custom error message'
		const { container } = render(<ErrorFallback message={customMessage} />)

		expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Something went wrong!')
		expect(screen.getByText(customMessage)).toBeInTheDocument()
		expect(screen.queryByRole('button')).not.toBeInTheDocument()
		expect(container).toMatchSnapshot()
	})

	it('should render button when showRetryButton is true', () => {
		const { container } = render(<ErrorFallback showRetryButton={true} />)

		expect(screen.getByRole('button', { name: /try again/i })).toBeInTheDocument()
		expect(container).toMatchSnapshot()
	})

	it('should not render button when showRetryButton is false', () => {
		const { container } = render(<ErrorFallback showRetryButton={false} />)

		expect(screen.queryByRole('button')).not.toBeInTheDocument()
		expect(container).toMatchSnapshot()
	})

	it('should call handleResetError when button is clicked', async () => {
		const handleResetError = vi.fn()
		const { user, container } = setup(<ErrorFallback showRetryButton={true} handleResetError={handleResetError} />)

		const button = screen.getByRole('button', { name: /try again/i })
		await user.click(button)

		expect(handleResetError).toHaveBeenCalledTimes(1)
		expect(container).toMatchSnapshot()
	})
})
