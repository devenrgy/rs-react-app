import { Search, X } from 'lucide-react'
import type { FormEvent } from 'react'

import { cn } from '@/lib/utils/helpers'

interface Props {
	query: string
	handleQueryChange: (value: string) => void
	handleFormSubmit: (event: FormEvent<HTMLFormElement>) => void
	handleFormReset: (event: FormEvent<HTMLFormElement>) => void
	className?: string
}

export const SearchForm = ({ query, handleQueryChange, handleFormSubmit, handleFormReset, className }: Props) => {
	return (
		<form
			aria-label='Search Form'
			onSubmit={handleFormSubmit}
			onReset={handleFormReset}
			className={cn(
				'dark:ring-iris dark:has-[button[aria-label="Search"]:hover]:ring-rose group flex h-full rounded-full ring-black/40 duration-200 has-[input:focus-visible]:ring-2',
				className
			)}
		>
			<p className='relative w-full'>
				<label htmlFor='query' className='sr-only'>
					Search:{' '}
				</label>

				<input
					className='pr-18 dark:bg-iris/15 peer h-full w-full rounded-l-full bg-white/15 py-3 pl-5 text-lg text-white outline-none transition-colors duration-200 placeholder:text-white/50'
					name='query'
					id='query'
					type='text'
					value={query}
					onChange={event => handleQueryChange(event.target.value)}
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
					className='dark:bg-iris dark:text-highlight-low dark:hover:bg-rose h-full cursor-pointer rounded-r-full bg-black/20 px-4 py-2 text-white transition-colors duration-200 hover:bg-black/30 lg:px-10'
					type='submit'
				>
					<Search />
				</button>
			</p>
		</form>
	)
}
