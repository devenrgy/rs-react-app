import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { ReactNode } from 'react'
import { BrowserRouter } from 'react-router'
import { mockPhoto, mockPhoto2 } from 'tests/mocks/api/data'

import { PhotoList } from '@/components/photo-list'
import type { Photo } from '@/types'

vi.mock('@/components/photo-card', () => ({
	PhotoCard: ({ data }: { data: Photo }) => (
		<div data-testid={`photo-card-${data.id}`}>PhotoCard: {data.alt_description}</div>
	)
}))

vi.mock('@/lib/utils/helpers', () => ({
	hasItems: (array: Photo[]) => array && array.length > 0
}))

export const setupWithRouter = (ui: ReactNode, { route = '/' } = {}) => {
	window.history.pushState({}, 'Test page', route)
	return {
		user: userEvent.setup(),
		...render(ui, { wrapper: BrowserRouter })
	}
}

describe('PhotoList', () => {
	it('should not render when items is empty', () => {
		const { container } = setupWithRouter(<PhotoList items={[]} />)

		expect(screen.queryByRole('list')).not.toBeInTheDocument()
		expect(screen.queryByTestId(/photo-card-/)).not.toBeInTheDocument()
		expect(container).toMatchSnapshot()
	})

	it('should not render when items is undefined', () => {
		const { container } = setupWithRouter(<PhotoList />)

		expect(screen.queryByRole('list')).not.toBeInTheDocument()
		expect(screen.queryByTestId(/photo-card-/)).not.toBeInTheDocument()
		expect(container).toMatchSnapshot()
	})

	it('should render list of photo cards when items are provided', () => {
		const items = [mockPhoto, mockPhoto2]
		const { container } = setupWithRouter(<PhotoList items={items} />)

		expect(screen.getByRole('list')).toBeInTheDocument()
		expect(screen.getByTestId('photo-card-photo_789')).toHaveTextContent('PhotoCard: mountain landscape at sunset')
		expect(screen.getByTestId('photo-card-photo_456')).toHaveTextContent('PhotoCard: ocean waves on rocky shore')
		expect(container).toMatchSnapshot()
	})
})
