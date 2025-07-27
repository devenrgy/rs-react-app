import { screen } from '@testing-library/react'
import { mockPhoto } from 'tests/mocks/api/data'
import { setupWithRouter } from 'tests/vitest.setup'

import { PhotoDetails } from '@/components/photo-details'

describe('PhotoDetails', () => {
	vi.mock('react-router', async () => {
		const actual = await vi.importActual('react-router')
		return {
			...actual,
			useLocation: () => ({
				search: '?page=1'
			}),
			useLoaderData: () => mockPhoto
		}
	})

	it('renders photo image and details correctly', () => {
		setupWithRouter(<PhotoDetails />)

		const image = screen.getByAltText('mountain landscape at sunset')
		expect(image).toHaveAttribute('src', mockPhoto.urls.regular)
		expect(image).toHaveAttribute('width', '1920')
		expect(image).toHaveAttribute('height', '1080')

		expect(screen.getByText('mountain landscape at sunset')).toBeInTheDocument()
		expect(screen.getByText('A stunning mountain landscape at sunset')).toBeInTheDocument()
	})

	it('renders photo details correctly', () => {
		setupWithRouter(<PhotoDetails />)

		expect(screen.getByText('Details')).toBeInTheDocument()
		expect(screen.getByText('Likes: 150')).toBeInTheDocument()
		expect(screen.getByText('Dimensions: 1920 x 1080')).toBeInTheDocument()
		expect(screen.getByText('Created: 2/1/2025')).toBeInTheDocument()
		expect(screen.getByText('Updated: 7/1/2025')).toBeInTheDocument()
	})

	it('renders external links correctly', () => {
		setupWithRouter(<PhotoDetails />)

		const unsplashLink = screen.getByText('View on Unsplash')
		expect(unsplashLink).toHaveAttribute('href', mockPhoto.links.html)
		expect(unsplashLink).toHaveAttribute('target', '_blank')
		expect(unsplashLink).toHaveAttribute('rel', 'noopener noreferrer')

		const downloadLink = screen.getByText('Download')
		expect(downloadLink).toHaveAttribute('href', mockPhoto.links.download)
		expect(downloadLink).toHaveAttribute('target', '_blank')
		expect(downloadLink).toHaveAttribute('rel', 'noopener noreferrer')
	})
})
