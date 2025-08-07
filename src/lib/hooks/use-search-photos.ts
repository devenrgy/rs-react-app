import { useSuspenseQuery } from '@tanstack/react-query'

import { searchPhotosQuery } from '../api/requests/get-search-photos'
import { useFavoritePhotos, useFavoritesActions } from '../stores/favorites-store'
import { usePagination } from './use-pagination'

export const useSearchPhotos = ({ query, page }: { query: string; page: number }) => {
	const { data } = useSuspenseQuery(searchPhotosQuery(query, page))
	const { toggleFavorite } = useFavoritesActions()
	const favoritePhotos = useFavoritePhotos()
	const pagination = usePagination({
		currentPage: page,
		totalCount: data.total_pages
	})
	return {
		data,
		toggleFavorite,
		favoritePhotos,
		pagination
	}
}
