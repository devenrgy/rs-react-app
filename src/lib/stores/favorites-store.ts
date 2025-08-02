import { create, type StateCreator } from 'zustand'
import { persist } from 'zustand/middleware'

import type { FavoritePhoto, Photo } from '@/types'

type FavoritesState = {
	favoritePhotos: FavoritePhoto[]
	actions: {
		clearAll: () => void
		toggleFavorite: (photo: Pick<Photo, 'id' | 'alt_description'>) => void
	}
}

const store: StateCreator<FavoritesState> = (set, get) => ({
	favoritePhotos: [],
	actions: {
		clearAll: () => set(() => ({ favoritePhotos: [] })),
		toggleFavorite: photo =>
			set(state => {
				const exist = get().favoritePhotos.find(favoritePhoto => favoritePhoto.id === photo.id)

				if (exist) {
					return {
						favoritePhotos: state.favoritePhotos.filter(favoritePhoto => favoritePhoto.id !== exist.id)
					}
				}

				return { favoritePhotos: [...state.favoritePhotos, { ...photo, isFavorite: true }] }
			})
	}
})

const useFavoritesStore = create(
	persist(store, {
		name: 'rs-gallery-favorites',
		partialize: ({ favoritePhotos }) => ({ favoritePhotos })
	})
)

export const useFavoritePhotos = () => useFavoritesStore(state => state.favoritePhotos)
export const useFavoritesActions = () => useFavoritesStore(state => state.actions)
