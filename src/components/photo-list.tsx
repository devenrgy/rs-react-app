import { PhotoCard } from '@/components/photo-card'
import { hasItems } from '@/lib/utils/helpers'
import type { Photo } from '@/types'

interface Props {
	items?: Photo[]
}

export const PhotoList = ({ items = [] }: Props) => {
	return (
		hasItems(items) && (
			<ul className='columns-1 gap-5 space-y-5 sm:columns-2 lg:columns-3 lg:gap-x-10 lg:space-y-10'>
				{items.map(item => (
					<li key={item.id}>
						<PhotoCard data={item} />
					</li>
				))}
			</ul>
		)
	)
}
