import { Search } from 'lucide-react'
import { Component } from 'react'

export class SearchButton extends Component {
	render() {
		return (
			<p>
				<button
					aria-label='Search'
					className='py-2 px-4 lg:px-10 bg-iris hover:bg-iris/80 duration-200 transition-colors h-full rounded-r-full cursor-pointer text-highlight-low'
					type='submit'
				>
					<Search />
				</button>
			</p>
		)
	}
}
