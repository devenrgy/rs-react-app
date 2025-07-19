import { render, within } from '@testing-library/react'
import { mockPhotos } from 'tests/mocks/api/data'

import { PhotoList } from '@/components/photo-list'

describe('PhotoList', () => {
	it('should render PhotoList if have items', () => {
		const { container } = render(<PhotoList items={mockPhotos} />)

		const imgs = within(container).getAllByRole('img')
		const paragraphs = within(container).getAllByRole('paragraph')

		expect(container.firstChild).toMatchSnapshot()
		expect(imgs).toHaveLength(2)
		expect(paragraphs).toHaveLength(2)
	})

	it('should render PhotoList if not have items', () => {
		const { container } = render(<PhotoList />)

		expect(container).toBeEmptyDOMElement()
	})
})
