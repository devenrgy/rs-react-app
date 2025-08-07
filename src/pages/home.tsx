import type { QueryClient } from '@tanstack/react-query'
import { type LoaderFunctionArgs, useLoaderData } from 'react-router'

import { FavoritesPopup } from '@/components/favorites-popup'
import { PhotoList } from '@/components/photo-list'
import { DEFAULT_PAGE, DEFAULT_QUERY, STORAGE_SEARCH_KEY } from '@/configs/constants'
import { searchPhotosQuery } from '@/lib/api/requests/get-search-photos'
import { useFavorites } from '@/lib/hooks/use-favorites'
import { hasItems, safeJsonParse, toNumber } from '@/utils/helpers'

export const loader =
	(queryClient: QueryClient) =>
	async ({ request }: LoaderFunctionArgs) => {
		const url = new URL(request.url)
		const query =
			(url.searchParams.get('query') || safeJsonParse(localStorage.getItem(STORAGE_SEARCH_KEY))) ?? DEFAULT_QUERY
		const page = toNumber(url.searchParams.get('page') ?? DEFAULT_PAGE)
		await queryClient.ensureQueryData(searchPhotosQuery(query, page))
		return { query, page }
	}

export const Home = () => {
	const { query } = useLoaderData() as Awaited<ReturnType<ReturnType<typeof loader>>>
	const { favoritesPhotos, downloadFile, clearAll } = useFavorites()

	return (
		<main className='grid min-h-dvh py-40'>
			<section className='container grid h-full grid-rows-[min-content_1fr]'>
				<h1 className='mb-10 text-balance text-5xl font-medium capitalize'>{query}</h1>
				<PhotoList />
			</section>

			{hasItems(favoritesPhotos) && (
				<FavoritesPopup
					items={favoritesPhotos}
					handleDownload={downloadFile}
					handleClearAll={clearAll}
					className='starting:opacity-0 starting:-bottom-20 fixed bottom-5 right-5 z-20 duration-200'
				/>
			)}
		</main>
	)
}
