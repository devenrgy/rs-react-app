import { useFavoritePhotos, useFavoritesActions } from '../stores/favorites-store'
import { useDownloadFile } from './use-download-file'

export const useFavorites = () => {
	const favoritesPhotos = useFavoritePhotos()
	const { clearAll } = useFavoritesActions()
	const { downloadFile } = useDownloadFile({
		fileName: `${favoritesPhotos.length}-rs-gallery-favorites`,
		format: 'text/csv;charset=utf-8;',
		data: favoritesPhotos
	})

	return { favoritesPhotos, clearAll, downloadFile }
}
