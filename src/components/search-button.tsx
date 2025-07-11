import { Search } from 'lucide-react'
import { PureComponent } from 'react'

export class SearchButton extends PureComponent {
	render() {
		return (
			<p>
				<button
					className='py-2 px-4 lg:px-10 bg-iris hover:bg-iris/80 duration-200 transition-colors h-full rounded-r-full cursor-pointer text-highlight-low'
					type='submit'
				>
					<Search />
				</button>
			</p>
		)
	}
}
