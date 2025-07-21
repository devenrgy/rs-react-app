import { Search } from 'lucide-react'

export const SearchButton = () => {
	return (
		<p>
			<button
				aria-label='Search'
				className='h-full cursor-pointer rounded-r-full bg-iris px-4 py-2 text-highlight-low transition-colors duration-200 hover:bg-iris/80 lg:px-10'
				type='submit'
			>
				<Search />
			</button>
		</p>
	)
}
