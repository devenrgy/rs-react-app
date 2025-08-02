import { PhotoCard } from '@/components/photo-card'
import { useFavoritePhotos, useFavoritesActions } from '@/lib/stores/favorites-store'
import type { Photo } from '@/types'

interface Props {
	items: Photo[]
}

export const PhotoList = ({ items }: Props) => {
	const { toggleFavorite } = useFavoritesActions()
	const favoritePhotos = useFavoritePhotos()

	return (
		<ul className='columns-1 gap-5 space-y-5 sm:columns-2 lg:columns-3 lg:gap-x-10 lg:space-y-10'>
			{items.map(item => (
				<li key={item.id}>
					<PhotoCard
						data={item}
						isFavorite={favoritePhotos.some(favoritePhoto => favoritePhoto.id === item.id)}
						toggleFavorite={toggleFavorite}
					/>
				</li>
			))}
		</ul>
	)
}
