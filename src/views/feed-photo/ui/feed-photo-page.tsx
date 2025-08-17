import type { Locale } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { Suspense } from 'react'
import { DEFAULT_PAGE, DEFAULT_QUERY } from '@/shared/config/constants'
import { BaseLayout } from '@/shared/ui/base-layout'
import { getSearchPhotos } from '../api/get-search-photos'
import { FeedPhotoList } from './feed-photo-list'
import { FeedPhotoListSkeleton } from './feed-photo-list-skeleton'

type Props = {
	params: Promise<{ locale: Locale }>
	searchParams?: Promise<{ query?: string, page?: string }>
}

export default async function FeedPhotoPage(props: Props) {
	const searchParams = await props.searchParams
	const { locale } = await props.params
	const query = searchParams?.query || DEFAULT_QUERY
	const currentPage = Number(searchParams?.page) || DEFAULT_PAGE
	const getSearchPhotosPromise = getSearchPhotos({ query, page: currentPage })

	setRequestLocale(locale)

	return (
		<BaseLayout>
			<section className='container'>
				<h1 className='mb-10 text-balance text-5xl font-medium capitalize'>{query}</h1>

				<Suspense fallback={<FeedPhotoListSkeleton />}>
					<FeedPhotoList getSearchPhotosPromise={getSearchPhotosPromise} />
				</Suspense>
			</section>
		</BaseLayout>
	)
}
