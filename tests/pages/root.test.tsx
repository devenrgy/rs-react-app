import { screen } from '@testing-library/react'
import { createElement } from 'react'
import { createRoutesStub } from 'react-router'
import { mockPhoto } from 'tests/mocks/api/data'
import { render } from 'tests/mocks/providers'

import { PhotoDetails } from '@/components/photo-details'
import { Spinner } from '@/components/spinner'
import { DEFAULT_PAGE, DEFAULT_QUERY } from '@/configs/constants'
import { HomeLayout } from '@/layouts/home-layout'
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

		screen.debug()

		expect(header).toBeInTheDocument()
		expect(heading1).toBeInTheDocument()
		expect(heading2).toBeInTheDocument()
	})
})
