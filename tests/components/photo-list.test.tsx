import { screen } from '@testing-library/react'
import { mockPhoto, mockPhoto2 } from 'tests/mocks/api/data'

import * as PhotoCard from '@/components/photo-card.tsx'
import { PhotoList } from '@/components/photo-list'

import { setupWithRouter } from '../vitest.setup.ts'

describe('PhotoList', () => {
	vi.spyOn(PhotoCard, 'PhotoCard').mockImplementation(({ data }) => (
		<div data-testid={`photo-card-${data.id}`}>{data.alt_description}</div>
	))

	it('should render list of photo cards when items are provided', () => {
		setupWithRouter(<PhotoList items={[mockPhoto, mockPhoto2]} />)

		expect(screen.getByTestId(`photo-card-${mockPhoto.id}`)).toHaveTextContent(mockPhoto.alt_description)
		expect(screen.getByTestId(`photo-card-${mockPhoto2.id}`)).toHaveTextContent(mockPhoto2.alt_description)
	})
})
