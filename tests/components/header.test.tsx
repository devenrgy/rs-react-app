import { screen } from '@testing-library/react'
import { createRoutesStub } from 'react-router'
import { render } from 'tests/mocks/providers'

import { Header } from '@/components/header'

describe('Header', () => {
	it('should render Header correctly', () => {
		const HeaderStub = createRoutesStub([
			{
				path: '/',
				Component: Header
			}
		])

		render(<HeaderStub initialEntries={['/']} />)

		const header = screen.getByRole('banner')

		expect(header).toBeInTheDocument()
	})
})
