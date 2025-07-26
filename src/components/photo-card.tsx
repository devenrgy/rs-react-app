import type { Photo } from '@/types'
import { Link, useLocation } from 'react-router'

type Props = {
	data: Photo
}

export const PhotoCard = ({ data }: Props) => {
	const { search } = useLocation()
	const { urls, width, height, alt_description, id } = data

	return (
		<figure className='group relative flex flex-col shadow-iris/20 hover:shadow-xl border border-highlight-low rounded-3xl overflow-clip break-inside-avoid duration-200'>
			<p className='overflow-clip'>
				<img
					className='w-full h-full object-cover group-hover:scale-101 duration-200'
					src={urls.regular}
					width={width}
					height={height}
					fetchPriority='high'
					alt={alt_description || ''}
				/>
			</p>

			<figcaption className='flex flex-col gap-5 bg-base px-4 py-6'>
				<p className='text-sm text-center first-letter:capitalize text-balance'>{alt_description}</p>

				<Link className='before:absolute before:inset-0 self-end bg-pine group-hover:bg-pine/80 px-3 py-2 rounded-full text-xs text-right duration-200' preventScrollReset to={{ pathname: `id=${id}`, search }}>More details</Link>
			</figcaption>
		</figure>
	)
}
