import { screen } from '@testing-library/react'
import { createRoutesStub } from 'react-router'
import { render } from 'tests/mocks/providers'

import { DEFAULT_PAGE, DEFAULT_QUERY } from '@/configs/constants'
import { HomeLayout } from '@/layouts/home-layout'

describe('Home', () => {
	it('should render Home page content correctly', async () => {
		const HomeLayoutStub = createRoutesStub([
			{
				path: '/',
				Component: HomeLayout,
				id: 'home',
				loader: () => ({ query: DEFAULT_QUERY, page: DEFAULT_PAGE })
			}
		])

		render(<HomeLayoutStub initialEntries={['/']} />)

		const photoCards = await screen.findAllByRole('listitem', { name: /photo-card/i })

		expect(screen.getByRole('heading', { name: DEFAULT_QUERY })).toBeInTheDocument()
		expect(photoCards).toHaveLength(2)
	})
})
