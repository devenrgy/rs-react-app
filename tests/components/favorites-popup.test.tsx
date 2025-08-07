import { render, screen } from '@testing-library/react'

import { FavoritesPopup } from '@/components/favorites-popup'

describe('FavoritesPopup', () => {
	it('should render FavoritesPopup correctly', () => {
		const altDescription1 = 'Mountain'
		const altDescription2 = 'Lake'

		render(
			<FavoritesPopup
				items={[
					{ id: 'mountain', alt_description: altDescription1, isFavorite: true },
					{ id: 'lake', alt_description: altDescription2, isFavorite: true }
				]}
				handleDownload={vi.fn()}
				handleClearAll={vi.fn()}
			/>
		)

		expect(screen.getAllByRole('listitem')).toHaveLength(2)
		expect(screen.getByText(/items are/i)).toBeInTheDocument()
		expect(screen.getByRole('button', { name: /clear all/i })).toBeInTheDocument()
		expect(screen.getByText(/download/i)).toBeInTheDocument()
	})

	it('should render FavoritesPopup correctly with one item', () => {
		const altDescription1 = 'Mountain'

		render(
			<FavoritesPopup
				items={[{ id: 'mountain', alt_description: altDescription1, isFavorite: true }]}
				handleDownload={vi.fn()}
				handleClearAll={vi.fn()}
			/>
		)

		expect(screen.getByText(/item is/i)).toBeInTheDocument()
	})
})
