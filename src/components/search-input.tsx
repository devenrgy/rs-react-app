import { X } from 'lucide-react'
import { Component } from 'react'

import { Context } from '@/provider'

export class SearchInput extends Component {
	static contextType = Context
	declare context: React.ContextType<typeof Context>

	render() {
		const { searchQuery } = this.context

		return (
			<p className='w-full relative'>
				<label htmlFor='search' className='sr-only'>
					Search:{' '}
				</label>

				<input
					className='peer w-full h-full py-3 pl-5 pr-18 bg-highlight-low outline-none focus-visible:bg-overlay/80 duration-200 transition-colors rounded-l-full text-lg'
					name='search'
					id='search'
					type='text'
					defaultValue={searchQuery}
					inputMode='search'
					placeholder='Find awesome images...'
				/>

				<button
					aria-label='Reset'
					type='reset'
					className='peer-placeholder-shown:opacity-0 peer-placeholder-shown:invisible visible opacity-100 absolute right-0 top-1/2 -translate-1/2 cursor-pointer text-text p-2 duration-200'
				>
					<X />
				</button>
			</p>
		)
	}
}
