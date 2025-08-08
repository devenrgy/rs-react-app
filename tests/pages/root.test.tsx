import { QueryClient } from '@tanstack/react-query'
import { screen } from '@testing-library/react'
import { createElement } from 'react'
import { createRoutesStub } from 'react-router'
import { mockPhoto } from 'tests/mocks/api/data'
import { render } from 'tests/mocks/providers'

import { PhotoDetails } from '@/components/photo-details'
import { Spinner } from '@/components/spinner'
import { DEFAULT_PAGE, DEFAULT_QUERY } from '@/configs/constants'
import { HomeLayout } from '@/layouts/home-layout'
import { loader as homeLoader } from '@/pages/home'
import { Root } from '@/pages/root'

describe('Root', () => {
	it('should render Root page content correctly', async () => {
		const RootStub = createRoutesStub([
			{
				Component: Root,
				children: [
					{
						path: '/',
						id: 'home',
						loader: () => ({
							query: DEFAULT_QUERY,
							page: DEFAULT_PAGE
						}),
						Component: HomeLayout,
						hydrateFallbackElement: createElement(Spinner),
						children: [
							{
								path: '/:id',
								loader: () => ({ id: 100 }),
								Component: PhotoDetails
							}
						]
					}
				]
			}
		])

		render(<RootStub initialEntries={['/100']} />)

		const header = await screen.findByRole('banner')
		const heading1 = await screen.findByRole('heading', { name: DEFAULT_QUERY })
		const heading2 = await screen.findByRole('heading', { level: 2, name: mockPhoto.alt_description })

		expect(header).toBeInTheDocument()
		expect(heading1).toBeInTheDocument()
		expect(heading2).toBeInTheDocument()
	})

	it('should render Root page content correctly with searchInput value', async () => {
		const queryClient = new QueryClient()

		const RootStub = createRoutesStub([
			{
				Component: Root,
				children: [
					{
						path: '/',
						id: 'home',
						loader: homeLoader(queryClient),
						Component: HomeLayout,
						hydrateFallbackElement: createElement(Spinner),
						children: [
							{
								path: '/:id',
								loader: () => ({}),
								Component: PhotoDetails
							}
						]
					}
				]
			}
		])

		const { user } = render(<RootStub initialEntries={['/']} />)

		const searchInput = await screen.findByRole('textbox', { name: /search/i })

		await user.type(searchInput, 'Dog')
		await user.keyboard('{Enter}')

		const heading = await screen.findByRole('heading', { name: /dog/i })

		expect(heading).toHaveTextContent(/dog/i)
	})
})
