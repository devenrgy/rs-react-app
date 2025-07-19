import { within } from '@testing-library/react'

import { App } from '@/app'

import { mockPhotos } from './mocks/api/data'
import { mockContext, renderWithContextProvider } from './mocks/custom-renders'

describe('App', () => {
	it('should loader visible', () => {
		const { container } = renderWithContextProvider(<App />, {
			props: {
				...mockContext,
				isLoading: true
			}
		})

		const button = within(container).getByRole('button', { name: /cancel/i })

		expect(button).toBeInTheDocument()
	})

	it('should nothing found', () => {
		const { container } = renderWithContextProvider(<App />, {
			props: {
				...mockContext,
				items: [],
				isLoading: false
			}
		})

		const paragraph = within(container).getByText(/nothing found/i)
		const retryButton = within(container).getByRole('button', { name: /retry/i })

		expect(paragraph).toBeInTheDocument()
		expect(retryButton).toBeInTheDocument()
	})

	it('should page with content', () => {
		const { container } = renderWithContextProvider(<App />, {
			props: {
				...mockContext,
				isLoading: false,
				items: mockPhotos
			}
		})

		const imgs = within(container).getAllByRole('img')

		expect(imgs).toHaveLength(2)
	})

	it('should error page content visible', () => {
		const { container } = renderWithContextProvider(<App />, {
			props: {
				...mockContext,
				error: new Error('Something went wrong')
			}
		})

		const title = within(container).getByRole('heading', { name: /something went wrong/i })
		const button = within(container).getByRole('button', { name: /try again/i })

		expect(title).toBeInTheDocument()
		expect(button).toBeInTheDocument()
	})
})
