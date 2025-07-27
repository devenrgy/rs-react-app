import { render, screen } from '@testing-library/react'
import { setup } from 'tests/vitest.setup'
import { describe, expect, it, vi } from 'vitest'

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

	it('should render button when showButton is true', () => {
		const { container } = render(<ErrorFallback showButton={true} />)

		expect(screen.getByRole('button', { name: /try again/i })).toBeInTheDocument()
		expect(container).toMatchSnapshot()
	})

	it('should not render button when showButton is false', () => {
		const { container } = render(<ErrorFallback showButton={false} />)

		expect(screen.queryByRole('button')).not.toBeInTheDocument()
		expect(container).toMatchSnapshot()
	})

	it('should call handleResetError when button is clicked', async () => {
		const handleResetError = vi.fn()
		const { user, container } = setup(<ErrorFallback showButton={true} handleResetError={handleResetError} />)

		const button = screen.getByRole('button', { name: /try again/i })
		await user.click(button)

		expect(handleResetError).toHaveBeenCalledTimes(1)
		expect(container).toMatchSnapshot()
	})
})
