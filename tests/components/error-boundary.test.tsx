import { render, screen } from '@testing-library/react'

import { ErrorBoundary } from '@/components/error-boundary'

import { setup } from '../vitest.setup.ts'

describe('ErrorBoundary', () => {
	const ProblemChild = () => {
		throw new Error('Test error')
	}
	const GoodChild = () => <div data-testid='good-child'>Good Child</div>
	const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

	it('should render children when no error occurs', () => {
		render(
			<ErrorBoundary>
				<GoodChild />
			</ErrorBoundary>
		)

		expect(screen.getByTestId('good-child')).toBeInTheDocument()
	})

	it('should render ErrorFallback when an error is caught', () => {
		render(
			<ErrorBoundary>
				<ProblemChild />
			</ErrorBoundary>
		)

		expect(screen.getByRole('heading', { name: /something went wrong/i, level: 1 })).toBeInTheDocument()
		expect(screen.getByRole('button', { name: /try again/i })).toBeInTheDocument()
		expect(consoleErrorSpy).toBeCalled()
	})

	it('should reset error state when handleResetError is called', async () => {
		const { user, rerender } = setup(
			<ErrorBoundary>
				<ProblemChild />
			</ErrorBoundary>
		)

		expect(screen.getByRole('heading', { name: /something went wrong/i, level: 1 })).toBeInTheDocument()

		const resetButton = screen.getByRole('button', { name: /try again/i })

		await user.click(resetButton)

		rerender(
			<ErrorBoundary key='reset'>
				<GoodChild />
			</ErrorBoundary>
		)

		expect(screen.getByTestId('good-child')).toBeInTheDocument()
	})

	it('should call getDerivedStateFromError when an error occurs', () => {
		const getDerivedStateFromErrorSpy = vi.spyOn(ErrorBoundary, 'getDerivedStateFromError')

		render(
			<ErrorBoundary>
				<ProblemChild />
			</ErrorBoundary>
		)

		expect(getDerivedStateFromErrorSpy).toHaveBeenCalled()
		expect(getDerivedStateFromErrorSpy).toHaveReturnedWith({ hasError: true })
	})
})
