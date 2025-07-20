import { render, screen } from '@testing-library/react'
import { http, HttpResponse } from 'msw'
import { Component, type ContextType } from 'react'

import { BASE_API_URL } from '@/lib/constants'
import { Context, Provider } from '@/provider'
import * as LS from '@/utils/localstorage'
import * as URL from '@/utils/url'

import { server } from './mocks/api'

class Test extends Component {
	static contextType = Context
	declare context: ContextType<typeof Context>

	render() {
		const { items, isLoading, searchQuery } = this.context

		return (
			!isLoading &&
			items && (
				<div>
					<input type='text' data-testid='search' defaultValue={searchQuery} />
					<ul>
						{items.map(item => (
							<li data-testid='card' key={item.id}>
								{item.id}
							</li>
						))}
					</ul>
				</div>
			)
		)
	}
}

describe('Provider', () => {
	it('should render correctly with no search query', async () => {
		server.use(
			http.get(
				`${BASE_API_URL}/photos`,
				() => {
					return HttpResponse.json([{ id: '1' }, { id: '2' }])
				},
				{ once: true }
			)
		)

		render(
			<Provider>
				<Test />
			</Provider>
		)

		const cards = await screen.findAllByTestId('card')

		expect(cards).toHaveLength(2)
	})

	it('should render correctly with search query from localstorage', async () => {
		vi.spyOn(LS, 'getLocalStorage').mockImplementation(() => 'Cat')

		server.use(
			http.get(
				`${BASE_API_URL}/search/photos`,
				() => {
					return HttpResponse.json([{ id: '1' }, { id: '2' }])
				},
				{ once: true }
			)
		)

		render(
			<Provider>
				<Test />
			</Provider>
		)

		const cards = await screen.findAllByTestId('card')
		const searchInput = await screen.findByTestId('search')

		expect(cards).toHaveLength(2)
		expect(searchInput).toHaveValue('Cat')
	})

	it('should render correctly with search query from url', async () => {
		vi.spyOn(URL, 'getPageUrlParams').mockImplementation(() => 'Cat')

		server.use(
			http.get(
				`${BASE_API_URL}/search/photos`,
				() => {
					return HttpResponse.json([{ id: '1' }, { id: '2' }])
				},
				{ once: true }
			)
		)

		render(
			<Provider>
				<Test />
			</Provider>
		)

		const cards = await screen.findAllByTestId('card')
		const searchInput = await screen.findByTestId('search')

		expect(cards).toHaveLength(2)
		expect(searchInput).toHaveValue('Cat')
	})

	it('should timeout', async () => {
		const fn = vi.spyOn(AbortController.prototype, 'abort')

		server.use(
			http.get(
				`${BASE_API_URL}/photos`,
				() => {
					return HttpResponse.json([{ id: '1' }, { id: '2' }])
				},
				{ once: true }
			)
		)

		render(
			<Provider timeout>
				<Test />
			</Provider>
		)

		expect(fn).toBeCalledTimes(1)
	})
})
