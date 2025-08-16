import type { StateCreator } from 'zustand'
import { create } from 'zustand'

import { persist } from 'zustand/middleware'

export type FavoritePhoto = {
	id: string
	alt_description: string
}

type FavoritesState = {
	favoritePhotos: FavoritePhoto[]
	actions: {
		clearAll: () => void
		toggleFavorite: (photo: FavoritePhoto) => void
	}
}

const favoritePhotoStore: StateCreator<FavoritesState> = (set, get) => ({
	favoritePhotos: [],
	actions: {
		clearAll: () => set(() => ({ favoritePhotos: [] })),
		toggleFavorite: photo =>
			set((state) => {
				const isExist = get().favoritePhotos.some(favoritePhoto => favoritePhoto.id === photo.id)

				if (isExist) {
					return {
						favoritePhotos: state.favoritePhotos.filter(favoritePhoto => favoritePhoto.id !== photo.id),
					}
				}

				return { favoritePhotos: [...state.favoritePhotos, { ...photo, isFavorite: true }] }
			}),
	},
})

const useFavoritesStore = create(
	persist(favoritePhotoStore, {
		name: 'rs-gallery-favorites',
		partialize: ({ favoritePhotos }) => ({ favoritePhotos }),
	}),
)

export const useFavoritePhotos = () => useFavoritesStore(state => state.favoritePhotos)
export const useFavoritesActions = () => useFavoritesStore(state => state.actions)
