import { Search, X } from 'lucide-react'
import type { FormEvent } from 'react'

import { cn } from '@/lib/utils/helpers'

interface Props {
	searchQuery: string
	handleSearchQueryChange: (value: string) => void
	handleFormReset: () => void
	handleFormSubmit: (event: FormEvent<HTMLFormElement>) => void
	className?: string
}

export const SearchForm = ({
	searchQuery,
	handleSearchQueryChange,
	handleFormReset,
	handleFormSubmit,
	className
}: Props) => {
	return (
		<form
			aria-label='Search Form'
			onReset={handleFormReset}
			onSubmit={handleFormSubmit}
			className={cn('flex h-full', className)}
		>
			<p className='relative w-full'>
				<label htmlFor='search' className='sr-only'>
					Search:{' '}
				</label>

				<input
					className='peer h-full w-full rounded-l-full bg-highlight-low py-3 pr-18 pl-5 text-lg transition-colors duration-200 outline-none focus-visible:bg-overlay/80'
					name='search'
					id='search'
					type='text'
					value={searchQuery}
					onChange={e => handleSearchQueryChange(e.target.value)}
					inputMode='search'
					placeholder='Find awesome images...'
				/>

				<button
					aria-label='Reset'
					type='reset'
					className='visible absolute top-1/2 right-0 -translate-1/2 cursor-pointer p-2 text-text opacity-100 duration-200 peer-placeholder-shown:invisible peer-placeholder-shown:opacity-0'
				>
					<X />
				</button>
			</p>

			<p>
				<button
					aria-label='Search'
					className='h-full cursor-pointer rounded-r-full bg-iris px-4 py-2 text-highlight-low transition-colors duration-200 hover:bg-iris/80 lg:px-10'
					type='submit'
				>
					<Search />
				</button>
			</p>
		</form>
	)
}
