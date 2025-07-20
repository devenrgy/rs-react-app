import { render, screen, within } from '@testing-library/react'
import { http, HttpResponse } from 'msw'

import { App } from '@/app'
import { BASE_API_URL } from '@/lib/constants'
import { Provider } from '@/provider'

import { server } from './mocks/api'
import { mockPhotos } from './mocks/api/data'
import { mockContext, renderWithContextProvider } from './mocks/custom-renders'

describe('App', () => {
	it('should spinner and card after load', async () => {
		server.use(
			http.get(
				`${BASE_API_URL}/photos`,
				() => {
					return HttpResponse.json(mockPhotos)
				},
				{ once: true }
			)
		)

		const { container } = render(
			<Provider>
				<App />
			</Provider>
		)

		const spinner = within(container).getByLabelText('spinner')
		const button = within(container).getByRole('button', { name: /cancel/i })

		expect(spinner).toBeInTheDocument()
		expect(button).toBeInTheDocument()

		const cards = await screen.findAllByRole('img')
		expect(cards).toHaveLength(2)
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

	it('should error page with 404', async () => {
		const errorMsg = 'Response status: 404'

		server.use(
			http.get(
				`${BASE_API_URL}/photos`,
				() => {
					return new HttpResponse(null, { status: 404 })
				},
				{ once: true }
			)
		)

		const { container } = render(
			<Provider>
				<App />
			</Provider>
		)

		const title = await within(container).findByRole('heading', { name: errorMsg })
		const button = await within(container).findByRole('button', { name: /try again/i })

		expect(title).toBeInTheDocument()
		expect(button).toBeInTheDocument()
	})

	it('should error page with 500', async () => {
		const errorMsg = 'Response status: 500'

		server.use(
			http.get(
				`${BASE_API_URL}/photos`,
				() => {
					return new HttpResponse(null, { status: 500, statusText: errorMsg })
				},
				{ once: true }
			)
		)

		const { container } = render(
			<Provider>
				<App />
			</Provider>
		)

		const title = await within(container).findByRole('heading', { name: errorMsg })
		const button = await within(container).findByRole('button', { name: /try again/i })

		expect(title).toBeInTheDocument()
		expect(button).toBeInTheDocument()
	})
})
