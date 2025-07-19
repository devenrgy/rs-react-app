import { render, within } from '@testing-library/react'
import { mockPhoto } from 'tests/mocks/api/data'

import { PhotoCard } from '@/components/photo-card'

describe('PhotoCard', () => {
	it('should render PhotoCard', () => {
		const { container } = render(<PhotoCard data={mockPhoto} />)

		const img = within(container).getByRole('img')
		const paragraph = within(container).getByRole('paragraph')

		expect(container.firstChild).toMatchSnapshot()
		expect(img).toHaveAttribute('src', mockPhoto.urls.regular)
		expect(img).toHaveAttribute('width', mockPhoto.width.toString())
		expect(img).toHaveAttribute('height', mockPhoto.height.toString())
		expect(img).toHaveAttribute('alt', mockPhoto.alt_description)
		expect(paragraph).toHaveTextContent(mockPhoto.alt_description)
	})
})
