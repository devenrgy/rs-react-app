import { X } from 'lucide-react'

import { useAppContext } from '@/provider'

export const SearchInput = () => {
	const { searchQuery } = useAppContext()

	return (
		<p className='relative w-full'>
			<label htmlFor='search' className='sr-only'>
				Search:{' '}
			</label>

			<input
				className='peer h-full w-full rounded-l-full bg-highlight-low py-3 pr-18 pl-5 text-lg transition-colors duration-200 outline-none focus-visible:bg-overlay/80'
				name='search'
				id='search'
				type='text'
				defaultValue={searchQuery ?? ''}
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
	)
}
