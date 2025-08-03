import { render, screen } from '@testing-library/react'
import { setup } from 'tests/vitest.setup'
import { describe, expect, it, vi } from 'vitest'

import { FavoritesPopup } from '@/components/favorites-popup'
import type { FavoritePhoto } from '@/types'

describe('FavoritesPopup', () => {
	const mockHandleClearAll = vi.fn()
	const mockHandleDownload = vi.fn()

	const defaultProps = {
		items: [
			{ id: '1', alt_description: 'Photo 1 description', isFavorite: true },
			{ id: '2', alt_description: 'Photo 2 description', isFavorite: true }
		] as FavoritePhoto[],
		handleClearAll: mockHandleClearAll,
		handleDownload: mockHandleDownload
	}

	it('renders correctly', () => {
		const { container } = render(<FavoritesPopup {...defaultProps} />)
		expect(container.firstChild).toMatchSnapshot()
	})

	it('renders without crashing', () => {
		render(<FavoritesPopup {...defaultProps} />)
		expect(screen.getByText(/2 items are selected/i)).toBeInTheDocument()
	})

	it('displays correct number of items', () => {
		render(<FavoritesPopup {...defaultProps} />)
		expect(screen.getAllByRole('listitem')).toHaveLength(2)
		expect(screen.getByText('Photo 1 description')).toBeInTheDocument()
		expect(screen.getByText('Photo 2 description')).toBeInTheDocument()
	})

	it('displays singular item text when only one item is present', () => {
		render(
			<FavoritesPopup
				{...defaultProps}
				items={[{ id: '1', alt_description: 'Photo 1 description', isFavorite: true }]}
			/>
		)
		expect(screen.getByText('1 item is selected')).toBeInTheDocument()
	})

	it('applies custom className', () => {
		const { container } = render(<FavoritesPopup {...defaultProps} className='custom-class' />)
		expect(container.firstChild).toHaveClass('custom-class')
	})

	it('calls handleClearAll when clear button is clicked', async () => {
		const { user } = setup(<FavoritesPopup {...defaultProps} />)
		const clearButton = screen.getByText('Clear All')
		await user.click(clearButton)
		expect(mockHandleClearAll).toHaveBeenCalledTimes(1)
	})

	it('calls handleDownload when download button is clicked', async () => {
		const { user } = setup(<FavoritesPopup {...defaultProps} />)
		const downloadButton = screen.getByText('Download')
		await user.click(downloadButton)
		expect(mockHandleDownload).toHaveBeenCalledTimes(1)
	})
})
