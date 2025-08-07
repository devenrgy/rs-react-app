import { useRouteLoaderData } from 'react-router'

import { PhotoCard } from '@/components/photo-card'
import { useSearchPhotos } from '@/lib/hooks/use-search-photos'
import { hasItems } from '@/lib/utils/helpers'
import type { loader } from '@/pages/home'

import { Pagination } from './pagination'

export const PhotoList = () => {
	const { query, page } = useRouteLoaderData('home') as Awaited<ReturnType<ReturnType<typeof loader>>>
	const { data, toggleFavorite, favoritePhotos, pagination } = useSearchPhotos({ query, page })

	return (
		<>
			<ul className='columns-1 gap-5 space-y-5 sm:columns-2 lg:columns-3 lg:gap-x-10 lg:space-y-10'>
				{data.results.map(item => (
					<li key={item.id}>
						<PhotoCard
							data={item}
							isFavorite={favoritePhotos.some(favoritePhoto => favoritePhoto.id === item.id)}
							toggleFavorite={toggleFavorite}
						/>
					</li>
				))}
			</ul>

			{hasItems(pagination) && <Pagination className='z-40 mt-10' totalPages={pagination} currentPage={page} />}
		</>
	)
}
