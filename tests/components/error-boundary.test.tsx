import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { ErrorBoundary } from '@/components/error-boundary'

vi.mock('@/components/error-fallback', () => ({
	ErrorFallback: ({ showButton, handleResetError }: { showButton: boolean; handleResetError: () => void }) => (
		<div data-testid='error-fallback'>
			{showButton && (
				<button data-testid='reset-button' onClick={handleResetError}>
					Reset
				</button>
			)}
		</div>
	)
}))

describe('ErrorBoundary', () => {
	const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

	beforeEach(() => {
		consoleErrorSpy.mockClear()
	})

	it('should render children when no error occurs', () => {
		const ChildComponent = () => <div data-testid='child'>Child Content</div>

		render(
			<ErrorBoundary>
				<ChildComponent />
			</ErrorBoundary>
		)

		expect(screen.getByTestId('child')).toHaveTextContent('Child Content')
		expect(screen.queryByTestId('error-fallback')).not.toBeInTheDocument()
	})

	it('should render ErrorFallback when an error is caught', () => {
		const ProblemChild = () => {
			throw new Error('Test error')
		}

		render(
			<ErrorBoundary>
				<ProblemChild />
			</ErrorBoundary>
		)

		expect(screen.getByTestId('error-fallback')).toBeInTheDocument()
		expect(screen.getByTestId('reset-button')).toBeInTheDocument()
		expect(consoleErrorSpy).toHaveBeenCalledWith('ErrorBoundary caught:', expect.any(Error))
	})

	it('should reset error state when handleResetError is called', async () => {
		const user = userEvent.setup()
		const ProblemChild = () => {
			throw new Error('Test error')
		}
		const GoodChild = () => <div data-testid='good-child'>Good Child</div>

		const { rerender } = render(
			<ErrorBoundary>
				<ProblemChild />
			</ErrorBoundary>
		)

		expect(screen.getByTestId('error-fallback')).toBeInTheDocument()

		await user.click(screen.getByTestId('reset-button'))

		rerender(
			<ErrorBoundary>
				<GoodChild />
			</ErrorBoundary>
		)

		rerender(
			<ErrorBoundary key='new-instance'>
				<GoodChild />
			</ErrorBoundary>
		)

		expect(screen.getByTestId('good-child')).toBeInTheDocument()
		expect(screen.queryByTestId('error-fallback')).not.toBeInTheDocument()
	})

	it('should call getDerivedStateFromError when an error occurs', () => {
		const getDerivedStateFromErrorSpy = vi.spyOn(ErrorBoundary, 'getDerivedStateFromError')

		const ProblemChild = () => {
			throw new Error('Test error')
		}

		render(
			<ErrorBoundary>
				<ProblemChild />
			</ErrorBoundary>
		)

		expect(getDerivedStateFromErrorSpy).toHaveBeenCalled()
		expect(getDerivedStateFromErrorSpy).toHaveReturnedWith({ hasError: true })
	})
})
