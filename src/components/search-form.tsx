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
			className={cn('ring-iris group flex h-full rounded-full has-[input:focus-visible]:ring-2', className)}
		>
			<p className='relative w-full'>
				<label htmlFor='search' className='sr-only'>
					Search:{' '}
				</label>

				<input
					className='pr-18 bg-iris/15 peer h-full w-full rounded-l-full py-3 pl-5 text-lg outline-none transition-colors duration-200'
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
					className='-translate-1/2 text-text visible absolute right-0 top-1/2 cursor-pointer p-2 opacity-100 duration-200 peer-placeholder-shown:invisible peer-placeholder-shown:opacity-0'
				>
					<X />
				</button>
			</p>

			<p>
				<button
					aria-label='Search'
					className='bg-iris text-highlight-low hover:bg-iris/80 h-full cursor-pointer rounded-r-full px-4 py-2 transition-colors duration-200 lg:px-10'
					type='submit'
				>
					<Search />
				</button>
			</p>
		</form>
	)
}
