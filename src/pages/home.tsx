import { LoaderCircle } from 'lucide-react'
import { useSearchParams } from 'react-router'

import { ErrorFallback } from '@/components/error-fallback'
import { NotFound } from '@/components/not-found'
import { Pagination } from '@/components/pagination'
import { PhotoList } from '@/components/photo-list'
import { API_SEARCH_URL, PAGE_PARAM_KEY, SEARCH_PARAM_KEY } from '@/configs/constants'
import { useFetch } from '@/lib/hooks/use-fetch'
import { usePagination } from '@/lib/hooks/use-pagination'
import type { SearchPhotosResponse } from '@/types'
import { addUrlParams, hasItems } from '@/utils/helpers'

import { useRootContext } from './root'

export const Home = () => {
	const { searchQueryLS, pageLS } = useRootContext()
	const [searchParams] = useSearchParams()
	const query = searchParams.get(SEARCH_PARAM_KEY) || searchQueryLS || 'Mountain'
	const page = Number(searchParams.get(PAGE_PARAM_KEY) || pageLS || 1)

	const { data, error, loading } = useFetch<SearchPhotosResponse>(
		addUrlParams(API_SEARCH_URL, {
			query,
			page,
			per_page: 10,
			client_id: import.meta.env.VITE_CLIENT_ID
		})
	)

	const pagination = usePagination({
		currentPage: Number(page),
		totalCount: data?.total_pages
	})

	return (
		<main className='grid min-h-dvh pt-40 pb-20'>
			<section className='container grid h-full grid-rows-[min-content_1fr]'>
				<h1 className='mb-10 text-4xl font-bold text-balance capitalize'>{query}</h1>

				{loading && (
					<div className='flex w-full max-w-[200px] flex-col items-center gap-10 place-self-center'>
						<LoaderCircle size={48} aria-label='spinner' className='animate-spin text-text' />
					</div>
				)}

				{error && <ErrorFallback message={error.message} />}

				{!loading && !error && (hasItems(data?.results) ? <PhotoList items={data.results} /> : <NotFound />)}

				{!loading && !error && pagination && <Pagination totalCount={pagination} currentPage={page} />}
			</section>
		</main>
	)
}
