'use client'

import type { FormEvent } from 'react'
import { Search as SearchIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useSearchParams } from 'next/navigation'
import { QUERY_PARAM_KEY } from '@/shared/config/constants'
import { usePathname, useRouter } from '@/shared/i18n/navigation'

export const SearchForm = () => {
	const t = useTranslations('Search')
	const { replace } = useRouter()
	const searchParams = useSearchParams()
	const pathname = usePathname()

	if (pathname !== '/') {
		return null
	}

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		const formData = new FormData(event.currentTarget)

		const query = (formData.get(QUERY_PARAM_KEY) ?? '').toString().trim()

		if (!query) {
			return
		}

		if (query === searchParams.get(QUERY_PARAM_KEY)) {
			return
		}

		replace({ pathname: '/', query: { query } })
	}

	return (
		<form onSubmit={handleSubmit} className='relative w-sm flex bg-secondary rounded-md text-sm overflow-clip'>
			<p className='grow'>
				<label htmlFor='query' className='sr-only'>
					{t('label')}
				</label>

				<input
					className='py-3 pl-4 w-full bg-secondary rounded-md outline-0'
					name='query'
					id='query'
					type='text'
					inputMode='search'
					placeholder={t('input')}
				/>
			</p>

			<p>
				<button
					aria-label={t('label')}
					className='h-full cursor-pointer px-4 py-3'
					type='submit'
				>
					<SearchIcon size={20} />
				</button>
			</p>
		</form>
	)
}
