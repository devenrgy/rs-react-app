import { screen } from '@testing-library/react'
import { createRoutesStub } from 'react-router'
import { render } from 'tests/mocks/providers'

import { ErrorFallback } from '@/components/error-fallback'

describe('ErrorFallback', () => {
	const TestComponent = () => {
		return <div data-testid='test'>Test</div>
	}

	it('should render ErrorFallback correctly with Error', async () => {
		const ErrorFallbackStub = createRoutesStub([
			{
				path: '/',
				Component: TestComponent,
				ErrorBoundary: ErrorFallback,
				loader: () => {
					throw new Error('Test error')
				}
			}
		])

		render(<ErrorFallbackStub initialEntries={['/']} />)

		const errorMessage = await screen.findByText(/test error/i)

		expect(errorMessage).toBeInTheDocument()
	})

	it('should render ErrorFallback correctly with string error', async () => {
		const ErrorFallbackStub = createRoutesStub([
			{
				path: '/',
				Component: TestComponent,
				ErrorBoundary: ErrorFallback,
				loader: () => {
					throw 'test error'
				}
			}
		])

		render(<ErrorFallbackStub initialEntries={['/']} />)

		const errorMessage = await screen.findByText(/test error/i)

		expect(errorMessage).toBeInTheDocument()
	})

	it('should render ErrorFallback correctly with Response error', async () => {
		const ErrorFallbackStub = createRoutesStub([
			{
				path: '/',
				Component: TestComponent,
				ErrorBoundary: ErrorFallback,
				loader: () => {
					throw new Response(null, { status: 500, statusText: 'test error' })
				}
			}
		])

		render(<ErrorFallbackStub initialEntries={['/']} />)

		const errorMessage = await screen.findByText(/test error/i)

		expect(errorMessage).toBeInTheDocument()
	})

	it('should render ErrorFallback correctly with unknown error', async () => {
		const ErrorFallbackStub = createRoutesStub([
			{
				path: '/',
				Component: TestComponent,
				ErrorBoundary: ErrorFallback,
				loader: () => {
					throw {}
				}
			}
		])

		render(<ErrorFallbackStub initialEntries={['/']} />)

		const errorMessage = await screen.findByText(/unknown error/i)

		expect(errorMessage).toBeInTheDocument()
	})
})
