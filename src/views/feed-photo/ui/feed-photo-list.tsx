'use client'

import type { getSearchPhotos } from '../api/get-search-photos'
import { useSearchParams } from 'next/navigation'
import { use } from 'react'
import { hasItems } from '@/shared/lib/helpers'
import { useDownloadFile } from '@/shared/lib/use-download-file'
import { usePagination } from '@/shared/lib/use-pagination'
import { useFavorites } from '../lib/use-favorites'
import { FeedFavorites } from './feed-favorites'
import { FeedPagination } from './feed-pagination'
import { FeedPhotoItem } from './feed-photo-item'

type Props = {
	getSearchPhotosPromise: Promise<Awaited<ReturnType<typeof getSearchPhotos>>>
}

export const FeedPhotoList = ({ getSearchPhotosPromise }: Props) => {
	const searchParams = useSearchParams()
	const currentPage = Number(searchParams?.get('page')) || 1
	const { data, error } = use(getSearchPhotosPromise)
	const pagination = usePagination({ totalCount: data?.total_pages, siblingCount: 1, currentPage })
	const { favoritesPhotos, toggleFavorite, clearAll } = useFavorites()
	const { downloadFile } = useDownloadFile({
		fileName: `${favoritesPhotos.length}-rs-gallery-favorites`,
		format: 'text/csv;charset=utf-8;',
		data: favoritesPhotos,
	})

	if (error) {
		return <p>Something went wrong</p>
	}

	return (
		<>
			<ul className='columns-1 gap-5 space-y-5 sm:columns-2 lg:columns-3 lg:gap-x-10 lg:space-y-10'>
				{data.results.map(item => (
					<li key={item.id}>
						<FeedPhotoItem
							data={item}
							isFavorite={favoritesPhotos.some(favoritePhoto => favoritePhoto.id === item.id)}
							toggleFavorite={toggleFavorite}
						/>
					</li>
				))}

			</ul>

			<FeedPagination className='z-40 mt-10' totalPages={pagination} currentPage={currentPage} />

			{hasItems(favoritesPhotos) && <FeedFavorites className='starting:opacity-0 starting:-bottom-20 fixed bottom-5 right-5 z-20 duration-200' items={favoritesPhotos} handleClearAll={clearAll} handleDownload={downloadFile} />}
		</>
	)
}
