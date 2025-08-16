import { useFavoritePhotos, useFavoritesActions } from '../model'

export const useFavorites = () => {
	const favoritesPhotos = useFavoritePhotos()
	const { clearAll, toggleFavorite } = useFavoritesActions()

	return { favoritesPhotos, clearAll, toggleFavorite }
}
