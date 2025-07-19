import type { Photo } from '@/types'

export const mockPhoto: Photo = {
	id: '1',
	urls: {
		regular: 'https://www.test.com/some-beatiful-image.png'
	},
	width: 100,
	height: 100,
	alt_description: 'Beatiful Photo'
}

export const mockPhotos: Photo[] = [
	{
		id: '1',
		urls: {
			regular: 'https://www.test.com/some-beatiful-image.png'
		},
		width: 100,
		height: 100,
		alt_description: 'Beatiful Photo'
	},
	{
		id: '2',
		urls: {
			regular: 'https://www.test.com/some-another-image.png'
		},
		width: 50,
		height: 50,
		alt_description: 'Another Photo'
	}
]
