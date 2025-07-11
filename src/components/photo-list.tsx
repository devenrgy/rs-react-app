import { PureComponent } from 'react'

import { PhotoCard } from '@/components/photo-card'
import type { Photo } from '@/types'

interface Props {
	items: Photo[]
}

export class PhotoList extends PureComponent<Props> {
	render() {
		return (
			<ul className='columns-1 sm:columns-2 lg:space-y-10 lg:columns-3 gap-5 lg:gap-x-10 space-y-5'>
				{this.props.items.map(item => (
					<li key={item.id}>
						<PhotoCard data={item} />
					</li>
				))}
			</ul>
		)
	}
}
